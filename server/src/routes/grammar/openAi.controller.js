const { Configuration, OpenAIApi } = require("openai");

const express = require("express");

/* *******************************


NO ENOUGH QUOTA TO PROCEED ***



********************************* */

async function postExplainGrammar(req, res) {
  console.log(`RECIEVED: ${JSON.stringify(req.body)}`);

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    // model: "text-davinci-003",
    model: "text-ada-001",
    prompt:
      "Explícame como usar el verbo 'to be' en términos simples (como si yo tuviera 15 años).",
    max_tokens: 7,
    temperature: 0,
  });

  // console.log(`RESPONSE: ${response}`);
  response
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => `An error ocurred: ${err}`);
}

module.exports = {
  postExplainGrammar,
};
