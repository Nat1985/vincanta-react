import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFoodData = createAsyncThunk(
    'food/data',
    async () => {
        let url = `${process.env.REACT_APP_SERVER_BASE_URL}/food`;
        let headers = { 'Content-Type': 'application/json' };
        let options = { method: 'GET', headers };
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            console.log('food thunk result: ', result);
            return result.payload
        } else {
            const error = await response.json();
            throw error;
        }
    }
)

const foodDataSlice = createSlice({
    name: 'foodData',
    initialState: {
        fetchStatus: 'idle',
        error: null,
        data: null,
        mode: 'show'
    },
    reducers: {
        setFoodMode: (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoodData.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(getFoodData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = 'succeeded';
            })
            .addCase(getFoodData.rejected, (state, action) => {
                state.error = action.error;
                state.fetchStatus = 'failed';
            })
    }
})

export const { setFoodMode } = foodDataSlice.actions;
export default foodDataSlice.reducer;