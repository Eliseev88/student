import { createSlice } from '@reduxjs/toolkit';
import { fetchOrgEvents, getEventUsers } from './actionsCreator';

const initialState = {
    events: [],
    event: null,
    eventUsers: [],
    isLoading: false,
    error: '',
}

export const orgEventsSlice = createSlice({
    name: 'orgEvents',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOrgEvents.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.events = action.payload;
        },
        [fetchOrgEvents.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchOrgEvents.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [getEventUsers.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.eventUsers = action.payload;
        },
    }
});

export default orgEventsSlice.reducer;