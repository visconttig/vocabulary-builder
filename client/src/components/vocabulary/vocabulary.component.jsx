import React from "react";
import { useSelector } from "react-redux";
import "./vocabulary.styles.scss";

import { useEffect } from "react";

const VocabularyComponent = () => {
  const { posWords } = useSelector((store) => store.grammar);

  const { sentences } = useSelector((store) => store.grammar);
  // console.log(`Sentences length: ${sentences.length}`);

  const onClickHandle = (e) => {
    console.log(`value: ${e.target.value}`);
    alert(`Click: ${e.target.value}`);
  };

  const onSentenceClickHandle = async (e) => {
    const response = fetch("http://localhost:4000/grammar/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceText: `${e.target.value}`,
      }),
    });

    response
      .then((response) => response.text())
      .then((data) => {
        console.log(`HttpExplainGrammar: ${data}`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className="vocabulary-container main-text">
      {posWords &&
        Object.keys(posWords).map((word) => (
          <button
            className="word-button"
            key={word}
            onClick={(e) => onClickHandle(e)}
            value={word}
          >
            {word}
          </button>
        ))}

      {sentences && (
        <hr
          style={{
            width: "80%",
            color: "blue",
            margin: "0.8rem",
            height: "2px",
          }}
        />
      )}

      {sentences &&
        Object.keys(sentences).map((sentence) => {
          // console.log(`sentence: ${sentence}`);
          return (
            <button
              key={sentence}
              value={sentence}
              onClick={(e) => onSentenceClickHandle(e)}
              className="word-button"
              style={{
                backgroundColor: "rgba(255, 0,72, 0.43)",
              }}
            >
              {sentence}
            </button>
          );
        })}
    </div>
  );
};

export default VocabularyComponent;
