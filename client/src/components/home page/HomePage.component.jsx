import React from "react";
import "./homePage.styles.scss";
import TranslatorSourceEditor from "../../features/translator/TranslatorSourceEditor.component.jsx";

import { useDispatch } from "react-redux";

import TranslatorDestinationView from "../../features/translator/TranslatorDestinationView.component.jsx";
import TranslateButton from "../buttons/TranslateButton.component.jsx";
import GrammarNlpButton from "../buttons/GrammarNlpButton.component.jsx";
import GrammarNlpView from "../../features/grammar/GrammarNlpView.component";
import VocabularyComponent from "../vocabulary/vocabulary.component.jsx";

const HomePage = () => {
  return (
    <>
      <div className="main-container">
        <div className="translation-views-container">
          {/* <div className="translator-container"> */}
          <TranslatorSourceEditor />
          {/* </div> */}
          <TranslatorDestinationView />
        </div>
        <GrammarNlpView />
        <VocabularyComponent />
        <div className="buttons-container">
          <TranslateButton />
          <GrammarNlpButton />
        </div>
      </div>
    </>
  );
};

export default HomePage;
