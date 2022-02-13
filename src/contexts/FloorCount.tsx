import React, { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

export interface IFloorCountContext {
  floorCount: number;
  setFloorCount?: (floorCount: number) => void;
}

const defaultState = {
  floorCount: 10,
};

export const FloorCountContext = React.createContext<IFloorCountContext>(defaultState);

export const FloorCountProvider = ({ children }: Props) => {
  const [floorCount, setFloorCount] = useState(defaultState.floorCount);

  return (
    <FloorCountContext.Provider value={{ floorCount, setFloorCount }}>
      {children}
    </FloorCountContext.Provider>
  );
};
