import React from "react";

const GrammarNlpButton = () => {
  const onClickHandler = () => {
    // // call http action
    // fetch("http://localhost:4000/grammar/nlp/tokens", {
    //   method: "POST",
    // });
  };

  return (
    <button
      style={{
        border: "3px solid red",
      }}
      onClick={onClickHandler}
    >
      ANALYZE
    </button>
  );
};

export default GrammarNlpButton;
