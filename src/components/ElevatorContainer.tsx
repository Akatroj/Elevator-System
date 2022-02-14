import React, { useEffect, useMemo } from 'react';
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
  const {
    floorCount,
    elevators,
    requestPickup,
    requestDropoff,
    nextStep,
    addElevator,
    removeElevator,
  } = useElevatorSystem();

  // TODO: kliki stopuja interval, wszystko stopuje interval.
  // useEffect(() => {
  //   const listener = (event: KeyboardEvent) => {
  //     nextStep();
  //   };
  //   document.addEventListener('keydown', listener);
  //   return () => document.removeEventListener('keydown', listener);
  // }, [nextStep]);
  // TODO: remove mounted?
  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      nextStep();
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [nextStep]);

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
