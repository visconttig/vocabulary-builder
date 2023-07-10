const express = require("express");
const httpGoogleTranslate = require("../api/googleTranslate.js");
const axios = require("axios");

async function postTranslate(req, res) {
  const text = req.body;
  console.log(`REQ.BODY: ${JSON.stringify(req.body)}`);
  // console.log(`SOURCE: ${JSON.stringify(req.body.sourceLanguage)}`);
  // console.log(`TARGET: ${req.body.targetLanguage}`);

  // console.log(`Recieved: "${JSON.stringify(req.body)}"`);

  /* *** DEVELOPMENT/TEST API *** */
  res.setHeader("Content-Type", "application/json");
  const postId = Math.floor(Math.random() * 10 + 1);
  const translationPromise = fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )
    .then((result) => result.json())
    .then((data) => {
      console.log(`RESULT: ${JSON.stringify(data)}`);
      return res.send(JSON.stringify(data));
    });

  /* *** REAL TRANSLATION CALLS HERE *** */
  // const googleTranslateEndpoint =
  //   "https://google-translate1.p.rapidapi.com/language/translate/v2";

  // const { sourceLanguage, targetLanguage, toTranslateText } = req.body;
  // console.log(`RAPID_API_KEY: ${process.env.RAPID_API_KEY}`);

  // const translatePromiseProd = await axios
  //   .request({
  //     method: "POST",
  //     url: googleTranslateEndpoint,
  //     headers: {
  //       // "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
  //       // "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  //     },
  //     data: {
  //       source: `${sourceLanguage}`,
  //       target: `${targetLanguage}`,
  //       q: `${toTranslateText}`,
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(JSON.stringify(`httpGoogleTranslate: ${data}`));
  //     return data;
  //   })
  //   .catch((err) => console.log(`ERROR: ${err}`));
}

module.exports = {
  postTranslate,
};
