const express = require("express");
const axios = require("axios");
const { result } = require("lodash");

const inDevelopment = process.env.DEVELOPMENT_MODE;
console.log(`Development mode: ${process.env.DEVELOPMENT_MODE}`);

async function postExplainGrammar(req, res) {
  const sourceText = req.body.sourceText;
  console.log(`1 -- DATA RECIEVED: ${sourceText}`);

  const explanationPromise = fetchGrammarExpls(sourceText);

  const result = await explanationPromise;
  console.log(`3 -- server response: ${result}`);
  res.set("Content-Type", "application/json");
  return res.status(200).send(result);
}

function createGrammarQuery(sourceText) {
  const grammarQuery = `Por favor, explícame en términos sencillos la gramática de esta frase: '${sourceText}' y adjunta un link a un sitio web en Español con más detalles.`;

  return grammarQuery;
}

async function fetchGrammarExpls(sourceText) {
  const API_ENDPOINT = "https://open-ai21.p.rapidapi.com/chat";
  const rapidApiHost = "open-ai21.p.rapidapi.com";

  const grammarQuery = createGrammarQuery(sourceText);

  const options = {
    method: "POST",
    url: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": rapidApiHost,
    },
    data: {
      message: grammarQuery,
    },
  };

  const fetchGrammarPromise = axios.request(options);

  fetchGrammarPromise
    .then((response) => {
      return response.data.ChatGPT;
    })
    .catch((err) => {
      console.log(`An error ocurred: ${err}`);
    });

  const { data } = await fetchGrammarPromise;
  return data.ChatGPT;
}

module.exports = {
  postExplainGrammar,
};
