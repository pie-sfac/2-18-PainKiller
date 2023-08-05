// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export default store;
