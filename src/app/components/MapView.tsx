import {MapPin} from 'lucide-react';
import {Vehicle} from '../utils/types';
import Map, {Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import MarkerPin from './MarkerPin';
import {TFunction} from 'i18next';
import {VehicleType} from '../utils/enums';

const MapView = ({vehicles, t}: {vehicles: Vehicle[]; t: TFunction<string, undefined>}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6" data-testid="map-view">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <MapPin className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        {t('vehicle') + ' ' + t('locations')}
      </h2>
      <div
        className={`h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col gap-2 md:gap-4 items-center justify-center ${
          vehicles.length === 0 ? 'p-4' : ''
        }`}>
        <div className={`h-full w-full`}>
          <Map
            style={{borderRadius: '8px'}}
            initialViewState={{
              //Coordinates
              latitude: 50.99051322164416,
              longitude: 6.950599905273711,
              zoom: 9.5,
            }}
            mapStyle={
              'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBARklVUW5OUFB0b0ZtbHBTSzsrhPAAvOxMJrxAxeweqimm/drafts/0.json?key=' +
              process.env.NEXT_PUBLIC_MAPBOX_API_KEY
            }>
            <Marker longitude={6.950599905273711} latitude={50.99051322164416} anchor="bottom">
              <MarkerPin imageName="building" width={32} height={32} />
            </Marker>
            {vehicles.length > 0 &&
              vehicles.map((v) => (
                <Marker key={v.id} longitude={v.location.lng} latitude={v.location.lat} anchor="bottom">
                  <MarkerPin imageName={v.type === VehicleType.PEOPLE_MOVER ? 'bus' : 'truck'} width={32} height={32} status={v.status} />
                </Marker>
              ))}
          </Map>
        </div>
        {vehicles.length === 0 && (
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">{t('noVehiclesDetected')}</p>
          </div>
        )}
      </div>
      <p className="text-sm text-center text-gray-400 dark:text-gray-500 mt-2">
        {t('noVehiclesText', {
          vehiclesCount: vehicles.length,
          citiesCount: new Set(vehicles.map((v) => v.location.city)).size,
        })}
      </p>
    </div>
  );
};
export default MapView;
