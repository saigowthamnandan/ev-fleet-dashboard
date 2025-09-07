import { TFunction } from "i18next";
import {
  Car,
  Battery,
  Gauge,
  Thermometer,
  MapPin,
  CircleGauge,
  BatteryCharging,
  BatteryWarning,
  Zap,
  Leaf,
  Cable,
  Wrench,
  RulerDimensionLine,
  Shield,
  CloudCog,
} from "lucide-react";
import { MetricStatus, VehicleStatus, VehicleType } from "../utils/enums";
import { Vehicle } from "../utils/types";
import { DragEvent } from "react";
import MetricCard from "./MetricCard";
import StatusBadge from "./StatusBadge";
import { get } from "http";
import SvgIcon from "./SvgIcon";

export default function VehicleCard({
  vehicle,
  t,
  onDragStart,
  onDragEnd,
  onDrop,
}: {
  vehicle: Vehicle;
  t: TFunction<string, undefined>;
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
}) {
  const getBatteryStatus = (level: number): MetricStatus => {
    if (level < 20) return MetricStatus.CRITICAL;
    if (level < 50) return MetricStatus.WARNING;
    return MetricStatus.NORMAL;
  };

  const getTempStatus = (temp: number): MetricStatus => {
    if (temp > 35) return MetricStatus.CRITICAL;
    if (temp > 30) return MetricStatus.WARNING;
    return MetricStatus.NORMAL;
  };

  const getTirePressureStatus = (pressure: number): MetricStatus => {
    if (pressure < 30) return MetricStatus.CRITICAL;
    if (pressure < 35) return MetricStatus.WARNING;
    return MetricStatus.NORMAL;
  };
  const getMotorEfficiencyStatus = (efficiency: number): MetricStatus => {
    if (efficiency < 70) return MetricStatus.CRITICAL;
    if (efficiency < 85) return MetricStatus.WARNING;
    return MetricStatus.NORMAL;
  };

  return (
    <div
      data-id={vehicle.id}
      data-testid="vehicle-card"
      className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl"
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e)}
      onDragLeave={(e) => onDragEnd && onDragEnd(e)}
      onDragEnd={(e) => onDrop && onDrop(e)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {vehicle.type === VehicleType.CARGO_MOVER ? (
            <SvgIcon
              name="truck"
              className="h-6 w-6 text-[#53b58a] dark:text-[#0dbe71]"
              alt="Truck"
            />
          ) : (
            <SvgIcon
              name="bus"
              className="h-6 w-6 text-blue-600 dark:text-blue-500"
              alt="Bus"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {vehicle.name}: {vehicle.type}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {vehicle.id}
            </p>
          </div>
        </div>
        <StatusBadge
          status={vehicle.status}
          t={t}
          data-testid="vehicle-status"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard
          icon={
            vehicle.status === VehicleStatus.CHARGING
              ? BatteryCharging
              : getBatteryStatus(vehicle.battery) === MetricStatus.CRITICAL
              ? BatteryWarning
              : Battery
          }
          label={t("battery")}
          value={vehicle.battery}
          unit="%"
          id="battery"
          status={getBatteryStatus(vehicle.battery)}
        />
        <MetricCard
          icon={Gauge}
          label={t("speed")}
          value={vehicle.speed}
          unit=" km/h"
        />
        <MetricCard
          icon={Thermometer}
          label={t("temperature")}
          value={vehicle.temperature}
          unit="°C"
          status={getTempStatus(vehicle.temperature)}
        />
        <MetricCard
          icon={MapPin}
          label={t("range")}
          value={vehicle.range}
          unit=" km"
        />
        <MetricCard
          icon={CircleGauge}
          label={t("tirePressure")}
          value={vehicle.tirePressure}
          unit=" psi"
          status={getTirePressureStatus(vehicle.tirePressure)}
        />
        <MetricCard
          icon={Wrench}
          label={t("motorEfficiency")}
          value={vehicle.motorEfficiency}
          unit="%"
          status={getMotorEfficiencyStatus(vehicle.motorEfficiency)}
        />
        <MetricCard
          icon={Shield}
          label={t("regenBraking")}
          value={vehicle.regenBraking ? "Active" : "Inactive"}
          unit=""
          status={
            vehicle.regenBraking ? MetricStatus.NORMAL : MetricStatus.WARNING
          }
        />
        <MetricCard
          icon={Cable}
          label={t("voltage")}
          value={vehicle.voltage}
          unit=" V"
          status={
            vehicle.voltage < 300 ? MetricStatus.WARNING : MetricStatus.NORMAL
          }
        />
        <MetricCard
          icon={Zap}
          label={t("current")}
          value={vehicle.current}
          unit=" A"
          status={
            vehicle.current > 120 ? MetricStatus.WARNING : MetricStatus.NORMAL
          }
        />
        <MetricCard
          icon={Leaf}
          label={t("power")}
          value={vehicle.power}
          unit=" kW"
          status={
            vehicle.power > 120 ? MetricStatus.WARNING : MetricStatus.NORMAL
          }
        />
        <MetricCard
          icon={RulerDimensionLine}
          label={t("odometer")}
          value={vehicle.odometer}
          unit=" km"
        />
        <MetricCard
          icon={CloudCog}
          label={t("softwareVersion")}
          value={vehicle.softwareVersion}
          unit=""
        />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <span>{vehicle.location.city}</span>
        <span>{vehicle.lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
