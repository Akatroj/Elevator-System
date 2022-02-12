import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import AddElevatorButton from './AddElevatorButton';
import Elevator from './Elevator';
import { Size } from './utils';

import { ElevatorSystem } from '../models/ElevatorSystem';
import { ElevatorDirection, Floor } from '../models/utils';

type Props = {};

const ElevatorsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-around; */
  align-items: flex-start;

  background-color: aqua;
  width: 100vw;
  height: 100vh;
`;

const size: Size = {
  width: 200,
  height: 200,
};

const MAX_ELEVATORS = 16;

const ElevatorContainer = (props: Props) => {
  // temp only
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpen(!open);
      // console.log(open);
    }, 2000);
  }, [open]);

  const { elevators, addElevator /*nextStep*/ } = useElevatorSystem(4);

  // TODO: rename
  // TODO: add keys to array

  const children = useMemo(() => {
    const Elevators = elevators.map(() => <Elevator open={open} size={size} />);
    if (elevators.length < MAX_ELEVATORS)
      Elevators.push(<AddElevatorButton size={size} clickHandler={addElevator} />);

    return Elevators;
  }, [elevators, open, addElevator]);

  return <ElevatorsContainer>{children}</ElevatorsContainer>;
};

//

//

function useElevatorSystem(floorCount: number = 4) {
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

export default ElevatorContainer;
