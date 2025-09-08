import {generateMockVehicles} from './utils/mockVehicles';
import DashboardWithTranslation from './components/DashboardWithTranslation';
import {Suspense} from 'react';

export default function Home() {
  const initialVehicles = generateMockVehicles(12);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardWithTranslation initialVehicles={initialVehicles} />
    </Suspense>
  );
}
