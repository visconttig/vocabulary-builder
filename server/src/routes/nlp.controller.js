const express = require("express");
const winkNLP = require("wink-nlp");

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
  // console.log(`INPUT TEXT: ${inputText}`);

  const doc = nlp.readDoc(inputText);
  // 1: Extract words:
  const words = doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .out(its.lemma);

  // TO DO: --- pending
  // 2: Discard not real English words/dictionary entries

  console.log(`words: ${words}`);
  return res.status(200).send(await words);
}

const extractTokens = async function (sourceText) {
  const doc = nlp.readDoc(sourceText);

  // 1: Extract words:
  const words = doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .out(its.lemma);

  // TO DO: --- pending
  // 2: Discard not real English words/dictionary entries

  let verbs = await doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .filter((token) => token.out(its.pos) === "VERB")
    .out();

  let nouns = await doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .filter((word) => word.out(its.pos) === "NOUN")
    .out();

  console.log(`WORDS: ${words}`);
  console.log(`VERBS: ${verbs}`);
  console.log(`NOUNS: ${nouns}`);
};

async function postMarkUpText(req, res) {
  const sourceText = req.body.sourceText;

  /* *** EXTRACT TOKENS *** */
  extractTokens(sourceText);

  let doc = nlp.readDoc(sourceText);

  // Entities
  let entities = doc.entities().out(its.detail);

  // Counts
  let sentences = doc.sentences().length();
  let tokens = doc.tokens().length();
  let words = doc
    .tokens()
    .filter((token) => {
      return token.out(its.type) === "word";
    })
    .length();

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
  });

  // console.log(entities);
  // console.log(sentiments);
  // console.log(wordFreq);
  console.log(doc.out(its.markedUpText));

  res.set("Content-Type", "text/html");
  return res.status(200).send(doc.out(its.markedUpText));
}

module.exports = {
  postExtractTokens,
  postMarkUpText,
};
