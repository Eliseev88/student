import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk(
    'event/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get('http://diplom.fun/api/events');
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
)

export const getEventById = createAsyncThunk(
    'event/eventById',
    async (id, thunkApi) => {
        try {
            const response = await axios.get('http://diplom.fun/api/event/' + id);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (obj, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
        };
        try {
            const response = await axios.post('http://diplom.fun/api/event', obj.event, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const editEvent = createAsyncThunk(
    'event/editEvent',
    async (obj, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
        };
        try {
            const response = await axios.put('http://diplom.fun/api/event/' + obj.event.id, obj.event, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (obj, thunkApi) => {
        const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
        };
        try {
            const response = await axios.delete('http://diplom.fun/api/event/' + obj.id, config);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('Error');
        }
    }
);