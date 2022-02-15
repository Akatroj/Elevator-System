import React from 'react';
import styled from 'styled-components';
import { ElevatorStatus, Floor } from '../models';
import { FloorButtons, ElevatorDoors, ElevatorScreen, DeleteButton, Wrapper } from '.';
import { useCurrentFloor, useSetClass } from '../hooks';

type ElevatorProps = {
  model: ElevatorStatus;
  floorCount: number;
  removeHandler: () => void;
  addNewStop: (targetFloor: Floor) => void;
};

const HiddenDeleteButton = styled(DeleteButton)`
  visibility: hidden;
`;

const ElevatorWrapper = styled(Wrapper)`
  width: 12em;
  height: 15em;

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

export const Elevator = ({ model, floorCount, removeHandler, addNewStop }: ElevatorProps) => {
  const currentFloor = useCurrentFloor();

  const { className, activateClass } = useSetClass('deleted', 500);

  return (
    <ElevatorWrapper className={className}>
      <HiddenDeleteButton clickHandler={() => activateClass(removeHandler)} />
      <Wrapper>
        <ElevatorScreen elevatorState={model.state} currentFloor={model.currentFloor} />
        <ElevatorDoors open={model.currentFloor === currentFloor} />
        <FloorButtons
          clickedFloors={model.stops}
          floorCount={floorCount}
          clickHandler={addNewStop}
        />
      </Wrapper>
    </ElevatorWrapper>
  );
};
