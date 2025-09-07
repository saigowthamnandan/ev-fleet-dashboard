import {
  MetricStatus,
  SortOrder,
  VehicleSortBy,
  VehicleStatus,
  VehicleType,
} from "./enums";

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  battery: number;
  speed: number;
  temperature: number;
  range: number;
  status: VehicleStatus;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  tirePressure: number;
  motorEfficiency: number;
  regenBraking: boolean;
  voltage: number;
  current: number;
  power: number;
  odometer: number;
  softwareVersion: string;
  lastUpdate: Date;
};

export type Alert = {
  id: string;
  vehicleId: string;
  type: string;
  message: string;
  timestamp: Date;
};

export type Metric = {
  id?: string;
  icon: any;
  label: string;
  value: number | string;
  unit: string;
  status?: MetricStatus;
};

export type VehicleSortOption = {
  sortBy: VehicleSortBy;
  order: SortOrder;
};
