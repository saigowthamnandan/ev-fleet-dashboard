"use client";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import PreferencesContext from "./utils/context/preferencesContext";
import Header from "./components/Header";
import { Alert } from "./utils/types";
import AlertsContext from "./utils/context/alertsContext";
import { useTranslation } from "./i18n/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Home() {
  const [preferences, setPreferences] = useState({
    language: "de",
    isOnline: true,
  });
  const [mounted, setMounted] = useState(false);

  const { t } = useTranslation(preferences.language || "de", "alerts");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading or fallback until both mounted and translations loaded
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PreferencesContext value={{ preferences, setPreferences }}>
      <Provider store={store}>
        <Header translation={t} />
        <Dashboard translation={t} />
      </Provider>
    </PreferencesContext>
  );
}
