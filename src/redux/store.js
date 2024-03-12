import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './modeSlice.js';
import queryReducer from './querySlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
        query: queryReducer
    }
})

export default store;