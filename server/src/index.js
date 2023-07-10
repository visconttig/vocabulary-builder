const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const translationsRouter = require("./routes/translations.routes.js");

const translationsControler = require("./routes/translations.controller.js");

const app = express();
require("dotenv").config();

// console.log(process.env);

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// app.use("/translations", translationsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded());

app.post("/translations/translate", translationsControler.postTranslate);

app.listen(4000, () => {
  return console.log("App listening on port 4000");
});
