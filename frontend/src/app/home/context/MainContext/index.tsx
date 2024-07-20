import { createContext, ReactNode, useState } from "react";


export const MainContext = createContext({} as any);

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  const [userId, setUserId] = useState("")
  const [userType, setUserType] = useState("")

  return (
    <MainContext.Provider
      value={{
        user: {id: [userId,setUserId], type: [userType, setUserType]}
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// src/app/context/AuthContext.tsx

import React, { useReducer, useContext } from 'react';
import { LoginState, AuthAction } from '../../../../shared/types/login-cliente';
import { authReducer } from './reducer';

const initialState: LoginState = {
  user: null,
};

const AuthContext = createContext<{
  state: LoginState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
