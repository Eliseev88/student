import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    'auth/register',
    async (obj, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', obj);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (obj, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', obj);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (token, thunkApi) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:8000/api/logout', {}, config)
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    }
);
export const getUserByToken = createAsyncThunk(
    'auth/getUserByToken',
    async (token, thunkApi) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:8000/api/tokenAuth', {}, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    }
)