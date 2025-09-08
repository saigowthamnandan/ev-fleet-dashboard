import {TFunction} from 'i18next';
import {VehicleStatus} from '../utils/enums';

const StatusBadge = ({status, t}: {status: VehicleStatus; t: TFunction<string, undefined>}) => {
  const colors = {
    moving: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    charging: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    idle: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{t(status)}</span>;
};
export default StatusBadge;
