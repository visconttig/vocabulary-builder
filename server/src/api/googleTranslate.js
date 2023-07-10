const axios = require("axios");

const googleTranslateEndpoint =
  "https://google-translate1.p.rapidapi.com/language/translate/v2";

const httpGoogleTranslate = async (
  toTranslateText,
  sourceLanguage,
  targetLanguage
) => {
  const translatePromise = await axios
    .request({
      method: "POST",
      url: googleTranslateEndpoint,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: {
        source: `${sourceLanguage}`,
        target: `${targetLanguage}`,
        q: `${toTranslateText}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(JSON.stringify(data));
      return data;
    });
};

module.exports = {
  httpGoogleTranslate,
};
