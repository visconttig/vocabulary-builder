import { createSlice } from "@reduxjs/toolkit";

const translatorSlice = () =>
  createSlice({
    name: "translator",
    initialState: {
      sourceText: "",
      translatedText: "",
    },
    reducers: {
      setSourceText(state, action) {
        state.sourceText = action.payload;
      },
      setTranslatedText(state, action) {
        state.translatedText = action.payload;
      },
    },
  });

// export const { setTextSource, setTranslatedText } = translatorSlice.actions;
export const sourceTextSelector = (state) => state.sourceText;
export default translatorSlice.reducer;
