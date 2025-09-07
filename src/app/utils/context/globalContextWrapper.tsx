"use client";

import { useState } from "react";
import { Alert } from "../types";
import PreferencesContext from "./preferencesContext";
import AlertsContext from "./alertsContext";

export default function GlobalContextWrapper({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState({
      language: "en",
      isOnline: true,
    });
    const [alerts, setAlerts] = useState<Alert[]>([]);
    return (
      <PreferencesContext.Provider value={{ preferences, setPreferences }}>
        <AlertsContext.Provider value={{ alerts, setAlerts }}>
          {children}
        </AlertsContext.Provider>
      </PreferencesContext.Provider>
    );

}