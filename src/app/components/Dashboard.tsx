'use client';
import React, {useState, useEffect, useCallback, useMemo, DragEvent, useContext, useRef} from 'react';
import {Filter, SortAsc, SortDesc} from 'lucide-react';
import {Alert, Vehicle, VehicleSortOption} from '../utils/types';
import {MetricStatus, SortOrder, VehicleSortBy, VehicleStatus} from '../utils/enums';
import {TFunction} from 'i18next';
import PreferencesContext from '../utils/context/preferencesContext';
import AlertsPanel from './AlertsPanel';
import OverviewPanel from './OverviewPanel';
import MapView from './MapView';
import VehicleCard from './VehicleCard';
import {useDispatch, useSelector} from 'react-redux';
import {addAlerts, removeAlert, clearAlerts, resetDismissedAlert} from '../redux/alertsSlice';

// Main Dashboard Component
const Dashboard = ({translation: t, initialVehicles}: {translation: TFunction<string, undefined>; initialVehicles: Vehicle[]}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const dispatch = useDispatch();
  const {alerts, dismissedAlertIds} = useSelector((state: {alerts: {alerts: Alert[]; dismissedAlertIds: string[]}}) => state.alerts);

  const {
    preferences: {isOnline, language},
  } = useContext(PreferencesContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOption, setSortOption] = useState<VehicleSortOption>({
    sortBy: VehicleSortBy.ID,
    order: SortOrder.ASC,
  });
  const [isCustomSortByDrag, setIsCustomSortByDrag] = useState(false);
  const draggedVehicleId = useRef<string>(null);
  const dragOverVehicleId = useRef<string>(null);

  const generateAlerts = useCallback(
    (vehicleList: Vehicle[]) => {
      const newAlerts: Alert[] = [];

      vehicleList.forEach((vehicle) => {
        if (vehicle.battery < 20) {
          const translatedMessage = t('criticalBatteryLevel', {
            vehicleName: vehicle.name,
            batteryLevel: vehicle.battery,
          });

          newAlerts.push({
            id: `${vehicle.id}-battery`,
            vehicleId: vehicle.id,
            type: MetricStatus.CRITICAL,
            message: translatedMessage,
            timestamp: new Date(),
          });
        }

        if (vehicle.temperature > 35) {
          const translatedMessage = t('highTemperature', {
            vehicleName: vehicle.name,
            temperature: vehicle.temperature,
          });

          newAlerts.push({
            id: `${vehicle.id}-temp`,
            vehicleId: vehicle.id,
            type: MetricStatus.CRITICAL,
            message: translatedMessage,
            timestamp: new Date(),
          });
        }
      });

      return newAlerts;
    },
    [t, language],
  );

  // Real-time data simulation - FIXED: Removed early return
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(
      () => {
        setVehicles((prev) =>
          prev.map((vehicle) => {
            const shouldUpdate = Math.random() > 0.3;
            if (!shouldUpdate) return vehicle;

            const maxRange = 400;
            let updatedVehicle = {...vehicle}; // FIXED: Initialize properly
            const battery = vehicle.battery;

            // If battery is 0, the vehicle should be idle, stopped, no speed or range drop
            if (battery <= 0) {
              updatedVehicle = {
                ...vehicle,
                speed: 0,
                range: 0,
                battery: 0,
                status: VehicleStatus.IDLE,
                lastUpdate: new Date(),
              };
              return updatedVehicle;
            }

            switch (vehicle.status) {
              case VehicleStatus.MOVING:
                updatedVehicle = {
                  ...vehicle,
                  battery: Math.round(Math.max(0, battery - Math.random() * 2)),
                  speed: parseFloat(Math.max(5, Math.min(120, vehicle.speed + (Math.random() - 0.5) * 20)).toFixed(1)),
                  temperature: parseFloat(Math.max(15, Math.min(45, vehicle.temperature + (Math.random() - 0.3) * 3)).toFixed(1)),
                  range: Math.round((battery / 100) * maxRange),
                  motorEfficiency: Math.round(Math.max(60, Math.min(100, vehicle.motorEfficiency + (Math.random() - 0.5) * 5))),
                  location: {
                    ...vehicle.location,
                    lat: vehicle.location.lat + (Math.random() - 0.5) * 0.001,
                    lng: vehicle.location.lng + (Math.random() - 0.5) * 0.001,
                  },
                  lastUpdate: new Date(),
                };
                break;

              case VehicleStatus.CHARGING:
                const newBattery = Math.min(100, battery + Math.random() * 3);
                updatedVehicle = {
                  ...vehicle,
                  battery: Math.round(newBattery),
                  speed: 0,
                  temperature: parseFloat(Math.max(10, Math.min(35, vehicle.temperature + (Math.random() - 0.7) * 2)).toFixed(1)),
                  range: Math.round((newBattery / 100) * maxRange),
                  motorEfficiency: Math.round(Math.max(70, Math.min(100, vehicle.motorEfficiency + (Math.random() - 0.3) * 2))),
                  lastUpdate: new Date(),
                };
                break;

              case VehicleStatus.IDLE:
              default:
                updatedVehicle = {
                  ...vehicle,
                  battery: Math.round(Math.max(0, battery - Math.random() * 0.1)),
                  speed: 0,
                  temperature: parseFloat(Math.max(10, Math.min(50, vehicle.temperature + (Math.random() - 0.8) * 2)).toFixed(1)),
                  range: Math.round((battery / 100) * maxRange),
                  motorEfficiency: Math.round(Math.max(60, Math.min(100, vehicle.motorEfficiency + (Math.random() - 0.5) * 1))),
                  lastUpdate: new Date(),
                };
                break;
            }

            // Occasionally change status
            if (Math.random() < 0.02) {
              const statuses = Object.values(VehicleStatus);
              const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
              updatedVehicle.status = newStatus;
            }

            return updatedVehicle;
          }),
        );
      },
      Math.random() * 4000 + 1000,
    );

    return () => clearInterval(interval);
  }, [isOnline]);

  useEffect(() => {
    if (vehicles.length === 0) return;
    const vehicleIds = new Set(vehicles.map((v) => v.id));
    const nonVehicleAlerts = alerts.filter((alert) => !vehicleIds.has(alert.vehicleId));
    const newAlerts = generateAlerts(vehicles);

    // Only add alerts that are not dismissed
    const filteredNewAlerts = newAlerts.filter((alert) => !dismissedAlertIds.includes(alert.id));

    // If a dismissed alert's condition is resolved, remove it from dismissedAlertIds
    newAlerts.forEach((alert) => {
      if (!filteredNewAlerts.find((a) => a.id === alert.id) && dismissedAlertIds.includes(alert.id)) {
        dispatch(resetDismissedAlert(alert.id));
      }
    });

    dispatch(addAlerts([...nonVehicleAlerts, ...filteredNewAlerts]));
  }, [vehicles, generateAlerts, language]);

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles;

    if (filterStatus !== 'all') {
      filtered = vehicles.filter((v) => v.status === filterStatus);
    }

    if (!isCustomSortByDrag) {
      filtered.sort((a, b) => {
        switch (sortOption.sortBy) {
          case VehicleSortBy.ID:
            return sortOption.order === SortOrder.ASC ? a.id.localeCompare(b.id, language) : b.id.localeCompare(a.id, language);
          case VehicleSortBy.BATTERY:
            return sortOption.order === SortOrder.ASC ? a.battery - b.battery : b.battery - a.battery;
          case VehicleSortBy.SPEED:
            return sortOption.order === SortOrder.ASC ? a.speed - b.speed : b.speed - a.speed;
          case VehicleSortBy.TEMPERATURE:
            return sortOption.order === SortOrder.ASC ? a.temperature - b.temperature : b.temperature - a.temperature;
          case VehicleSortBy.RANGE:
            return sortOption.order === SortOrder.ASC ? a.range - b.range : b.range - a.range;
          case VehicleSortBy.CUSTOM:
            return 0; // Maintain current order
          case VehicleSortBy.NAME:
          default:
            return sortOption.order === SortOrder.ASC ? a.name.localeCompare(b.name, language) : b.name.localeCompare(a.name, language);
        }
      });
    }
    return filtered;
  }, [vehicles, filterStatus, sortOption]);

  const dismissAlert = useCallback(
    (alertId: string, clearAll: boolean = false) => {
      if (clearAll) {
        dispatch(clearAlerts());
        return;
      }
      dispatch(removeAlert(alertId));
    },
    [dispatch],
  );

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    draggedVehicleId.current = e.currentTarget.getAttribute('data-id');
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragOverVehicleId.current = e.currentTarget.getAttribute('data-id');
  };

  function handleDropEnd(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const sourceVehicleId = draggedVehicleId.current;
    const targetVehicleId = dragOverVehicleId.current;
    if (!sourceVehicleId || !targetVehicleId) return;
    const sourceVehicle = filteredAndSortedVehicles.find((v) => v.id === sourceVehicleId);
    const sourceVehicleIndex = filteredAndSortedVehicles.findIndex((v) => v.id === sourceVehicleId);
    const targetVehicleIndex = filteredAndSortedVehicles.findIndex((v) => v.id === targetVehicleId);
    if (sourceVehicleIndex === -1 || targetVehicleIndex === -1 || sourceVehicleIndex === targetVehicleIndex || !sourceVehicle) return;
    const newVehicles = [...filteredAndSortedVehicles];
    newVehicles.splice(sourceVehicleIndex, 1);
    newVehicles.splice(targetVehicleIndex, 0, sourceVehicle);
    setIsCustomSortByDrag(true);
    setVehicles(newVehicles);
    setSortOption({...sortOption, sortBy: VehicleSortBy.CUSTOM});
    draggedVehicleId.current = null;
    dragOverVehicleId.current = null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 mt-20`}>
      {/* Dashboard Content */}
      <div className="flex flex-col gap-4 p-3 md:p-6">
        <div className="flex flex-col xl:flex-row w-full gap-6">
          <div className="xl:w-2/3 min-h-full" data-testid="overview-panel">
            <OverviewPanel vehicles={vehicles} t={t} />
          </div>
          <div className="xl:w-1/3 min-h-full" id="alerts-panel" data-testid="alerts-panel">
            <AlertsPanel alerts={alerts} onDismissAlert={dismissAlert} t={t} />
          </div>
        </div>

        <MapView vehicles={vehicles} t={t} />

        {/* Controls */}
        <div className="px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  data-testid="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="all">{t('allVehicles')}</option>
                  <option value="moving">{t('moving')}</option>
                  <option value="charging">{t('charging')}</option>
                  <option value="idle">{t('idle')}</option>
                </select>
              </div>

              <div className="flex items-center md:gap-2" data-testid="sort-by-select">
                {sortOption.order === SortOrder.DESC ? (
                  <SortDesc
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    data-testid="sort-asc"
                    onClick={() => setSortOption({...sortOption, order: SortOrder.ASC})}
                  />
                ) : (
                  <SortAsc
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    data-testid="sort-desc"
                    onClick={() => setSortOption({...sortOption, order: SortOrder.DESC})}
                  />
                )}
                <select
                  value={sortOption.sortBy}
                  onChange={(e) => {
                    setIsCustomSortByDrag(false);
                    setSortOption({
                      ...sortOption,
                      sortBy: e.target.value as VehicleSortBy,
                    });
                  }}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="name">{t('name')}</option>
                  <option value="battery">{t('battery')}</option>
                  <option value="speed">{t('speed')}</option>
                  <option value="temperature">{t('temperature')}</option>
                  <option value="range">{t('range')}</option>
                  <option value="id">{t('id')}</option>
                  <option disabled value="custom">
                    {t('custom')}
                  </option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('gridResultsTest', {count: filteredAndSortedVehicles.length, total: vehicles.length})}
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredAndSortedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              t={t}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDropEnd}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
