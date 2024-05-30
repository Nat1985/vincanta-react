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
            console.log(result.message);
            return result.payload;
        } else {
            const error = await response.json();
            throw error;
        }
    }
)

export const checkToken = createAsyncThunk(
    'user/checkToken',
    async (token) => {
        const url = `${process.env.REACT_APP_SERVER_BASE_URL}/users/verify-token`;
        const headers = {
            'Content-Type': 'application/json'
        };
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({ token })
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            return result.payload;
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
        token: null
    },
    reducers: {
        getLogged: (state) => {
            state.isLogged = true;
        },
        getUnlogged: (state) => {
            state.isLogged = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLogin.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(sendLogin.fulfilled, (state, action) => {
                localStorage.setItem('vincanta-token', action.payload);
                state.isLogged = true;
                state.token = action.payload;
                state.fetchStatus = 'succeeded';
                state.error = null;
            })
            .addCase(sendLogin.rejected, (state, action) => {
                console.log('Error: ', action.error);
                state.isLogged = false;
                localStorage.removeItem('vincanta-token');
                state.error = action.error;
                state.fetchStatus = 'failed';
            })
            .addCase(checkToken.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                localStorage.setItem('vincanta-token', action.payload);
                state.isLogged = true;
                state.token = action.payload;
                state.fetchStatus = 'succeeded';
                state.error = null;
            })
            .addCase(checkToken.rejected, (state, action) => {
                console.log('Error: ', action.error);
                state.isLogged = false;
                state.token = null;
                localStorage.removeItem('vincanta-token');
                state.error = action.error;
                state.fetchStatus = 'failed';
            })
    }
})

export const { getLogged, getUnlogged } = userSlice.actions;
export default userSlice.reducer;