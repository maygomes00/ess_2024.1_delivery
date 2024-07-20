import { createContext, ReactNode, useState } from "react";


export const MainContext = createContext({} as any);

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  const [userId, setUserId] = useState("123")
  const [selectedItemId, setSelectedItemId] = useState("")
  const [selectedItemIName, setSelectedItemName] = useState("")

  return (
    <MainContext.Provider
      value={{
        user: {id: [userId,setUserId]},
        item: {selectedId: [selectedItemId, setSelectedItemId], selectedName: [selectedItemIName, setSelectedItemName]}
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
