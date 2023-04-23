import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateRole } from './actionsCreator';

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
        [updateRole.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.users = state.users.map(el => {
                if (el.id === action.payload.id) {
                    return action.payload;
                }
                return el;
            });
        },
    }
});

export default usersSlice.reducer;