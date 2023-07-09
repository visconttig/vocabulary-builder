import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const translateText = createAsyncThunk(
  "translator/translateText",
  async (toTranslateText) => {
    const response = fetch("http://localhost:4000/translations/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        translateText: `${toTranslateText}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`RESULT DATA: ${data.translateText}`);
        console.log(`DATA AFTER AWAIT: ${data.translateText}`);
        return data;
      })
      .catch((err) => {
        return `An error ocurred: ${err}`;
      });

    const result = await response;
    return result.translateText;
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
  },
  reducers: {
    setSourceText: (state, action) => {
      state.sourceText = action.payload;
    },
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      translateText.fulfilled,
      (state, action) => {
        state.translatedText = action.payload;

        /* --- TESTING --- */
        console.log(`FULFILLED: ${action.payload}`);
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
