'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import PreferencesContext from '../utils/context/preferencesContext';
import Header from '../components/Header';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {useTranslation} from '../i18n/client';
import {Vehicle} from '../utils/types';

const Dashboard = dynamic(() => import('../components/Dashboard'), {ssr: false});

export default function DashboardWithTranslation({initialVehicles}: {initialVehicles: Vehicle[]}) {
  const [preferences, setPreferences] = React.useState({
    language: 'de',
    isOnline: true,
  });
  const [mounted, setMounted] = React.useState(false);
  const {t} = useTranslation(preferences.language || 'de', 'alerts');
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <PreferencesContext value={{preferences, setPreferences}}>
      <Provider store={store}>
        <Header translation={t} />
        <Dashboard translation={t} initialVehicles={initialVehicles} />
      </Provider>
    </PreferencesContext>
  );
}
