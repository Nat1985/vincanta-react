import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './modeSlice.js';
import typeReducer from './typeSlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
        type: typeReducer
    }
})

export default store;