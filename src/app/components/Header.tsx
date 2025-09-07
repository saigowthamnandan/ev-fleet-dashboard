"use client";
import { Bell, Wifi, WifiOff } from "lucide-react";
import { useContext, useEffect } from "react";
import PreferencesContext from "../utils/context/preferencesContext";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import AlertsContext from "../utils/context/alertsContext";
import { TFunction } from "i18next";
import { useSelector } from "react-redux";
import { Alert } from "../utils/types";

export default function Header({
  translation: t,
}: {
  translation: TFunction<string, undefined>;
}) {
  const { preferences, setPreferences } = useContext(PreferencesContext);
  const alerts = useSelector(
    (state: { alerts: { alerts: Alert[] } }) => state.alerts.alerts
  );
  const { language, isOnline } = preferences;
  useEffect(() => {
    const handleNetworkChange = (isOnline: boolean) => {
      setPreferences({ ...preferences, isOnline });
      if (isOnline) {
        // Show a toast or notification that the app is back online
        // Fetch latest data or perform any necessary actions
        console.log("Back online");
      }
    };
    window.addEventListener("online", () => handleNetworkChange(true));
    window.addEventListener("offline", () => handleNetworkChange(false));
    return () => {
      window.removeEventListener("online", () => handleNetworkChange(true));
      window.removeEventListener("offline", () => handleNetworkChange(false));
    };
  }, [navigator.onLine]);

  return (
    <header className="fixed top-0 w-full z-10 bg-[#c1d8ec] dark:bg-gray-800 dark:shadow-blue-100/10 px-3 py-2 md:px-6 md:py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block fill-black dark:fill-white"
            viewBox="51.765 0 151.641 36.40677966101695"
            width="151.641"
            height="36.40677966101695"
          >
            <path d="M185.694 17.9862C185.694 21.2857 187.365 22.822 193.46 22.822C193.568 22.822 200.117 23.0052 203 22.5596V25.65C199.175 26.1147 193.398 25.9398 193.348 25.9398C185.287 25.9398 182.081 23.2731 182.081 17.9849C182.081 12.6966 185.288 10.03 193.348 10.03C193.381 10.03 199.513 9.93429 203 10.4496V13.5892C200.109 13.1436 193.47 13.1477 193.46 13.1477C187.365 13.1477 185.694 14.6854 185.694 17.9849V17.9862Z" />
            <path d="M94.1131 10.2939H97.7254V18.339C97.7254 23.6273 93.5258 25.955 86.8188 25.955C80.1118 25.955 75.9354 23.6273 75.9354 18.339V10.2939H79.5477V17.616C79.5477 21.3215 81.8053 22.8591 86.8188 22.8591C91.8323 22.8591 94.1117 21.3228 94.1117 17.616V10.2939H94.1131Z" />
            <path d="M100.346 25.7062V10.2939H116.83C120.149 10.2939 121.617 11.5829 121.617 14.1128C121.617 15.943 120.736 17.1417 118.998 17.616C121.12 18.0671 122.181 19.356 122.181 21.5934C122.181 24.4638 120.511 25.7062 116.897 25.7062H100.346ZM103.913 13.0508V16.7125H116.061C117.326 16.7125 118.252 16.1699 118.252 14.881C118.252 13.5921 117.551 13.0508 115.881 13.0508H103.913ZM103.913 19.2876V23.1516H116.197C118.048 23.1516 118.816 22.6773 118.816 21.2312C118.816 19.7851 117.89 19.2876 116.355 19.2876H103.913Z" />
            <path d="M151.222 25.7062V10.2939H155.354L169.941 21.7971V10.2939H173.554V25.7062H169.489L154.835 14.0677V25.7062H151.223H151.222Z" />
            <path d="M176.399 25.7062V10.2939H180.011V25.7062H176.399Z" />
            <path d="M55.6122 17.9863C55.6122 21.2858 57.2839 22.8221 63.3791 22.8221C63.4869 22.8221 70.0355 23.0053 72.9186 22.5597V25.6501C69.0932 26.1148 63.3162 25.9399 63.2671 25.9399C55.2053 25.9399 51.9999 23.2732 51.9999 17.985C51.9999 12.6967 55.2066 10.0301 63.2671 10.0301C63.2998 10.0301 69.4319 9.93439 72.9186 10.4497V13.5893C70.0273 13.1437 63.3886 13.1478 63.3791 13.1478C57.2839 13.1478 55.6122 14.6855 55.6122 17.985V17.9863Z" />
            <path d="M123.483 18C123.483 12.463 127.299 10 135.858 10C144.416 10 148.231 12.463 148.231 18C148.231 23.537 144.415 26 135.858 26C127.3 26 123.483 23.537 123.483 18ZM144.574 18C144.574 14.5419 142.473 13.1191 135.858 13.1191C129.242 13.1191 127.096 14.5433 127.096 18C127.096 21.4567 129.242 22.8809 135.858 22.8809C142.473 22.8809 144.574 21.4581 144.574 18Z" />
          </svg> */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("dashboardTitle")}
          </h1>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {/* Connection Status */}
          <button
            onClick={() =>
              setPreferences({ ...preferences, isOnline: !isOnline })
            }
            data-testid="connection-toggle"
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isOnline
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span className="hidden md:block">
              {isOnline ? t("online") : t("offline")}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() =>
              setPreferences({
                ...preferences,
                language: language === "en" ? "de" : "en",
              })
            }
            className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {language.toUpperCase()}
          </button>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Alerts Badge */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              const alertsPanel = document.getElementById("alerts-panel");
              if (alertsPanel) {
                alertsPanel.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }}
          >
            <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {alerts.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Offline Alert */}
      {!isOnline && (
        <div
          className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 rounded-lg"
          data-testid="offline-alert"
        >
          <div className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              {t("dataStreamingOff")}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
