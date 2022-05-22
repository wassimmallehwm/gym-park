import React from 'react';
import { Settings } from '../../shared/types';

export interface SettingsContextInterface {
  settings: Settings | null;
  setSettings: (settingsData: Settings | null) => void;
}

export const SettingsContextDefaults: SettingsContextInterface = {
  settings: null,
  setSettings: (settingsData: Settings | null) => null
};

export const SettingsContext = React.createContext<SettingsContextInterface>(
  SettingsContextDefaults
);