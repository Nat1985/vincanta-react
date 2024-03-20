import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        mode: 'show'
    },
    reducers: {
        selectMode: (state, action) => {
            state.mode = action.payload.mode;
        }
    }
})

export const { selectMode, setScrollHeight } = modeSlice.actions;
export default modeSlice.reducer;