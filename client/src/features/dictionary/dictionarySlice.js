import { createSlice } from "@reactjs/toolkit";
import { createAsyncThunk } from "@reactjs/toolkit";


const esDictionaryWords = {
    /* 
    headword : {
        headword : "blabla",
    }

    */
};

const dictionarySlice = createSlice({
    name: "dictionary",
    initialState: esDictionaryWords,
    reducers: {
        setEsDictionaryWords: (state, aciton) => {
            state.esDictionaryWords = aciton.payload;
        }, 
        setEsDictionaryWordDetails: (state, action) => {
            //
        }
    }
});