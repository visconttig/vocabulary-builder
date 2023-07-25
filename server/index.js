const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const debug = require("debug");
const path = require("path");

const translationsControler = require("./src/routes/translations/translations.controller.js");
const nlpController = require("./src/routes/grammar/nlp.controller.js");
const grammarController = require("./src/routes/grammar/grammar.controller.js");
const dictionaryController = require("./src/routes/dictionary/dictionary.controller.js");

const enviroment = process.env.NODE_ENV || "production";
const app = express();
const env_vars = require("dotenv").config({
  path: path.join(__dirname, `.env.${enviroment}`),
  debug: true
});

console.log("*****\n******\n******");
console.log(`WORKING MODE: ${process.env.NODE_ENV}`);
enviroment !== "production" ? console.log(env_vars) : null;
console.log("***\n******\n*****");

const PORT = process.env.PORT || 4000;

const customLogger = (req, res, next) => {
  debug("%O", req.body);
  debug("%O", req.headers);
  debug("%j", res.headers);
  debug("%j", res.body);
  debug("%j", res.data);
  next();
};

let corsOptions = {
  origin: "*",
  withCredentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
process.env.NODE_ENV !== "production" ? app.use(customLogger) : null;

app.post("/translations/translate", translationsControler.postTranslate);

app.get("/translations/translate", (req, res) => {
  res.status(200).send("Method NOT ALLOWED please use POST instead.");
});

/*    *** NOT ENOUGH QUOTA TO PROCEED*** */
// app.post("/grammar/ai/explain", grammarController.openAi.controller.js);

/* *** new API *** */
app.post("/grammar/explain", grammarController.postExplainGrammar);

app.get("/grammar/explain", (req, res) => {
  res.status(200).send("METHOD not allowed, please use POST instead");
});

app.post("/grammar/nlp/tokens", nlpController.postExtractTokens);

app.get("/grammar/nlp/tokens", (req, res) => {
  res.status.send("METHOD not allowed, please use POST instead");
});

/* *** spanish-english bilingual dictionary *** */
// app.post("/dictionary/es/:lemma" /* controller here */);
app.post("/dictionary/es/:lemma", dictionaryController.fetchDefinitions);

app.listen(PORT, () => {
  return console.log(`App listening on port ${PORT}`);
});
