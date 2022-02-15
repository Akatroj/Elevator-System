import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AddElevatorButton, Elevator } from '.';
import { Size } from './utils';
import { useElevatorSystem } from '../hooks';

type Props = {};

const ElevatorsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 20px;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

const size: Size = {
  width: 200,
  height: 250,
};

const MAX_ELEVATORS = 16;

export const ElevatorContainer = (props: Props) => {
  const { floorCount, elevators, requestDropoff, addElevator, removeElevator } =
    useElevatorSystem();

  // TODO: rename
  const children = useMemo(() => {
    const Elevators = elevators.map(elevator => (
      <Elevator
        key={elevator.id}
        model={elevator}
        floorCount={floorCount}
        size={size}
        removeHandler={() => removeElevator(elevator.id)}
        addNewStop={targetFloor => requestDropoff(elevator.id, targetFloor)}
      />
    ));
    if (elevators.length < MAX_ELEVATORS)
      Elevators.push(<AddElevatorButton key={-1} size={size} clickHandler={addElevator} />);

    return Elevators;
  }, [elevators, floorCount, removeElevator, requestDropoff, addElevator]);

  return <ElevatorsContainer>{children}</ElevatorsContainer>;
};
