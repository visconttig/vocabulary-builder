import { configureStore } from "@reduxjs/toolkit";
import translatorReducer from "../features/translator/translatorSlice.js";
import grammarReducer from "../features/grammar/grammarSlice.js";

// redux DevTools
import { composeWithDevTools } from "@redux-devtools/extension";

export default configureStore(
  {
    reducer: {
      translator: translatorReducer,
      grammar: grammarReducer,
    },
    // devTools: true,
  },
  composeWithDevTools()
);
