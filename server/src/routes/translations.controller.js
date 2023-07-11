const express = require("express");
const axios = require("axios");

async function postTranslate(req, res) {
  const text = req.body;
  // console.log(`REQ.BODY: ${JSON.stringify(req.body)}`);
  // console.log(`RAPID_API_KEY: ${process.env.RAPID_API_KEY}`);

  /* *** DEVELOPMENT/TEST API *** */
  // res.setHeader("Content-Type", "application/json");
  // const postId = Math.floor(Math.random() * 10 + 1);
  // const translationPromise = fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${postId}`
  // )
  //   .then((result) => result.json())
  //   .then((data) => {
  //     console.log(`RESULT: ${JSON.stringify(data)}`);
  //     return res.send(JSON.stringify(data));
  //   });

  /* *** REAL TRANSLATION CALLS HERE *** */
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
    console.log(`RESULT: ${response.data[0]}`);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  postTranslate,
};
