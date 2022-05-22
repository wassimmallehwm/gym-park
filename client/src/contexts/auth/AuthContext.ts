import React from 'react';
import { AuthResponse } from '../../shared/types';

export interface AuthContextInterface {
  user: any | null;
  login: (userData: AuthResponse) => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  login: (userData: AuthResponse) => null,
  logout: () => null
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);