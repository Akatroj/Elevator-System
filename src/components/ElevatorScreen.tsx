import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPoo } from '@fortawesome/free-solid-svg-icons';
import { ElevatorWorkingState, Floor } from '../models';
import { Wrapper } from '.';

type ElevatorScreenProps = { elevatorState: ElevatorWorkingState; currentFloor: Floor };

const OuterContainer = styled(Wrapper)`
  position: absolute;
  top: 0.8em;

  font-family: 'Seven Segment Regular';
  font-size: 0.9em;
  background-color: black;
  padding: 0.4em 0;
  color: orange;

  width: 7em;
  height: 1em;
  line-height: 1em;

  .icon {
    position: absolute;
    left: 0.4em;
  }
`;

const FloorNumber = styled.span`
  margin-left: 5px;
`;

export const ElevatorScreen = ({ elevatorState, currentFloor }: ElevatorScreenProps) => {
  const stateIcon =
    elevatorState === 'idle' ? faPoo : elevatorState === 'up' ? faArrowUp : faArrowDown;
  return (
    <OuterContainer>
      <FontAwesomeIcon icon={stateIcon} fixedWidth className="icon" />
      <FloorNumber> {currentFloor}</FloorNumber>
    </OuterContainer>
  );
};
