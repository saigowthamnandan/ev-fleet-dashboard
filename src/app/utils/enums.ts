export enum VehicleStatus {
  MOVING = 'moving',
  CHARGING = 'charging',
  IDLE = 'idle',
}

export enum VehicleSortBy {
  ID = 'id',
  CUSTOM = 'custom',
  NAME = 'name',
  BATTERY = 'battery',
  TEMPERATURE = 'temperature',
  RANGE = 'range',
  SPEED = 'speed',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum VehicleType {
  CARGO_MOVER = 'Cargo Mover',
  PEOPLE_MOVER = 'People Mover',
}

export enum MetricStatus {
  CRITICAL = 'critical',
  WARNING = 'warning',
  NORMAL = 'normal',
}

export enum IconVariants {
  X_SMALL = '12px',
  SMALL = '16px',
  MEDIUM = '20px',
  LARGE = '24px',
  X_LARGE = '28px',
  NONE = '',
}
