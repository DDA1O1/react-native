import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  battery: 0,
  flightTime: 0,
  lastUpdate: new Date().toISOString(),
  error: null,
};

export const droneSlice = createSlice({
  name: 'drone',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    updateDroneState: (state, action) => {
      const { battery, flightTime } = action.payload;
      state.battery = battery;
      state.flightTime = flightTime;
      state.lastUpdate = new Date().toISOString();
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setConnectionStatus, updateDroneState, setError } = droneSlice.actions;

export default droneSlice.reducer; 