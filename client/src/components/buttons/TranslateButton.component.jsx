import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {translateText} from "../../features/translator/translatorSlice.js";
import "./translateButton.styles.scss";

const TranslateButton = () => {
  const dispatch = useDispatch();

  const toTranslateText = useSelector((store) => store.translator.sourceText);
  const sourceLanguage = useSelector((store) => store.translator.sourceLanguage);
  const targetLanguage = useSelector((store) => store.translator.targetLanguage);

  const translateData = {
    sourceLanguage,
    targetLanguage,
    toTranslateText
  };

  const onClickHandler = async () => {
    dispatch(translateText(translateData));
  };

  return (
    <button
      onClick={onClickHandler}
      name="translate-button"
      className="translate-button"
    >
      Translate
    </button>
  );
};

export default TranslateButton;
