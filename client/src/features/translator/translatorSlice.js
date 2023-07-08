import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const translateText = createAsyncThunk(
  "translator/translateText",
  async (toTranslateText) => {
    const response = await fetch(
      "http://localhost:4000/translations/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          translateText: `${toTranslateText}`,
        }),
      }
    );

    response
      .then((response) => response.json())
      .then((data) => {
        return (data) => data.translateText;
      })
      .catch((err) => {
        console.log(`ERROR 2: ${err}`);
      });
  }
);

/*    ******** ORIGINAL FUNCITON *****************

    // dispatch(translateText(toTranslateText));
    // const translatePromise = fetch(
    //   "http://localhost:4000/translations/translate",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify({
    //       translateText: `${toTranslateText}`,
    //     }),
    //   }
    // );
    // translatePromise
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(`Recieved: "${data.translateText}"`);
    //     // httpTranslation = data;
    //     // callDispatch(data);
    //   });

    **************************** */

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
        state.loadingTranslation = loadingTranslationStatuses.SUCCEEDED;
      },
      builder.addCase(translateText.rejected, (state, action) => {
        state.error = action.error;
        console.log(`ERROR: ${action.error}`);
      })
    );
  },
});

export const { setSourceText, setTranslatedText } = translatorSlice.actions;
// TODO: export sourceTextSelector
export default translatorSlice.reducer;
