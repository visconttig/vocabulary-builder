const express = require("express");
const axios = require("axios");
const debug = require("debug")("http");

const BILINGUAL_URL = process.env.MERRIAM_WEBSTERS_SAPISH_DICTIONARY;
const SPANISH_API_KEY = process.env.MERRIAM_WEBSTERS_SPANISH_API_KEY;
if (process.env.NODE_ENV !== "production") {
  debug("%s", SPANISH_API_KEY);
  debug("%s", BILINGUAL_URL);
}

async function fetchDefinitions(req, res) {
  const requestData = req.body;
  const headWord = req.body.headWord;
  debug("%j", requestData);

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
      debug("%j", data);
      // return here
    })
    .catch((err) => {
      console.log(`An error ocurred: ${err}`);
      debug("%O", err);
    });

  const result = await fetchDefinitionsPromise;
  // test
  return res.status(200).send("Heloooooooooooo ;)");
}

module.exports = {
  fetchDefinitions
};
