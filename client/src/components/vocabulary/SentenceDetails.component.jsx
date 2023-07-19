import React from "react";
import "./sentenceDetails.styles.scss";

import {
  getExplanations,
  setIsWordDetailsOpen,
} from "../../features/grammar/grammarSlice.js";
import { setIsSentenceDetailsOpen } from "../../features/grammar/grammarSlice.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentSentence } from "../../features/grammar/grammarSlice.js";
import { resetCurrentSentenceExplanation } from "../../features/grammar/grammarSlice.js";
import { loadingHttpStatuses } from "../../features/grammar/grammarSlice.js";

const SentenceDetailsComponent = () => {
  const { isWordDetailsOpen, isSentenceDetailsOpen } = useSelector(
    (store) => store.grammar
  );
  const { currentSentence } = useSelector((store) => store.grammar);
  const { loadingExplanationsStatus } = useSelector((store) => store.grammar);

  const dispatch = useDispatch();

  useEffect(() => {
    /* **TO DO: get grammar explanations here: */
    console.log(`current sentence: ${currentSentence}`);
    console.log(`loading explanations: ${loadingExplanationsStatus}`);
    if (loadingExplanationsStatus === loadingHttpStatuses.IDDLE) {
      console.log(`DISPATCHING getExplanations now...`);
      dispatch(getExplanations(currentSentence));
    }
  }, [loadingExplanationsStatus, dispatch]);

  const onHandleSentenceClose = () => {
    dispatch(setIsSentenceDetailsOpen(false));
    dispatch(setCurrentSentence(null));
    /* TODO: reset current sentence explanation */
    dispatch(resetCurrentSentenceExplanation());
  };

  return (
    <>
      {isSentenceDetailsOpen && (
        <div id="sentence-details-container" className="main-text">
          <div className="header-buttons">
            <button onClick={() => onHandleSentenceClose()}>X</button>
          </div>
          <div className="info-container">
            <h1>{currentSentence}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default SentenceDetailsComponent;
