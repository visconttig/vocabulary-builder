const express = require("express");
const winkNLP = require("wink-nlp");

const exampleData = {
  nlpGrammar: "",
  posWords: null,
  sentences: [],
};

exampleData.posWords = new Map();
const posWords = exampleData.posWords;

// load english model
const model = require("wink-eng-lite-web-model");
// instantiate winkNLP
const nlp = winkNLP(model);
// 'its' helper to extract properties
const its = nlp.its;
// 'as' reducer to reduce collections
const as = nlp.as;

async function postExtractTokens(req, res) {
  const inputText = req.body.sourceText;
  // console.log(`RAPID_API_KEY: ${process.env.RAPID_API_KEY}`);

  await extractTokens(inputText);
  await markUpText(inputText);

  return res.status(200).send(await JSON.stringify(exampleData));
}

const extractTokens = async function (sourceText) {
  const doc = nlp.readDoc(sourceText);

  // 1: Extract words:
  doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .each((word, index) => {
      const lemma = word.out(its.lemma);

      // console.log(`contains: ${posWords.has(lemma)}`);
      // console.log(`lemma: ${lemma}`);
      if (!posWords.has(lemma)) {
        posWords[lemma] = {
          word: word.out(),
          lemma: word.out(its.lemma),
          pos: word.out(its.pos),
          /* TO DO: word frequency */
          frecuency: null,
        };
        // console.log(`posWords: ${JSON.stringify(posWords)}`);
      } else {
        // console.log(`**else**`);
      }
    });
  // console.log(`exampleData: ${JSON.stringify(exampleData.posWords)}`);
  // console.log(`Example map: ${JSON.stringify(testMap)}`);

  // console.log(`POS: ${JSON.stringify(exampleData)}`);
};

async function markUpText(sourceText) {
  let doc = nlp.readDoc(sourceText);

  // Entities
  // let entities = doc.entities().out(its.detail);

  // Counts
  // let sentences = doc.sentences().length();
  // let tokens = doc.tokens().length();
  // let words = doc
  //   .tokens()
  //   .filter((token) => {
  //     return token.out(its.type) === "word";
  //   })
  //   .length();

  // Tagged text
  let seenEntities = new Set();
  doc.tokens().each((token) => {
    let entity = token.parentEntity();
    if (entity === undefined) {
      if (token.out(its.type) === "word") {
        token.markup(
          '<span class="tag ' + token.out(its.pos) + '">',
          "</span>"
        );
      }
    } else {
      if (!seenEntities.has(entity.index())) {
        entity.markup(
          '<span class="tag ' + entity.out(its.type) + '">',
          "</span>"
        );
      }
      seenEntities.add(entity.index());
    }
  });

  // Word frequency
  let wordFreq = doc
    .tokens()
    .filter((token) => {
      return token.out(its.type) === "word" && !token.out(its.stopWordFlag);
    })
    .out(its.normal, as.freqTable);
  wordFreq = wordFreq.slice(0, 5);

  // Sentiment
  let sentiments = [];
  doc.sentences().each((s) => {
    sentiments.push({
      sentence: s.out(),
      sentiment: s.out(its.sentiment),
    });
    exampleData.sentences.push({
      sentence: s.out(),
      sentiment: s.out(its.sentiment),
    });
  });

  const markedText = doc.out(its.markedUpText);
  exampleData.nlpGrammar = markedText;
  return markedText;
}

module.exports = {
  postExtractTokens,
};
