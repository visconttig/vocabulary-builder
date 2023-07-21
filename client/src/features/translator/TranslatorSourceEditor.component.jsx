import React from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import "../../components/homePage/homePage.styles.scss";
import "./translatorSourceEditor.styles.scss";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSourceText, setTranslatedText } from "./translatorSlice.js";

import { getGrammar } from "../grammar/grammarSlice.js";
import { resetGrammar } from "../grammar/grammarSlice.js";

const TranslatorSourceEditor = () => {
  const sourceText = useSelector((store) => store.translator.sourceText);
  const dispatch = useDispatch();

  useEffect(() => {
    const sourceText = reactLocalStorage.get("sourceText");

    if (sourceText?.length > 0 && sourceText !== undefined) {
      dispatch(setSourceText(sourceText));
      dispatch(getGrammar(sourceText));
    }
  }, [dispatch]);

  const onHandleChange = (e) => {
    dispatch(setSourceText(e.target.value));
    dispatch(getGrammar(e.target.value));
    dispatch(setTranslatedText(""));
    dispatch(resetGrammar());
  };

  return (
    <GrammarlyEditorPlugin
      config={{
        activation: "immediate",
        underlines: "on",
        introText: "",
        suggestionCards: "on",
      }}
      clientId="client_5VsYi16JNi9w5uKzsrXWwH"
      className="grammarly main-text"
    >
      <textarea
        name="source-text"
        id="source-editor"
        cols="1"
        rows="1"
        className=""
        onChange={onHandleChange}
        value={sourceText}
        placeholder="Escribe aquí para recibir sugerencias de corrección y traducir el texto..."
      ></textarea>
    </GrammarlyEditorPlugin>
  );
};

export default TranslatorSourceEditor;
