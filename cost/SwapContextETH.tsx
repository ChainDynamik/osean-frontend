import React, { createContext, useContext, useState, ReactNode } from "react";

type SwapContextType = {
  selectedComponentETH: string;
  setSelectedComponentETH: React.Dispatch<React.SetStateAction<string>>;
};

const SwapContextETH = createContext<SwapContextType | undefined>(undefined);

export const useSwapContextETH = () => {
  const contextETH = useContext(SwapContextETH);
  if (!contextETH) {
    throw new Error("useSwapContext must be used within a SwapContextProvider");
  }
  return contextETH;
};

export const SwapContextProviderETH: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedComponentETH, setSelectedComponentETH] = useState("SwapETHForOSEAN");

  return (
    <SwapContextETH.Provider value={{ selectedComponentETH, setSelectedComponentETH }}>
      {children}
    </SwapContextETH.Provider>
  );
};