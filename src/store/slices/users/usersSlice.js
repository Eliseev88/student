import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './actionsCreator';

const initialState = {
    users: [],
    isLoading: false,
    error: '',
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export default usersSlice.reducer;