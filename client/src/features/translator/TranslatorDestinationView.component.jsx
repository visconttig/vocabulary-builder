import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { setTranslatedText } from "./translatorSlice.js";

import "../../components/home page/homePage.styles.scss";
import "./translatorDestinationView.styles.scss";

const translationPlaceholderText = "El texto traducido aparecerá aquí";

const TranslatorDestinationView = () => {
  const translatedText = useSelector(
    (store) => store.translator.translatedText
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const translatedText = reactLocalStorage.get("translatedText");
    if (translatedText?.length > 0 && translatedText != "undefined") {
      dispatch(setTranslatedText(translatedText));
    }
  }, []);

  const isTranslated =
    translatedText?.length > 0 && translatedText != "undefined";

  return (
    <>
      <div
        className={`translation-field main-text ${
          isTranslated > 0 ? null : "placeholder-text"
        }`}
      >
        {isTranslated ? translatedText : translationPlaceholderText}
      </div>
    </>
  );
};

export default TranslatorDestinationView;
