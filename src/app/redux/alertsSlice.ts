import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from '../utils/types';

type alertsState = {
  alerts: Alert[];
  dismissedAlertIds: string[];
};

const initialState: alertsState = {
  alerts: [],
  dismissedAlertIds: [],
};
const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
      if (!state.dismissedAlertIds.includes(action.payload)) {
        state.dismissedAlertIds.push(action.payload);
      }
    },
    clearAlerts: (state) => {
      state.alerts = [];
      state.dismissedAlertIds = [];
    },
    resetDismissedAlert: (state, action: PayloadAction<string>) => {
      state.dismissedAlertIds = state.dismissedAlertIds.filter((id) => id !== action.payload);
    },
    resetAllDismissedAlerts: (state) => {
      state.dismissedAlertIds = [];
    },
  },
});

export const {addAlerts, removeAlert, clearAlerts, resetDismissedAlert, resetAllDismissedAlerts} = alertsSlice.actions;
export default alertsSlice.reducer;
