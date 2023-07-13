import React from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import "../../components/home page/homePage.styles.scss";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSourceText, setTranslatedText } from "./translatorSlice.js";

import { getGrammar } from "../grammar/grammarSlice.js";

const TranslatorSourceEditor = () => {
  const sourceText = useSelector((store) => store.translator.sourceText);
  const dispatch = useDispatch();

  useEffect(() => {
    const sourceText = reactLocalStorage.get("sourceText");

    if (sourceText?.length > 0 && sourceText != undefined) {
      dispatch(setSourceText(sourceText));
    }
  }, []);

  const onHandleChange = (e) => {
    dispatch(setSourceText(e.target.value));
    dispatch(getGrammar(e.target.value));
    // reset translated text
    dispatch(setTranslatedText(""));
  };

  return (
    <GrammarlyEditorPlugin clientId="client_5VsYi16JNi9w5uKzsrXWwH">
      <textarea
        name="source-text"
        id=""
        cols="30"
        rows="10"
        className="main-text "
        onChange={onHandleChange}
        value={sourceText}
        placeholder="Escribe aquí para recibir sugerencias de corrección y traducir el texto..."
      ></textarea>
    </GrammarlyEditorPlugin>
  );
};

export default TranslatorSourceEditor;
