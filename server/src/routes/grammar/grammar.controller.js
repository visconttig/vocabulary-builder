const express = require("express");
const axios = require("axios");
const {result} = require("lodash");
const debug = require("debug")("http");
const flatted = require("flatted");

const GRAMMAR_EXPLANATIONS_ENDPOINT = "https://api.jsonserver.io";

async function postExplainGrammar(req, res) {
  const sourceText = req.body.sourceText;
  // debug("%j", "Data recieved ", req.body);

  if (!sourceText) {
    return res.status(200).send({Error: "The request should not be empty."});
  }

  const result = await fetchProdGrammarExpls(sourceText);
  res.set("Content-Type", "application/json");
  return res.status(200).send(result);
}

function createGrammarQuery(sourceText) {
  const grammarQuery = `Por favor, explícame en términos sencillos la gramática de esta frase: '${sourceText}' y adjunta un link a un sitio web en Español con más detalles.`;

  return grammarQuery;
}

// Production API call
async function fetchProdGrammarExpls(sourceText) {
  const API_ENDPOINT = "https://open-ai21.p.rapidapi.com/chat";
  const rapidApiHost = "open-ai21.p.rapidapi.com";

  const grammarQuery = createGrammarQuery(sourceText);

  console.log(`RapidApi Key: ${process.env.RAPID_API_KEY}`);
  if (!process.env.RAPID_API_KEY) {
    return "Not API Key provided.";
  }

  const options = {
    method: "POST",
    url: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": rapidApiHost
    },
    data: {
      message: grammarQuery
    }
  };

  const fetchGrammarPromise = axios.request(options);

  fetchGrammarPromise
    .then((response) => {
      return response.data.ChatGPT;
    })
    .catch((err) => {
      console.log(`An error ocurred: ${err}`);
    });

  const {data} = await fetchGrammarPromise;
  return data.ChatGPT;
}

module.exports = {
  postExplainGrammar
};
