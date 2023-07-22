const express = require("express");
const axios = require("axios");

async function postTranslate(req, res) {
  const text = req.body;

  const options = {
    method: "POST",
    url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
    },
    data: {
      q: `${req.body.toTranslateText}`,
      from: `${req.body.sourceLanguage}`,
      to: `${req.body.targetLanguage}`,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(`RESULT: ${response.data[0]}`);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  postTranslate,
};
