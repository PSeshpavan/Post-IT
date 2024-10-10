import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    const response = await axios.get('http://localhost:3000/api/userdata', {
        headers: {
            authorization: Cookies.get('token'),
        },
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
        clearAuthData: (state) => {
            state.userData = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setAuthLoading, setUserData, setAuthError, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
