import React from "react";
import "./homePage.styles.scss";
import TranslatorSourceEditor from "../../features/translator/TranslatorSourceEditor.component.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const HomePage = () => {
  const [translation, setTranslation] = useState("Text translation here...");

  const initialText =
    "Hi Hope you’ve been enjoying our services so far.We want to continue offering the best service. Could you please take five minutes and fill up this feedback form for us [share link to form]?";

  useEffect(() => {
    const translatedText = reactLocalStorage.get("translation");
    setTranslation(translatedText);

    return () => {
      console.log("This was returned from 'useEffect()'");
      console.log(translation);
    };
  }, []);

  const translate = async () => {
    const translatePromise = fetch(
      "http://localhost:4000/translations/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          translateText: `${initialText}`,
        }),
      }
    );

    translatePromise
      .then((response) => response.json())
      .then((data) => console.log(`Recieved: "${data.translateText}"`));
  };

  return (
    <>
      <div className="main-container">
        <div className="translator-container">
          <TranslatorSourceEditor />
        </div>
        <div className="translation-field main-text">{translation}</div>
      </div>
      <div className="buttons-container">
        <button className="translate-button" onClick={translate}>
          Translate
        </button>
        {/* <button className="generate-vocab">Extract Vocabulary</button>
        <button className="study-vocab">Study Vocabulary</button>
        <button className="study-saved-vocab">Study Saved Vocabulary</button>
        <button className="read-aloud">Read / Create Audio</button> */}
      </div>
    </>
  );
};

export default HomePage;
