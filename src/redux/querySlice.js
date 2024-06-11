import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
    name: 'query',
    initialState: {
        type: '',
        search: '',
        favourites: false,
        priceRange: null,
        volumeRange: null,
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
        getFavourites: (state, action) => {
            state.favourites = action.payload;
            state.type = '';
            state.search = '';
        },
        setPriceRange: (state, action) => {
            state.priceRange = {
                from: action.payload.from,
                to: action.payload.to,
                option: action.payload.option
            }
        },
        setRangeNull: (state) => {
            state.priceRange = null;
        },
        setVolumeRange: (state, action) => {
            console.log('here: ', action.payload)
            state.volumeRange = action.payload
        },
        setVolumeNull: (state) => {
            state.volumeRange = null
        }
    }
})

export const { selectType, setSearch, getFavourites, setPriceRange, setRangeNull, setVolumeRange, setVolumeNull } = querySlice.actions;
export default querySlice.reducer;