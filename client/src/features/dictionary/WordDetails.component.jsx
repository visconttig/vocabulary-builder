import React from "react";
import "../../components/vocabulary/SentenceDetails.component.jsx";
import "./sentenceDetails.styles.scss";

import {getExplanations} from "../../features/grammar/grammarSlice.js";
import {setIsSentenceDetailsOpen} from "../../features/grammar/grammarSlice.js";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setCurrentSentence} from "../../features/grammar/grammarSlice.js";
import {resetCurrentSentenceExplanation, resetLoadingExplanationsStatus} from "../../features/grammar/grammarSlice.js";
import {loadingHttpStatuses} from "../../features/grammar/grammarSlice.js";

const SentenceDetailsComponent = () => {
  const {isSentenceDetailsOpen} = useSelector((store) => store.grammar);
  const {currentSentence} = useSelector((store) => store.grammar);
  const {loadingExplanationsStatus} = useSelector((store) => store.grammar);
  const {currentSentenceExplanation} = useSelector((store) => store.grammar);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingExplanationsStatus === loadingHttpStatuses.IDDLE) {
      dispatch(getExplanations(currentSentence));
    }
  }, []);

  const onHandleSentenceClose = () => {
    dispatch(setIsSentenceDetailsOpen(false));
    dispatch(resetCurrentSentenceExplanation());
    dispatch(resetLoadingExplanationsStatus());
    dispatch(setCurrentSentence(null));
  };

  return (
    <>
      {isSentenceDetailsOpen && (
        <div
          id="sentence-details-container"
          className="main-text nlp-container"
        >
          <div className="header-buttons">
            <button onClick={() => onHandleSentenceClose()}>X</button>
          </div>
          <div className="info-container">
            <h1>{currentSentence}</h1>
            {loadingExplanationsStatus === loadingHttpStatuses.PENDING ? (
              <p>Loading...</p>
            ) : (
              <p className="grammar-explanation">{"Word details here..."}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SentenceDetailsComponent;
