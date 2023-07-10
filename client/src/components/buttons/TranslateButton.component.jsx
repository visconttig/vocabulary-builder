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
  const sourceLanguage = useSelector(
    (store) => store.translator.sourceLanguage
  );
  const targetLanguage = useSelector(
    (store) => store.translator.targetLanguage
  );

  const translateData = {
    sourceLanguage,
    targetLanguage,
    toTranslateText,
  };

  const onClickHandler = async () => {
    dispatch(translateText(translateData));
    console.log(`TARGET LANGUAGE ${targetLanguage}`);
    console.log(`SOURCE LANGUAGE: ${sourceLanguage}`);
  };

  return (
    <button onClick={onClickHandler} style={style} name="translate-button">
      TRANSLATE BUTTON
    </button>
  );
};

export default TranslateButton;
