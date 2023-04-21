import { createSlice } from '@reduxjs/toolkit'
import { login, logout, registerUser, getUserByToken } from './actionCreator';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registerUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [logout.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = null;
    },
    [logout.pending.type]: (state) => {
      state.isLoading = true;
    },
    [logout.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [getUserByToken.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [getUserByToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUserByToken.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
  }
})

export const {
  setAuth
} = authSlice.actions

export default authSlice.reducer