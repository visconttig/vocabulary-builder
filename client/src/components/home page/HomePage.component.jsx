import React from "react";
import "./homePage.styles.scss";
import TranslatorSourceEditor from "../../features/translator/TranslatorSourceEditor.component.jsx";
import { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import { useDispatch, useSelector } from "react-redux";

import TranslatorDestinationView from "../../features/translator/TranslatorDestinationView.component.jsx";
import TranslateButton from "../buttons/TranslateButton.component.jsx";
import ExplainGrammarButton from "../buttons/ExplainGrammarButton.component.jsx";

const HomePage = () => {
  const dispatch = useDispatch;

  const onHttpTranslateHandle = async () => {};

  return (
    <>
      <div className="main-container">
        <div className="translator-container">
          <TranslatorSourceEditor />
        </div>
        <TranslatorDestinationView />
        <ExplainGrammarButton />
      </div>
      <div className="buttons-container">
        <TranslateButton />

        {/* <button className="generate-vocab">Extract Vocabulary</button>
        <button className="study-vocab">Study Vocabulary</button>
        <button className="study-saved-vocab">Study Saved Vocabulary</button>
        <button className="read-aloud">Read / Create Audio</button> */}
      </div>
    </>
  );
};

export default HomePage;
