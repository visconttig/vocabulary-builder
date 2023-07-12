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

const text =
  "Hi! Im Geronimo. This is the third email that I send.The speaker that I buy yesterday is not working anymore. I need to speak to a sells manages asap bougth lied.";

const doc = nlp.readDoc(text);
console.log(`READING RESULTS: ${doc.out()}`);

async function postExtractTokens(req, res) {
  console.log(`TOKENS: ${doc.tokens().out(its.lemma)}`);
  console.log(
    `REAL WORDS: ${doc
      .tokens()
      .filter((t) => t.out(its.type) === "word" && !t.out(its.pos) === "x")
      .out()}`
  );

  // 1: Extract words:
  const words = doc
    .tokens()
    .filter((token) => token.out(its.type) === "word")
    .out();

  // 2: Discard !lexemas
  // TO DO: --- pending: read docs/further investigation neeeded

  return res.status(200).send(await words);
}

async function postMarkUpText(req, res) {
  const winkNLP = require("wink-nlp");
  const its = require("wink-nlp/src/its.js");
  const as = require("wink-nlp/src/as.js");
  const model = require("wink-eng-lite-model");
  const nlp = winkNLP(model);

  var text = `Yesterday at 3am I was surfing http://twitter.com. I won a 100$ lottery for the first time. I spent 100% of it in just 1 hour :P Can you imagine that 😅? #yolo`;
  var doc = nlp.readDoc(text);

  // Entities
  var entities = doc.entities().out(its.detail);

  // Counts
  var sentences = doc.sentences().length();
  var tokens = doc.tokens().length();
  var words = doc
    .tokens()
    .filter((token) => {
      return token.out(its.type) === "word";
    })
    .length();

  // Tagged text
  var seenEntities = new Set();
  doc.tokens().each((token) => {
    var entity = token.parentEntity();
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
  var wordFreq = doc
    .tokens()
    .filter((token) => {
      return token.out(its.type) === "word" && !token.out(its.stopWordFlag);
    })
    .out(its.normal, as.freqTable);
  wordFreq = wordFreq.slice(0, 5);

  // Sentiment
  var sentiments = [];
  doc.sentences().each((s) => {
    sentiments.push({
      sentence: s.out(),
      sentiment: s.out(its.sentiment),
    });
  });

  console.log(entities);
  console.log(sentiments);
  console.log(wordFreq);
  console.log(doc.out(its.markedUpText));

  return res.status(200).send(doc.out(its.markedUpText));
}

module.exports = {
  postExtractTokens,
  postMarkUpText,
};
