import React from 'react';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import { ElevatorButtons, ElevatorDoors } from '.';
import { useFloorCount } from '../hooks';
import { ElevatorStatus, Floor } from '../models';
import { Size } from './utils';

type OuterContainerProps = { size: Size };

type ElevatorProps = {
  size: Size;
  model: ElevatorStatus;
  removeHandler: () => void;
  addNewStop: (targetFloor: Floor) => void;
} & OuterContainerProps;

const elevatorDoorSize: Size = {
  // TODO: fix
  width: 50,
  height: 150,
};

const OuterContainer = styled.div<OuterContainerProps>`
  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
  position: relative;
  background-color: ease-in;
  border: 1px solid red;
  margin: 20px;
  /* temp */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Elevator = ({ size, model, removeHandler, addNewStop }: ElevatorProps) => {
  const { floorCount } = useFloorCount();
  const { floor } = useParams();
  const currentFloor = Number(floor);

  return (
    <OuterContainer size={size}>
      <ElevatorDoors open={model.currentFloor === currentFloor} size={elevatorDoorSize} />
      <ElevatorButtons
        size={{ width: 50, height: size.height / 2 }}
        floorCount={floorCount}
        clickHandler={floor => {
          console.log(`selected ${floor}`);
          addNewStop(floor);
        }}
      />
    </OuterContainer>
  );
};
