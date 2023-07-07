import { configureStore } from "@reduxjs/toolkit";
import translatorReducer from "../features/translator/translatorSlice.js";

export default configureStore({
  reducer: {
    translator: translatorReducer,
  },
  devTools: true,
});
