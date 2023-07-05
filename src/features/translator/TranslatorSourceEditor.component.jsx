import React from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import "../../components/home page/homePage.styles.scss";
import { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { setTextSource, textSourceSelector } from "./translatorSlice.js";

const TranslatorSourceEditor = () => {
  const [content, setContent] = useState("");
  //   const textSource = useSelector(textSourceSelector);
  //   console.log(`Text source: "${textSource}"`);
  //   const dispatch = useDispatch();

  const onHandleChange = (e) => {
    setContent(e.target.value);
    reactLocalStorage.set("mainContent", content);
  };

  useEffect(() => {
    const text = reactLocalStorage.get("mainContent");
    setContent(text);
  }, []);

  return (
    <GrammarlyEditorPlugin clientId="client_5VsYi16JNi9w5uKzsrXWwH">
      <textarea
        name="source-text"
        id=""
        cols="30"
        rows="10"
        className="main-text"
        onChange={onHandleChange}
        value={content}
      ></textarea>
    </GrammarlyEditorPlugin>
  );
};

export default TranslatorSourceEditor;
