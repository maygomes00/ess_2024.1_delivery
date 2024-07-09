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
