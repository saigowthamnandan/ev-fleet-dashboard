import {Car, Battery, AlertTriangle, MapPin} from 'lucide-react';
import {useMemo} from 'react';
import {VehicleStatus} from '../utils/enums';
import {Vehicle} from '../utils/types';

import {TFunction} from 'i18next';
export default function OverviewPanel({vehicles, t}: {vehicles: Vehicle[]; t: TFunction<string, undefined>}) {
  const stats = useMemo(() => {
    const total = vehicles.length;
    const moving = vehicles.filter((v) => v.status === VehicleStatus.MOVING).length;
    const charging = vehicles.filter((v) => v.status === VehicleStatus.CHARGING).length;
    const idle = vehicles.filter((v) => v.status === VehicleStatus.IDLE).length;
    const avgBattery = Math.round(vehicles.reduce((sum, v) => sum + v.battery, 0) / total);
    const lowBattery = vehicles.filter((v) => v.battery < 20).length;
    const totalRange = vehicles.reduce((sum, v) => sum + v.range, 0);

    return {
      total,
      moving,
      charging,
      idle,
      avgBattery,
      lowBattery,
      totalRange,
    };
  }, [vehicles]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6 justify-between">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Car className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        {t('overview')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('vehicles')}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.moving}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('moving')}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.charging}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('charging')}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">{stats.idle}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('idle')}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('avgBattery')}</span>
            <Battery className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.avgBattery}%</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('lowBattery')}</span>
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.lowBattery}</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalRange')}</span>
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalRange} km</div>
        </div>
      </div>
    </div>
  );
}
