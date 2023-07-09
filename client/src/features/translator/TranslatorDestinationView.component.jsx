import React from "react";
import { useSelector } from "react-redux";

const translationPlaceholderText = "El texto traducido aparecerá aquí";

const TranslatorDestinationView = () => {
  const translation = useSelector((store) => store.translator.translatedText);

  return (
    <>
      <div className="translation-field main-text">
        {translation?.lenght > 0 ? translation : translationPlaceholderText}
      </div>
    </>
  );
};

export default TranslatorDestinationView;
