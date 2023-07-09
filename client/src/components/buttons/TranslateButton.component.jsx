import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  translateText,
  translatedText,
} from "../../features/translator/translatorSlice.js";

const TranslateButton = ({ style }) => {
  const dispatch = useDispatch();
  const translatedText = useSelector(
    (store) => store.translator.translatedText
  );
  const translationStatus = useSelector(
    (store) => store.translator.loadingTranslation
  );
  const toTranslateText = useSelector((store) => store.translator.sourceText);

  const onClickHandler = async () => {
    dispatch(translateText(toTranslateText));
  };

  return (
    <button onClick={onClickHandler} style={style}>
      TRANSLATE BUTTON
    </button>
  );
};

export default TranslateButton;
