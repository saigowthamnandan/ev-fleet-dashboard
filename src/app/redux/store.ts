import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertsSlice";

export const store = configureStore({
  reducer: { alerts: alertSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
