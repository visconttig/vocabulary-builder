const express = require("express");
const winkNLP = require("wink-nlp");
const _ = require("lodash");

// load english model
const model = require("wink-eng-lite-web-model");
// instantiate winkNLP
const nlp = winkNLP(model);
// 'its' helper to extract properties
const its = nlp.its;
// 'as' reducer to reduce collections
const as = nlp.as;

const toLowerCase = (text) => {
  return _.lowerCase(text);
};

async function postExtractTokens(req, res) {
  const inputText = req.body.sourceText;

  let exampleData = {
    nlpGrammar: "",
    posWords: new Map(),
    // sentences: [],
    sentences: new Map(),
  };

  const posWords = exampleData.posWords;

  await extractTokens(inputText, exampleData);
  await markUpText(inputText, exampleData);

  return res.status(200).send(await JSON.stringify(exampleData));
}

const extractTokens = async function (sourceText, exampleData) {
  const posWords = exampleData.posWords;
  const doc = nlp.readDoc(sourceText);

  // 1: Extract words:
  doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .each((word, index) => {
      const lemma = word.out(its.lemma);

      if (!posWords.has(lemma)) {
        posWords[lemma] = {
          word: word.out(),
          lemma: word.out(its.lemma),
          pos: word.out(its.pos),
          /* TO DO: word frequency */
          frecuency: null,
        };
      } else {
        //
      }
    });
};

async function markUpText(sourceText, exampleData) {
  let doc = nlp.readDoc(sourceText);

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

  const sentences = exampleData.sentences;

  // Sentiment
  let sentiments = [];
  doc.sentences().each((s) => {
    sentiments.push({
      sentence: s.out(),
      sentiment: s.out(its.sentiment),
    });
    // exampleData.sentences.push({
    //   sentence: s.out(),
    //   sentiment: s.out(its.sentiment),
    // });

    let lowerCasedSentence = s.out().toLowerCase();
    if (!sentences.has(lowerCasedSentence)) {
      sentences[lowerCasedSentence] = {
        sentence: `${lowerCasedSentence}`,
      };
    }
  });

  const markedText = doc.out(its.markedUpText);
  exampleData.nlpGrammar = markedText;
  return markedText;
}

module.exports = {
  postExtractTokens,
};
