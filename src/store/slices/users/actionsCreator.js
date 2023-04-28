import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);
export const updateRole = createAsyncThunk(
    'users/updateRole',
    async (user, thunkApi) => {
        try {
            const response = await axios.put('http://localhost:8000/api/user/' + user.id, {role: user.role});
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);
export const createUser = createAsyncThunk(
    'users/createUser',
    async (user, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/store/', user);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);