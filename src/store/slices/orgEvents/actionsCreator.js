import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrgEvents = createAsyncThunk(
    'orgEvents/fetchOrgEvents',
    async (token, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://localhost:8000/api/orgs_events', config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
)