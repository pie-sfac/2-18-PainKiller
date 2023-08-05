// redux/ticketsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  refundStatus: {}, // Add refundStatus state
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: [],
  
  reducers: {
    setTickets: (state, action) => {
      return action.payload;
    },
    setRefundedStatus: (state, action) => {
      const { ticketId, isRefunded } = action.payload;
      return state.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, isRefunded } : ticket
      );
    },
    setSuspendedStatus: (state, action) => {
      const { ticketId, isSuspended } = action.payload;
      return state.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, isSuspended } : ticket
      );
    },
    // ... (다른 액션들)
  },
});

export const { setTickets, setRefundedStatus, setSuspendedStatus } = ticketsSlice.actions;

export default ticketsSlice.reducer;
