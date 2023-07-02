import React from "react";
import "./homePage.styles.scss";

const HomePage = () => {
  const translation =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <>
      <div className="main-container">
        <div className="translator-container">
          <textarea
            name="translate-field"
            id=""
            cols="5"
            rows="5"
            placeholder="Write your text here..."
            className="main-text"
          ></textarea>
        </div>
        {translation && (
          <div className="translation-field main-text">{translation}</div>
        )}
      </div>
      <div className="buttons-container">
        <button className="translate-button">Translate</button>
        <button className="generate-vocab">Extract Vocabulary</button>
        <button className="study-vocab">Study Vocabulary</button>
        <button className="study-saved-vocab">Study Saved Vocabulary</button>
        <button className="read-aloud">Read / Create Audio</button>
      </div>
    </>
  );
};

export default HomePage;
