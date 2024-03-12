import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
    name: 'query',
    initialState: {
        type: '',
        search: ''
    },
    reducers: {
        selectType: (state, action) => {
            state.type = action.payload;
            state.search = '';
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.type = '';
        }
    }
})

export const { selectType, setSearch } = querySlice.actions;
export default querySlice.reducer;