import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { reactLocalStorage } from "reactjs-localstorage";

export const translateText = createAsyncThunk(
  "translator/translateText",
  async ({ sourceLanguage, targetLanguage, toTranslateText }) => {
    const response = fetch("http://localhost:4000/translations/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        toTranslateText: `${toTranslateText}`,
        sourceLanguage: `${sourceLanguage}`,
        targetLanguage: `${targetLanguage}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        JSON.stringify(data);
        console.log(`RESULT DATA on SLICE: ${JSON.stringify(data)}`);
        return data;
      })
      .catch((err) => {
        return `An error ocurred: ${err}`;
      });

    const result = await response;
    return result;
  }
);

const loadingTranslationStatuses = {
  IDDLE: "iddle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const translatorSlice = createSlice({
  name: "translator",
  initialState: {
    sourceText: "",
    translatedText: "",
    /* iddle | pending | succeeded | failed */
    loadingTranslation: "idle",
    error: null,
    sourceLanguage: "en",
    targetLanguage: "es",
  },
  reducers: {
    setSourceText: (state, action) => {
      state.sourceText = action.payload;
      reactLocalStorage.set("sourceText", `${action.payload}`);
    },
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload;
      reactLocalStorage.set("translatedText", `${action.payload}`);
    },
    /* TODO: add language setters here***
     ***
     ***
     */
  },
  extraReducers: (builder) => {
    builder.addCase(
      translateText.fulfilled,
      (state, action) => {
        state.translatedText = action.payload;
        reactLocalStorage.set("translatedText", action.payload);

        /* --- TESTING --- */
        // console.log(`FULFILLED: ${action.payload}`);
        state.loadingTranslation = loadingTranslationStatuses.SUCCEEDED;
      },
      builder.addCase(translateText.rejected, (state, action) => {
        state.error = action.error;
        state.loadingTranslation = loadingTranslationStatuses.FAILED;
        console.log(`ERROR: ${action.error}`);
      })
    );
  },
});

export const { setSourceText, setTranslatedText } = translatorSlice.actions;
// TODO: export sourceTextSelector
export default translatorSlice.reducer;
