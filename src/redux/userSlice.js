import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendLogin = createAsyncThunk(
    'user/login',
    async (userData) => {
        let url = `${process.env.REACT_APP_SERVER_BASE_URL}/users/login`;
        console.log('url: ', url)
        let headers = {
            'Content-Type': 'application/json',
        };
        let options = {
            method: 'POST',
            headers,
            body: JSON.stringify(userData)
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            console.log('Login result: ', result);
            localStorage.setItem('vincanta-token', result.payload.token);
            return result.payload.userData;
        } else {
            const error = await response.json();
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchStatus: 'idle',
        error: null,
        isLogged: false,
        userData: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendLogin.pending, (state) => {
            state.fetchStatus = 'loading';
        })
        .addCase(sendLogin.fulfilled, (state, action) => {
            state.isLogged = true;
            state.userData = action.payload;
            state.fetchStatus = 'succeeded';
        })
        .addCase(sendLogin.rejected, (state, action) => {
            state.isLogged = false;
            state.error = action.error;
            state.fetchStatus = 'failed';
        })
    }
})

export default userSlice.reducer;