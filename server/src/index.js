const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const translationsControler = require("./routes/translations.controller.js");
const nlpController = require("./routes/nlp.controller.js");

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

app.post("/grammar/nlp/tokens", nlpController.postExtractTokens);

app.listen(PORT, () => {
  return console.log(`App listening on port ${PORT}`);
});
