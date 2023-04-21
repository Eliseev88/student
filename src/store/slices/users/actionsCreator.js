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
)