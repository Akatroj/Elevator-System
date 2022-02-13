import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AddElevatorButton, Elevator } from '.';
import { Size } from './utils';
import { useElevatorSystem } from '../hooks';

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

export const ElevatorContainer = (props: Props) => {
  // temp only
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpen(!open);
      // console.log(open);
    }, 2000);
  }, [open]);

  const { elevators, addElevator /*nextStep*/ } = useElevatorSystem();

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
