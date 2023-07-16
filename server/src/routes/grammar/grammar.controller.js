const express = require("express");
const axios = require("axios");

async function postExplainGrammar(req, res) {
  const sourceText = req.body.sourceText;
  console.log(`DATA RECIEVED: ${sourceText}`);

  const response = await fetchGrammarExpls(sourceText);

  res.set("Content-Type", "text/html");
  return res.status(200).send(response);
}

function createGrammarQuery(sourceText) {
  const grammarQuery = `Por favor, explícame en términos sencillos la gramática de esta frase: '${sourceText}' y adjunta un link a un sitio web con más detalles.`;

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
      console.log(response.data);
      // return res.status(200).send(response.data);
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

module.exports = {
  postExplainGrammar,
};
