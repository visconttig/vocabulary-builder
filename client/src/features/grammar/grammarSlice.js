import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import debug from "debug";

const GET_GRAMMAR_URL_ENDPOINT = process.env.REACT_APP_GRAMMAR_NLP_URL_ENDPOINT;
const GET_EXPLANATIONS_URL_ENDPOINT =
  process.env.REACT_APP_GRAMMAR_EXPLANATIONS_URL_ENDPOINT;

debug(
  "%j",
  `Explanations URL: ${process.env.REACT_APP_GRAMMAR_EXPLANATIONS_URL_ENDPOINT}`
);
console.log(
  `Explanations URL_2: ${process.env.REACT_APP_GRAMMAR_EXPLANATIONS_URL_ENDPOINT}`
);

export const getGrammar = createAsyncThunk(
  "grammar/getGrammar",
  async (sourceText) => {
    const grammarPromise = fetch(GET_GRAMMAR_URL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "With-Credentials": true,
      },
      body: JSON.stringify({
        sourceText: `${sourceText}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(`An error ocurred: ${err}`));

    const result = await grammarPromise;
    return result;
  }
);

/* ========== TEST API CALL ========================== */
export const getExplanations = createAsyncThunk(
  "grammar/getExplanations",
  async (sourceText) => {
    const getExplanationsPromise = fetch(GET_EXPLANATIONS_URL_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Jsio-Token": "c4eeca51d46fd9afd0df43d3434d3c8e",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        debug("%O", data.explanation);
        return data.explanation;
      })
      .catch((err) => {
        console.log(`An error ocurred: ${err}`);
      });

    debug(getExplanationsPromise);

    const result = await getExplanationsPromise;
    return result;
  }
);

/* ******************** REAL API CALL ******************
export const getExplanations = createAsyncThunk(
  "grammar/getExplanations",
  async (sourceText) => {
    const getExplanationsPromise = fetch(GET_EXPLANATIONS_URL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //
      },
      body: JSON.stringify({
        sourceText: `${sourceText}`,
      }),
    });

    getExplanationsPromise
      .then((response) => response.json())
      .then((data) => {
        console.log(`result: ${JSON.stringify(data)}`);

        return data;
      })
      .catch((err) => {
        console.log(`An error ocurred: ${err}`);
      });

    const result = await getExplanationsPromise;
    return result;
  }
);


********************************* */

export const loadingHttpStatuses = {
  IDDLE: "iddle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  REJECTED: "failed",
};

const grammarSlice = createSlice({
  name: "grammar",
  initialState: {
    nlpGrammar: "",
    posWords: [],
    sentences: [],
    loadingGrammarStatus: loadingHttpStatuses.IDDLE,
    loadingExplanationsStatus: loadingHttpStatuses.IDDLE,
    isWordDetailsOpen: false,
    isSentenceDetailsOpen: false,
    currentSentence: null,
    currentSentenceExplanation: null,
    currentWord: null,
    error: null,
  },
  reducers: {
    setNlpGrammar: (state, action) => {
      console.log(`SET_NLP: ${action.payload}`);
      state.nlpGrammar = action.payload;
    },
    resetGrammar: (state) => {
      state.nlpGrammar = "";
      state.posWords = [];
      state.sentences = [];
    },
    setIsWordDetailsOpen: (state, action) => {
      state.isWordDetailsOpen = action.payload;
    },
    setIsSentenceDetailsOpen: (state, action) => {
      state.isSentenceDetailsOpen = action.payload;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setCurrentSentence: (state, action) => {
      state.currentSentence = action.payload;
    },
    resetCurrentSentenceExplanation: (state) => {
      state.currentSentenceExplanation = null;
    },
    resetLoadingExplanationsStatus: (state) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.IDDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGrammar.fulfilled, (state, action) => {
      state.nlpGrammar = action.payload?.nlpGrammar;
      state.posWords = action.payload?.posWords;
      state.sentences = action.payload?.sentences;
      state.loadingGrammarStatus = loadingHttpStatuses.SUCCEEDED;
    });
    builder.addCase(getExplanations.fulfilled, (state, action) => {
      state.currentSentenceExplanation = action.payload;
      state.loadingExplanationsStatus = loadingHttpStatuses.SUCCEEDED;
      `GET_EXPLANATIONS FULFILLED: ${action.payload}`;
    });
    builder.addCase(getExplanations.pending, (state, action) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.PENDING;
    });
    builder.addCase(getExplanations.rejected, (state, action) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.REJECTED;
      state.error = action.error.message;
    });
  },
});

export const {
  setNlpGrammar,
  resetGrammar,
  setIsWordDetailsOpen,
  setIsSentenceDetailsOpen,
  setCurrentWord,
  setCurrentSentence,
  resetCurrentSentenceExplanation,
  resetLoadingExplanationsStatus,
} = grammarSlice.actions;
export default grammarSlice.reducer;
