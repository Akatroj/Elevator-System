import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPoo } from '@fortawesome/free-solid-svg-icons';
import { ElevatorWorkingState, Floor } from '../models';

type ElevatorScreenProps = { elevatorState: ElevatorWorkingState; currentFloor: Floor };

const OuterContainer = styled.div`
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

export const ElevatorScreen = ({ elevatorState, currentFloor }: ElevatorScreenProps) => {
  const stateIcon =
    elevatorState === 'idle' ? faPoo : elevatorState === 'up' ? faArrowUp : faArrowDown;
  return (
    <OuterContainer>
      <FontAwesomeIcon icon={stateIcon} fixedWidth />
      <FloorNumber> {currentFloor}</FloorNumber>
    </OuterContainer>
  );
};
