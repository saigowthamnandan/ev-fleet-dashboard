"use client";

import { createContext } from "react";

const PreferencesContext = createContext({
  preferences: {
    language: "de",
    isOnline: true,
  },
  setPreferences: (preferences: { language: string; isOnline: boolean }) => {},
});

export default PreferencesContext;
