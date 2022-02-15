import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { ElevatorDirection, ElevatorStatus, ElevatorSystem, Floor } from '../models';

type ElevatorSystemProviderProps = {
  children: ReactNode;
};

export interface IElevatorSystemContext {
  floorCount: number;
  elevators: ElevatorStatus[];
  setFloorCount: (floorCount: number) => void;
  requestPickup: (sourceFloor: Floor, direction: ElevatorDirection) => void;
  requestDropoff: (elevatorID: number, targetFloor: Floor) => void;
  nextStep: () => void;
  addElevator: () => void;
  removeElevator: (id: number) => void;
  reset: () => void;
}

const initValues = {
  floorCount: 10,
  startingElevators: 4,
};

export const ElevatorSystemContext = React.createContext<IElevatorSystemContext | null>(null);

export const ElevatorSystemProvider = ({ children }: ElevatorSystemProviderProps) => {
  const elevatorSystem = useMemo(() => new ElevatorSystem(initValues.startingElevators), []);
  const [elevators, setElevators] = useState([...elevatorSystem.status()]);
  const [floorCount, _setFloorCount] = useState(initValues.floorCount);

  const update = useCallback(
    () => setElevators([...elevatorSystem.status()]),
    [elevatorSystem]
  );

  const setFloorCount = useCallback(
    (newValue: number) => {
      if (newValue > 1 && window.confirm('Are you sure?\nThis will reset all elevators.')) {
        _setFloorCount(newValue);
        elevatorSystem.resetElevators();
        update();
      }
    },
    [elevatorSystem, _setFloorCount, update]
  );

  const requestPickup = useCallback(
    (sourceFloor: Floor, direction: ElevatorDirection) => {
      elevatorSystem.pickup(sourceFloor, direction);
      update();
    },
    [elevatorSystem, update]
  );

  const requestDropoff = useCallback(
    (elevatorID: number, targetFloor: Floor) => {
      elevatorSystem.dropoff(elevatorID, targetFloor);
      update();
    },
    [elevatorSystem, update]
  );

  const nextStep = useCallback(() => {
    elevatorSystem.step();
    update();
  }, [elevatorSystem, update]);

  const addElevator = useCallback(() => {
    elevatorSystem.addElevator();
    update();
  }, [elevatorSystem, update]);

  const removeElevator = useCallback(
    (id: number) => {
      elevatorSystem.removeElevator(id);
      update();
    },
    [elevatorSystem, update]
  );

  const reset = useCallback(() => {
    elevatorSystem.resetElevators();
    update();
  }, [elevatorSystem, update]);

  const data: IElevatorSystemContext = {
    elevators,
    floorCount,
    setFloorCount,
    requestPickup,
    requestDropoff,
    nextStep,
    addElevator,
    removeElevator,
    reset,
  };

  return (
    <ElevatorSystemContext.Provider value={data}>{children}</ElevatorSystemContext.Provider>
  );
};
