import React from "react";
import "./homePage.styles.scss";
import TextEditor from "../text editor/TextEditor.component.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const HomePage = () => {
  const [translation, setTranslation] = useState("Text translation here...");

  const initialText =
    "Hi Hope you’ve been enjoying our services so far.We want to continue offering the best service. Could you please take five minutes and fill up this feedback form for us [share link to form]?";
  // const translation =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  useEffect(() => {
    const translatedText = reactLocalStorage.get("translation");
    setTranslation(translatedText);
  }, []);

  const translate = async () => {
    const fetchPromise = fetch("http://localhost:4000/");

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTranslation(data.body);

        reactLocalStorage.set("translation", data.body);
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="translator-container">
          <TextEditor />
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
