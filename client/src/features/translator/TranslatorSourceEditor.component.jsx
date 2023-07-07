import React from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import "../../components/home page/homePage.styles.scss";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSourceText } from "./translatorSlice.js";

const TranslatorSourceEditor = () => {
  const sourceText = useSelector((store) => store.translator.sourceText);
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    dispatch(setSourceText(e.target.value));
    reactLocalStorage.set("mainContent", sourceText);
  };

  // useEffect(() => {
  //   const text = reactLocalStorage.get("mainContent");
  //   dispatch(setSourceText(text));
  // }, []);

  return (
    <GrammarlyEditorPlugin clientId="client_5VsYi16JNi9w5uKzsrXWwH">
      <textarea
        name="source-text"
        id=""
        cols="30"
        rows="10"
        className="main-text"
        onChange={onHandleChange}
        value={sourceText}
        placeholder="Escribe aquí para recibir sugerencias de corrección y traducir el texto..."
      ></textarea>
    </GrammarlyEditorPlugin>
  );
};

export default TranslatorSourceEditor;
