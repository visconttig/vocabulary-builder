import React from "react";
import { useSelector } from "react-redux";
import "./vocabulary.styles.scss";
import { useDispatch } from "react-redux";

import SentenceDetailsComponent from "../vocabulary/SentenceDetails.component.jsx";
import { setIsWordDetailsOpen } from "../../features/grammar/grammarSlice.js";
import { setIsSentenceDetailsOpen } from "../../features/grammar/grammarSlice.js";
import {
  setCurrentSentence,
  setCurrentWord,
} from "../../features/grammar/grammarSlice.js";

const VocabularyComponent = () => {
  const { posWords } = useSelector((store) => store.grammar);
  const { sentences } = useSelector((store) => store.grammar);
  const { currentWord, currentSentence } = useSelector(
    (store) => store.grammar
  );

  const { isWordDetailsOpen, isSentenceDetailsOpen } = useSelector(
    (store) => store.grammar
  );
  const dispatch = useDispatch();

  const onWordClickHandle = (e) => {
    // open word details component
  };

  const onSentenceClickHandle = async (e) => {
    // open detailed grammar sentence component
    await dispatch(setCurrentSentence(e.target.value));
    dispatch(setIsSentenceDetailsOpen(true));
  };

  return (
    <>
      <div className="vocabulary-container main-text">
        {posWords &&
          Object.keys(posWords).map((word) => (
            <button
              className="word-button"
              key={word}
              onClick={(e) => onWordClickHandle(e)}
              value={word}
            >
              {word}
            </button>
          ))}

        {sentences && (
          <hr
            style={{
              width: "98%",
              color: "blue",
              margin: "0.8rem",
              backgroundColor: "gray",
              height: "5px",
              opacity: "0.4",
              borderRadius: "0.8rem",
            }}
          />
        )}

        {sentences &&
          Object.keys(sentences).map((sentence) => {
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

      {isSentenceDetailsOpen ? <SentenceDetailsComponent /> : null}
    </>
  );
};

export default VocabularyComponent;
