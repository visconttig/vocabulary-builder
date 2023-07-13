import React from "react";
import "../../components/home page/homePage.styles.scss";
import "./nlp-grammar.styles.scss";

import { useSelector } from "react-redux";

const GrammarNlpView = () => {
  const nlpGrammar = useSelector((store) => store.grammar.nlpGrammar);

  let dangerousHTML = { __html: nlpGrammar };

  return (
    <>
      <div className="nlp-container translation-field main-text">
        <div className="surface-container">
          <div className="container">
            <div className="surface">
              <div id="output" dangerouslySetInnerHTML={dangerousHTML}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrammarNlpView;
