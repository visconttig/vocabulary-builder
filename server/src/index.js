const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const translationsRouter = require("./routes/translations.routes.js");

const translationsControler = require("./routes/translations.controller.js");
// const grammarController = require("./routes/grammar.controller.js");
const nlpController = require("./routes/nlp.controller.js");

const app = express();
require("dotenv").config();

// console.log(process.env);

let corsOptions = {
  origin: "*",
  withCredentials: true,
};

app.use(cors(corsOptions));

// app.use("/translations", translationsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded());

app.post("/translations/translate", translationsControler.postTranslate);

/*    *** NOT ENOUGH QUOTA TO PROCEED*** */
// app.post("/grammar/explain", grammarController.openAi.controller.js);

app.post("/grammar/nlp/tokens", nlpController.postExtractTokens);
app.post("/grammar/nlp/mark-up", nlpController.postMarkUpText);

app.listen(4000, () => {
  return console.log("App listening on port 4000");
});
