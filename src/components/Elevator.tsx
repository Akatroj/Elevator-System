import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import { faArrowDown, faArrowUp, faXmark, faPoo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ElevatorStatus, Floor } from '../models';
import { Size } from './utils';
import { ElevatorButtons, ElevatorDoors } from '.';

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

const DeleteButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;

  color: red;
  cursor: pointer;
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

  ${DeleteButton} {
    visibility: hidden;
  }

  &:hover ${DeleteButton} {
    visibility: visible;
  }
`;

const StateDisplay = styled.div`
  position: absolute;
  top: 10px;

  font-family: 'Seven Segment Regular';
  background-color: black;
  padding: 5px;
  color: orange;
  font-size: 0.9em;
`;

const FloorNumber = styled.span`
  margin-left: 5px;
`;

export const Elevator = ({
  size,
  model,
  floorCount,
  removeHandler,
  addNewStop,
}: ElevatorProps) => {
  const currentFloor = Number(useParams().floor);

  const [deleted, setDeleted] = useState(false);
  const remove = () => {
    setDeleted(true);
    setTimeout(() => removeHandler(), 500);
  };

  const stateIcon =
    model.state === 'idle' ? faPoo : model.state === 'up' ? faArrowUp : faArrowDown;

  return (
    <OuterContainer className={deleted ? 'deleted' : ''} size={size}>
      <DeleteButton onClick={remove}>
        <FontAwesomeIcon icon={faXmark} />
      </DeleteButton>
      {/* TODO: inner elevator container */}
      <>
        <StateDisplay>
          <FontAwesomeIcon icon={stateIcon} fixedWidth />
          <FloorNumber> {model.currentFloor}</FloorNumber>
        </StateDisplay>
        <ElevatorDoors open={model.currentFloor === currentFloor} size={elevatorDoorSize} />
        <ElevatorButtons
          clickedFloors={model.stops}
          size={{ width: 50, height: size.height / 2 }}
          floorCount={floorCount}
          clickHandler={addNewStop}
        />
      </>
    </OuterContainer>
  );
};
