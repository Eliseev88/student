import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice';
import filterFormReducer from './slices/filterFormSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/auth/authSlice';
import eventReducer from './slices/event/eventSlice';
import orgEventsReducer from './slices/orgEvents/orgEventsSlice';
import userEventsReducer from './slices/userEvents/userEventsSlice';
import usersReducer from './slices/users/usersSlice';

// Подключаем реакт редакс
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    filterForm: filterFormReducer,
    search: searchReducer,
    auth: authReducer,
    events: eventReducer,
    orgEvents: orgEventsReducer,
    userEvents: userEventsReducer,
    users: usersReducer,
  },
});
