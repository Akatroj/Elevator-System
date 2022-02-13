import { useCallback, useMemo, useState } from 'react';
import { ElevatorSystem, ElevatorDirection, Floor } from '../models';

export function useElevatorSystem(floorCount: number = 4) {
  const elevatorSystem = useMemo(() => new ElevatorSystem(floorCount), [floorCount]);
  const [elevators, setElevators] = useState([...elevatorSystem.elevators]);

  const update = useCallback(
    () => setElevators([...elevatorSystem.elevators]),
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

  return { elevators, requestPickup, requestDropoff, nextStep, addElevator };
}
