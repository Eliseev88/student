import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserEvents = createAsyncThunk(
    'user/getUserEvents',
    async (token, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://diplom.fun/api/user_events', config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const unsigned = createAsyncThunk(
    'user/unsigned',
    async (obj, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
        };
        try {
            const response = await axios.delete('http://diplom.fun/api/user_events/' + obj.id, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const signed = createAsyncThunk(
    'user/signed',
    async (obj, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
        };
        try {
            const response = await axios.post('http://diplom.fun/api/user_events/' + obj.id, {}, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);