const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(process.env.SPANISH_API_KEY);

app.get("/", (req, res) => {
  const translationPromise = fetch(
    "https://jsonplaceholder.typicode.com/posts/5"
  );

  translationPromise
    .then((response) => response.json())
    .then((data) => {
      console.log(`Translaiton data: ${data}`);
      res.send(data);
    })
    .catch((err) => `An error ocurred: ${err}`);
});

app.get("/translate", (req, res) => {
  // some code here;
});

app.listen(4000, () => {
  return console.log("App listening on port 4000");
});
