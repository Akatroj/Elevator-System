import React from 'react';
import styled from 'styled-components';
import ElevatorDoors, { Size } from './ElevatorDoors';

type ElevatorProps = {
  open: boolean;
};

const elevatorDoorSize: Size = {
  // TODO: fix
  width: '50px',
  height: '150px',
};

const ElevatorWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: ease-in;
  border: 1px solid red;
  margin: 20px;
`;

const Elevator = ({ open }: ElevatorProps) => {
  return (
    <ElevatorWrapper>
      <ElevatorDoors open={open} size={elevatorDoorSize} />
    </ElevatorWrapper>
  );
};

export default Elevator;
