import { useCallback, useMemo, useState } from 'react';
import { ElevatorSystem, ElevatorDirection, Floor } from '../models';

export function useElevatorSystem(startingElevators: number = 4) {
  const elevatorSystem = useMemo(
    () => new ElevatorSystem(startingElevators),
    [startingElevators]
  );
  const [elevators, setElevators] = useState([...elevatorSystem.status()]);

  const update = useCallback(
    () => setElevators([...elevatorSystem.status()]),
    [elevatorSystem]
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
    id => {
      elevatorSystem.removeElevator(id);
      update();
    },
    [elevatorSystem, update]
  );

  const reset = useCallback(() => {
    elevatorSystem.resetElevators();
    update();
  }, [elevatorSystem, update]);

  return {
    elevators,
    requestPickup,
    requestDropoff,
    nextStep,
    addElevator,
    removeElevator,
    reset,
  };
}
