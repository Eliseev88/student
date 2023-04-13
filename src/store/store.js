import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice';
import filterFormReducer from './slices/filterFormSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';

// Подключаем реакт редакс
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    filterForm: filterFormReducer,
    search: searchReducer,
    auth: authReducer,
  },
});
