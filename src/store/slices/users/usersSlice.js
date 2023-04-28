import { createSlice } from '@reduxjs/toolkit';
import { createUser, fetchUsers, updateRole } from './actionsCreator';

const initialState = {
    users: [],
    user: null,
    isLoading: false,
    error: '',
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = state.users = [...state.users, action.payload];
        },
        setUser: (state) => {
            state.user = null;
        }
    },
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
        [createUser.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
        },
        [createUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createUser.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export default usersSlice.reducer;