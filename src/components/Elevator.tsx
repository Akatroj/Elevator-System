import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ElevatorStatus, Floor } from '../models';
import { Size } from './utils';
import { FloorButtons, ElevatorDoors, ElevatorScreen, DeleteButton } from '.';
import { useCurrentFloor } from '../hooks';

type OuterContainerProps = { size: Size };

type ElevatorProps = {
  size: Size;
  model: ElevatorStatus;
  floorCount: number;
  removeHandler: () => void;
  addNewStop: (targetFloor: Floor) => void;
} & OuterContainerProps;

const elevatorDoorSize: Size = {
  // TODO: fix
  width: 50,
  height: 150,
};

const HiddenDeleteButton = styled(DeleteButton)`
  visibility: hidden;
`;

const OuterContainer = styled.div<OuterContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
  `}

  position: relative;
  background-color: dimgray;

  transition: all 0.5s;

  &.deleted {
    transform: translate(0, -100%);
    opacity: 0;
  }

  &:hover ${HiddenDeleteButton} {
    visibility: visible;
  }
`;

export const Elevator = ({
  size,
  model,
  floorCount,
  removeHandler,
  addNewStop,
}: ElevatorProps) => {
  const currentFloor = useCurrentFloor();

  const [deleted, setDeleted] = useState(false);
  const remove = () => {
    setDeleted(true);
    setTimeout(() => removeHandler(), 500);
  };

  return (
    <OuterContainer className={deleted ? 'deleted' : ''} size={size}>
      <HiddenDeleteButton clickHandler={remove} />
      {/* TODO: inner elevator container */}
      <>
        <ElevatorScreen elevatorState={model.state} currentFloor={model.currentFloor} />
        <ElevatorDoors open={model.currentFloor === currentFloor} size={elevatorDoorSize} />
        <FloorButtons
          clickedFloors={model.stops}
          size={{ width: 50, height: size.height / 2 }}
          floorCount={floorCount}
          clickHandler={addNewStop}
        />
      </>
    </OuterContainer>
  );
};
