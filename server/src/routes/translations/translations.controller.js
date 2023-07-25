const express = require("express");
const axios = require("axios");
const debug = require("debug");

async function postTranslate(req, res) {
  const text = req.body;

  const options = {
    method: "POST",
    url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com"
    },
    data: {
      q: `${req.body.toTranslateText}`,
      from: `${req.body.sourceLanguage}`,
      to: `${req.body.targetLanguage}`
    }
  };

  try {
    const response = await axios.request(options);

    return res.status(200).send(response.data);
  } catch (err) {
    console.error(`An error ocurred: ${err}`);
  }
}

module.exports = {
  postTranslate
};
