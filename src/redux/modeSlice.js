import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        mode: 'show'
    },
    reducers: {
        selectMode: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const { selectMode } = modeSlice.actions;
export default modeSlice.reducer;