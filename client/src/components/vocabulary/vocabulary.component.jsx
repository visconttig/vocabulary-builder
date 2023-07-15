import React from "react";
import { useSelector } from "react-redux";
import "./vocabulary.styles.scss";

import { useEffect } from "react";

const VocabularyComponent = () => {
  const { posWords } = useSelector((store) => store.grammar);

  const onClickHandle = (e) => {
    console.log(`value: ${JSON.stringify(e.target.attributes.value)}`);
    alert(`Click: ${e.target.attributes.value}`);
  };

  return (
    <div className="vocabulary-container main-text">
      <ul className="words-list">
        {posWords &&
          Object.keys(posWords).map((word) => (
            <li onClick={(e) => onClickHandle(e)} key={word} value={`${word}`}>
              {word}
            </li>
          ))}
        {posWords &&
          Object.keys(posWords).map((w) => {
            console.log(`w: ${w}`);
          })}
      </ul>
    </div>
  );
};

export default VocabularyComponent;
