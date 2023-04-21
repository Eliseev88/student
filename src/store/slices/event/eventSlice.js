import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, getEventById, createEvent, editEvent, deleteEvent } from './actionCreator';

const initialState = {
    events: [],
    event: null,
    isLoading: false,
    error: '',
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchEvents.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.events = action.payload;
        },
        [fetchEvents.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchEvents.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [getEventById.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.event = action.payload;
        },
        [getEventById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getEventById.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [createEvent.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.events = [...state.events, action.payload];
            state.event = action.payload;
        },
        [createEvent.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createEvent.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [editEvent.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.events = [...state.events, action.payload];
            state.event = action.payload;
        },
        [editEvent.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editEvent.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [deleteEvent.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.event = 'delete';
        },
    }
});

export default eventSlice.reducer;