const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

let corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded());

app.get("/", (req, res) => {
  const postId = Math.floor(Math.random() * 10 + 1);
  const translationPromise = fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  translationPromise
    .then((response) => response.json())
    .then((data) => {
      console.log(`Translaiton data: ${data}`);
      res.send(data);
    })
    .catch((err) => `An error ocurred: ${err}`);
});

app.post("/translations/translate", async (req, res) => {
  const text = req.body;
  console.log(`Recieved: "${req.body.translateText}"`);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(text));
});

app.listen(4000, () => {
  return console.log("App listening on port 4000");
});
