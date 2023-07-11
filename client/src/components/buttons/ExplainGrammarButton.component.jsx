import React from "react";

const ExplainGrammarButton = () => {
  const onClickHandler = () => {
    // call http action here
  };

  return (
    <button
      style={{
        border: "3px solid red",
      }}
      onClick={onClickHandler}
    >
      EXPLAIN GRAMMAR
    </button>
  );
};

export default ExplainGrammarButton;
