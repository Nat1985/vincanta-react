import { createSlice } from "@reduxjs/toolkit";

const typeSlice = createSlice({
    name: 'type',
    initialState: {
        type: ''
    },
    reducers: {
        selectType: (state, action) => {
            state.type = action.payload
        }
    }
})

export const { selectType } = typeSlice.actions;
export default typeSlice.reducer;