import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL_ENDPOINT = "http://localhost:4000/grammar/nlp/tokens";

export const getGrammar = createAsyncThunk(
  "grammar/getGrammar",
  async (sourceText) => {
    const grammarPromise = fetch(URL_ENDPOINT, {
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
        console.log(`json: ${data}`);
        return data;
      })
      .catch((err) => console.log(`An error ocurred: ${err}`));

    const result = await grammarPromise;
    return result;
  }
);

const loadingGrammarStatuses = {
  IDDLE: "iddle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const grammarSlice = createSlice({
  name: "grammar",
  initialState: {
    nlpGrammar: "",
    posWords: [],
    sentences: [],
    loadingGrammarStatus: loadingGrammarStatuses.IDDLE,
  },
  reducers: {
    setNlpGrammar: (state, action) => {
      console.log(`SET_NLP: ${action.payload}`);
      state.nlpGrammar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGrammar.fulfilled, (state, action) => {
      state.nlpGrammar = action.payload?.nlpGrammar;
      state.posWords = action.payload?.posWords;
      state.sentences = action.payload?.sentences;
      state.loadingGrammarStatus = loadingGrammarStatuses.SUCCEEDED;
    });
  },
});

export const { setNlpGrammar } = grammarSlice.actions;
export default grammarSlice.reducer;
