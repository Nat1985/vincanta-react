import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'show',
    initialState: {
        isShow: false
    },
    reducers: {
        setShow: (state, action) => {
            console.log('eccolo: ', action.payload)
            state.isShow = action.payload;
        }
    }
})

export const { setShow } = menuSlice.actions;
export default menuSlice.reducer;