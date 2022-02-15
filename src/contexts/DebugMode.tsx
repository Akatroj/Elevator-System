import React, { ReactNode, useState } from 'react';

type DebugModeProviderProps = {
  children: ReactNode;
};

export interface IDebugModeContext {
  debug: boolean;
  toggleDebug: () => void;
}

const initValues = {
  debug: false,
};

export const DebugModeContext = React.createContext<IDebugModeContext | null>(null);

export const DebugModeProvider = ({ children }: DebugModeProviderProps) => {
  const [debug, setDebugMode] = useState(initValues.debug);
  const toggleDebug = () => setDebugMode(!debug);

  const data = {
    debug,
    toggleDebug,
  };

  return <DebugModeContext.Provider value={data}>{children}</DebugModeContext.Provider>;
};
