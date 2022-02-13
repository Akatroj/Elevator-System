import React from 'react';
import styled, { css } from 'styled-components';
import { ElevatorButtons, ElevatorDoors } from '.';
import { Size } from './utils';

type OuterContainerProps = { size: Size };

type ElevatorProps = {
  open: boolean;
  size: Size;
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

export const Elevator = ({ open, size }: ElevatorProps) => {
  return (
    <OuterContainer size={size}>
      <ElevatorDoors open={open} size={elevatorDoorSize} />
      <ElevatorButtons
        size={{ width: 50, height: size.height / 2 }}
        floorCount={125}
        clickHandler={floor => {
          console.log(`FLOOR ${floor} SELECTED`);
        }}
      />
    </OuterContainer>
  );
};
