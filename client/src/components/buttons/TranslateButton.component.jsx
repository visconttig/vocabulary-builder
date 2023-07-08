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

  console.log(`TRANS_BUTT: ${translatedText}`);

  const onClickHandler = () => {
    const result = dispatch(translateText("this should be translated."));
    // set loading status ??
    console.log(`TRANSLATION STATUS: ${translationStatus}`);
  };

  return (
    <button onClick={onClickHandler} style={style}>
      TRANSLATE BUTTON
    </button>
  );
};

export default TranslateButton;
