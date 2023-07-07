import React from "react";
import "./homePage.styles.scss";
import TranslatorSourceEditor from "../../features/translator/TranslatorSourceEditor.component.jsx";
import { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import { useDispatch, useSelector } from "react-redux";
import { setTranslatedText } from "../../features/translator/translatorSlice.js";

const HomePage = () => {
  const dispatch = useDispatch;
  const translation = useSelector((store) => store.translator.translatedText);

  // useEffect(() => {
  //   const translatedText = reactLocalStorage.get("translation");
  //   setTranslation(translatedText);
  // }, []);

  /* --- for testing --- */
  const toTranslateText = "Hi Hope you’ve been enjoying our services so far";
  const translationPlaceholderText = "El texto traducido aparecerá aquí...";

  const onHttpTranslateHandle = async () => {
    const translatePromise = fetch(
      "http://localhost:4000/translations/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          translateText: `${toTranslateText}`,
        }),
      }
    );

    translatePromise
      .then((response) => response.json())
      .then((data) => {
        console.log(`Recieved: "${data.translateText}"`);
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="translator-container">
          <TranslatorSourceEditor />
        </div>
        <div className="translation-field main-text">
          {translation.lenght > 0 ? translation : translationPlaceholderText}
        </div>
      </div>
      <div className="buttons-container">
        <button className="translate-button" onClick={onHttpTranslateHandle}>
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
