import { configureStore } from "@reduxjs/toolkit";
import modeReducer from './modeSlice.js';
import queryReducer from './querySlice.js';
import userReducer from './userSlice.js';
import menuReducer from './menuSlice.js';
import foodDataReducer from './foodDataSlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
        query: queryReducer,
        user: userReducer,
        menu: menuReducer,
        foodData: foodDataReducer
    }
})

export default store;