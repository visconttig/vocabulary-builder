import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";



const EXPLANATIONS_URL = process.env.REACT_APP_ENVIROMENT !== "production" ? (
  "http://localhost:4000/grammar/explain"
) : (
  "https://vocabulary-builder-server.onrender.com/grammar/explain" 
);

const NLP_URL = process.env.REACT_APP_ENVIROMENT !== 'production' ? (
  "http://localhost:4000/grammar/nlp/tokens"
) : (
  "https://vocabulary-builder-server.onrender.com/grammar/nlp/tokens"
);



export const getGrammar = createAsyncThunk("grammar/getGrammar", async (sourceText) => {
  const grammarPromise = fetch(NLP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "With-Credentials": true
    },
    body: JSON.stringify({
      sourceText: `${sourceText}`
    })
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(`An error ocurred: ${err.message}`));

  const result = await grammarPromise;
  return result;
});

export const getExplanations = createAsyncThunk("grammar/getExplanations", async (sourceText) => {
  const getExplanationsPromise = fetch(EXPLANATIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sourceText: `${sourceText}`
    })
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`An error ocurred: ${err}`);
    });

  const result = await getExplanationsPromise;
  return result;
});

export const loadingHttpStatuses = {
  IDDLE: "iddle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  REJECTED: "failed"
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
    error: null
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGrammar.fulfilled, (state, action) => {
      state.nlpGrammar = action.payload?.nlpGrammar;
      state.posWords = action.payload?.posWords;
      state.sentences = action.payload?.sentences;
      state.loadingGrammarStatus = loadingHttpStatuses.SUCCEEDED;
    });
    builder.addCase(getExplanations.fulfilled, (state, action) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.SUCCEEDED;
      state.currentSentenceExplanation = action.payload;
    });
    builder.addCase(getExplanations.pending, (state, action) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.PENDING;
    });
    builder.addCase(getExplanations.rejected, (state, action) => {
      state.loadingExplanationsStatus = loadingHttpStatuses.REJECTED;
      state.error = action.error.message;
    });
  }
});

export const {
  setNlpGrammar,
  resetGrammar,
  setIsWordDetailsOpen,
  setIsSentenceDetailsOpen,
  setCurrentWord,
  setCurrentSentence,
  resetCurrentSentenceExplanation,
  resetLoadingExplanationsStatus
} = grammarSlice.actions;
export default grammarSlice.reducer;
