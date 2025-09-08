import {Vehicle} from '../utils/types';
import {VehicleStatus, VehicleType} from './enums';

export function generateMockVehicles(count: number = 12): Vehicle[] {
  const statuses: VehicleStatus[] = Object.values(VehicleStatus);
  const locations = [
    {lat: 50.960413, lng: 6.8006, city: 'Pulheim'},
    {lat: 50.938361, lng: 6.959974, city: 'Cologne'},
    {lat: 51.0025, lng: 6.8423, city: 'Bergheim'},
    {lat: 50.87098, lng: 6.74745, city: 'Horrem'},
    {lat: 50.93883, lng: 6.8312, city: 'Bocklemünd'},
    {lat: 50.9764, lng: 6.7207, city: 'Quadrath-Ichendorf'},
    {lat: 50.98592, lng: 6.95987, city: 'Leverkusen'},
    {lat: 50.8976, lng: 6.8521, city: 'Königsdorf'},
    {lat: 51.0223, lng: 6.7801, city: 'Rommerskirchen'},
    {lat: 50.9754, lng: 6.8819, city: 'Widdersdorf'},
    {lat: 50.9375, lng: 6.9603, city: 'Deutz'},
    {lat: 50.9303, lng: 6.9384, city: 'Ehrenfeld'},
  ];

  return Array.from({length: count}, (_, id) => {
    const baseLocation = locations[id % locations.length];
    return {
      id: `EV-${String(id + 1).padStart(3, '0')}`,
      name: `Vehicle ${id + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: {
        lat: baseLocation.lat + (Math.random() - 0.5) * 0.1,
        lng: baseLocation.lng + (Math.random() - 0.5) * 0.1,
        city: baseLocation.city,
      },
      type: id % 2 === 0 ? VehicleType.CARGO_MOVER : VehicleType.PEOPLE_MOVER,
      battery: Number(Math.floor(Math.random() * 100).toFixed(2)),
      speed: Number(Math.floor(Math.random() * 120).toFixed(2)),
      temperature: Math.floor(Math.random() * 40) + 10,
      tirePressure: Number((Math.random() * 0.5 + 2.0).toFixed(1)),
      motorEfficiency: Math.round(Math.random() * 30) + 70,
      regenBraking: Math.random() > 0.5,
      range: Math.floor(Math.random() * 300) + 50,
      voltage: Number((Math.random() * 50 + 350).toFixed(1)),
      current: Number((Math.random() * 100 + 50).toFixed(1)),
      power: Math.floor(Math.random() * 150) + 50,
      odometer: Math.floor(Math.random() * 50000) + 10000,
      softwareVersion: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      lastUpdate: new Date(),
    };
  });
}
