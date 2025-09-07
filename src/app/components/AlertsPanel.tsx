import { AlertCircle, AlertTriangle, Bell, CheckCircle, X } from "lucide-react";
import { Alert } from "../utils/types";
import { TFunction } from "i18next";

const AlertsPanel = ({
  alerts,
  onDismissAlert,
  t,
}: {
  alerts: Alert[];
  onDismissAlert: (alertId: string, clearAll?: boolean) => void;
  t: TFunction<string, undefined>;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6 h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          {t("alerts")} ({alerts.length})
        </div>
        <button
          className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
          onClick={() => onDismissAlert("", true)}
        >
          {t("clearAll")}
        </button>
      </h2>

      <div className="space-y-3 max-h-58 overflow-y-auto h-full">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              {t("noActiveAlerts")}
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${
                alert.type === "critical"
                  ? "bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-400"
                  : "bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-400"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  {alert.type === "critical" ? (
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onDismissAlert(alert.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4 cursor-pointer" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AlertsPanel;
