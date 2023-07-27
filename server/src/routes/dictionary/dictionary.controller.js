const express = require("express");
const axios = require("axios");
const debug = require("debug")("http");
const dotenv = require("dotenv");
const path = require("path");



const enviroment = process.env.NODE_ENV || "development";
 const node_vars = dotenv.config({path: path.join(__dirname, "..", "..", "..", "..", `.env.${enviroment}`)});

 
 
 const BILINGUAL_URL = process.env.MERRIAM_WEBSTERS_SAPISH_DICTIONARY;
 const SPANISH_API_KEY = process.env.MERRIAM_WEBSTERS_SPANISH_API_KEY;
 
 
 
 
 if (process.env.NODE_ENV !== "production") { 
   debug("%O", node_vars);
   debug("%s", SPANISH_API_KEY);
   debug("%s", BILINGUAL_URL);
} 

async function fetchEsDefinitions(req, res) {
  const headWord = req.body.headWord;


  if (!headWord) {
    return res.status(200).send("You must provide a search parameter.");
  }

  if (!SPANISH_API_KEY) {
    return res.status(200).send(`Not valid / undefinded API key -- ${process.env.NODE_ENV !== "production" ? SPANISH_API_KEY : ""}`);
  }

  // fetch here
  const options = {
    method: "GET",
    url: `${BILINGUAL_URL}/${headWord}?key=${SPANISH_API_KEY}`,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const fetchDefinitionsPromise = axios
    .request(options)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(`An error ocurred: ${err}`);
    });

  const result = await fetchDefinitionsPromise;
  return res.status(200).send(result);
}

module.exports = {
  fetchEsDefinitions
};
