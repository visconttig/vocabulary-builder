const express = require("express");
const translationsController = require("./translations.controller.js");

const translationsRouter = express.Router();

translationsRouter.post(
  "/translations/translate",
  translationsController.postTranslate
);

module.exports = {
  translationsRouter,
};
