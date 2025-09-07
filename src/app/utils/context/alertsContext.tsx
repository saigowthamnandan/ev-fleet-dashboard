import { createContext } from "react";
import { Alert } from "../types";

const AlertsContext = createContext({
  alerts: [] as Alert[],
  setAlerts: (alerts) => {},
});

export default AlertsContext;
