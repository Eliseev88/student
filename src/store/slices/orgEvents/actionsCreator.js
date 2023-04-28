import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrgEvents = createAsyncThunk(
    'orgEvents/fetchOrgEvents',
    async (token, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://diplom.fun/api/orgs_events', config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const getEventUsers = createAsyncThunk(
    'orgEvents/getEventUsers',
    async (id, thunkApi) => {
        try {
            const response = await axios.get('http://diplom.fun/api/event_users/' + id);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

