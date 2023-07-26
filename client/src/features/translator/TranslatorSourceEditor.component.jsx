import React from "react";
import {GrammarlyEditorPlugin} from "@grammarly/editor-sdk-react";
import "../../components/homePage/homePage.styles.scss";
import "./translatorSourceEditor.styles.scss";
import {reactLocalStorage} from "reactjs-localstorage";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setSourceText, setTranslatedText} from "./translatorSlice.js";
import ContentEditable from "react-contenteditable";
import { useRef } from "react";
import striptags from "striptags";
import { convert } from "html-to-text";


import {getGrammar} from "../grammar/grammarSlice.js";
import {resetGrammar} from "../grammar/grammarSlice.js";

const TranslatorSourceEditor = () => {
  const sourceText = useSelector((store) => store.translator.sourceText);
  const dispatch = useDispatch();
  const sourceFieldRef = useRef("");



  useEffect(() => {
    const sourceText = reactLocalStorage.get("sourceText");

    if (sourceText?.length > 0 && sourceText !== undefined) {
      dispatch(setSourceText(sourceText));
      dispatch(getGrammar(convert(sourceText, convertOptions)));
    }
  }, [dispatch]);


  const convertOptions = {
    preserveNewlines: false,
  }

  
  const onHandleChange = (e) => {
    const html = e.target.value;
    const strippedHtml = striptags(html, { allowedTags: new Set(["&nbsp;", "\u0020"])}, "\n");
    const removeEmptyLines = convert(strippedHtml, convertOptions);
    dispatch(setSourceText(html));
    dispatch(getGrammar(removeEmptyLines));
    dispatch(setTranslatedText(""));
    dispatch(resetGrammar());
  };


  return (
    <GrammarlyEditorPlugin
      config={{
        activation: "immediate",
        underlines: "on",
        introText: "",
        suggestionCards: "on"
      }}
      clientId="client_5VsYi16JNi9w5uKzsrXWwH"
      className="grammarly main-text"
    >
      
   <ContentEditable 
      ref={sourceFieldRef}
      html={sourceText}
      disabled={false}
      onChange={onHandleChange}
      name="source-text"
        id="source-editor"
        cols="1"
        rows="1"
        className="main-text"
        />

    </GrammarlyEditorPlugin>
  );
};


export default TranslatorSourceEditor;
