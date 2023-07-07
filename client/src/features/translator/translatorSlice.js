import { createSlice } from "@reduxjs/toolkit";

const translatorSlice = createSlice({
  name: "translator",
  initialState: {
    sourceText: "",
    translatedText: "",
  },
  reducers: {
    setSourceText: (state, action) => {
      state.sourceText = action.payload;
    },
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload;
    },
  },
});

export const { setSourceText, setTranslatedText } = translatorSlice.actions;
// TODO: export sourceTextSelector
export default translatorSlice.reducer;
