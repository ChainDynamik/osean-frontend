import React, { createContext, useContext, useState, ReactNode } from "react";

type SwapContextType = {
  selectedComponent: string;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
};

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const useSwapContext = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwapContext must be used within a SwapContextProvider");
  }
  return context;
};

export const SwapContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState("SwapBNBForOSEAN");

  return (
    <SwapContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </SwapContext.Provider>
  );
};