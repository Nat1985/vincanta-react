import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
    name: 'query',
    initialState: {
        type: '',
        search: '',
        favourites: false
    },
    reducers: {
        selectType: (state, action) => {
            state.type = action.payload;
            state.search = '';
            state.favourites = false;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.type = '';
            state.favourites = false;
        },
        getFavourites: (state) => {
            state.favourites = true;
            state.type = '';
            state.search = '';
        }
    }
})

export const { selectType, setSearch, getFavourites } = querySlice.actions;
export default querySlice.reducer;