import { createSlice } from '@reduxjs/toolkit';
import { getUserEvents, signed, unsigned } from './actionsCreator';

const initialState = {
    userEvents: [],
    isLoading: false,
    error: '',
    deleted: false,
}

export const userEventsSlice = createSlice({
    name: 'userEvents',
    initialState,
    reducers: {},
    extraReducers: {
        [getUserEvents.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.userEvents = action.payload;
        },
        [getUserEvents.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getUserEvents.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [unsigned.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = '';
            state.deleted = true;
        },
        [signed.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.userEvents = [...state.userEvents, action.payload];
        }
    }
});

export default userEventsSlice.reducer;