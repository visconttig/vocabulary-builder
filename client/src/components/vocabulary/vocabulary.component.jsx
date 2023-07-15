import React from "react";
import { useSelector } from "react-redux";
import "./vocabulary.styles.scss";

import { useEffect } from "react";

const VocabularyComponent = () => {
  const { posWords } = useSelector((store) => store.grammar);

  return (
    <div className="vocabulary-container main-text">
      <ul className="words-list">
        {posWords &&
          Object.keys(posWords).map((word) => <li key={word}>{word}</li>)}
      </ul>
    </div>
  );
};

export default VocabularyComponent;
