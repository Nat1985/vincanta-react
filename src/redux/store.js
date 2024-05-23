import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './modeSlice.js';
import queryReducer from './querySlice.js';
import userReducer from './userSlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
        query: queryReducer,
        user: userReducer
    }
})

export default store;