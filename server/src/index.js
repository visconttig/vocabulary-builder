const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const translationsControler = require("./routes/translations/translations.controller.js");
const nlpController = require("./routes/grammar/nlp.controller.js");
const grammarController = require("./routes/grammar/grammar.controller.js");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

let corsOptions = {
  origin: "*",
  withCredentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/translations/translate", translationsControler.postTranslate);

/*    *** NOT ENOUGH QUOTA TO PROCEED*** */
// app.post("/grammar/explain", grammarController.openAi.controller.js);

/* *** new API *** */
app.post("/grammar/explain", grammarController.postExplainGrammar);

app.post("/grammar/nlp/tokens", nlpController.postExtractTokens);

/* *** spanish-english bilingual dictionary *** */
// app.post("/dictionary/es/:lemma" /* controller here */);

app.listen(PORT, () => {
  return console.log(`App listening on port ${PORT}`);
});
