import React from 'react';
import {MetricStatus} from '../utils/enums';
import {Metric} from '../utils/types';

const MetricCard = ({id, icon: Icon, label, value, unit, status = MetricStatus.NORMAL}: Metric) => {
  const statusColors = {
    normal: 'text-gray-600 dark:text-gray-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    critical: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-2">
          {React.createElement(Icon, {
            className: `h-4 w-4 ${statusColors[status]}`,
          })}
          {/* <Icon
            className={`h-4 w-4 ${statusColors[status]}`}
            iconNode={Icon as ReactElement<any, any>}
            /> */}
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <span
          data-testid={id === 'battery' ? 'vehicle-battery' : undefined}
          className={`text-xs md:text-sm font-bold ${statusColors[status]}`}>
          {value}
          {unit}
        </span>
      </div>
    </div>
  );
};
export default MetricCard;
