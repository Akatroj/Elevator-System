import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { useDebugMode, useElevatorSystem } from '../hooks';
import { Wrapper } from './utils';

type Props = {};

const Button = styled.button`
  font-size: 1.5em;
  box-shadow: none;
  border-radius: 10px;
  padding: 1em;
  color: white;
  background-color: #186345;
  border: none;
  margin: 10px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #20835c;
  }
`;

const FloorCountForm = styled(Wrapper)`
  flex-flow: column;
  justify-content: space-evenly;
`;

const FormGroup = styled(Wrapper)`
  align-items: stretch;
  margin: 10px;

  &.horizontal {
    flex-flow: row;
  }

  &.vertical {
    flex-flow: column;
  }
`;

export const MenuForm = (props: Props) => {
  const {
    floorCount,
    setFloorCount,
    paused,
    togglePaused,
    toggleDemo,
    demoPlaying,
    delay,
    setDelay,
  } = useElevatorSystem();
  const { debug, toggleDebug } = useDebugMode();
  const [newFloorCount, setNewFloorCount] = useState(floorCount);

  return (
    <FloorCountForm as="form" onSubmit={(event: SyntheticEvent) => event.preventDefault()}>
      <FormGroup className="vertical">
        <label htmlFor="floorCount">Change the number of floors.</label>
        <input
          name="floorCount"
          min={2}
          value={newFloorCount}
          onChange={event => setNewFloorCount(Number(event.target.value))}
        />

        <label htmlFor="delay">Change the delay between next steps.</label>
        <input
          name="delay"
          value={delay}
          onChange={event => setDelay(Number(event.target.value))}
        />
        <Button onClick={() => setFloorCount(newFloorCount)}>{'Apply'}</Button>
      </FormGroup>
      <FormGroup className="horizontal">
        <Button onClick={togglePaused}>{paused ? 'Start interval' : 'Pause interval'}</Button>
        <Button onClick={toggleDebug}>{debug ? 'Stop debug mode' : 'Start debug mode'}</Button>
        <Button onClick={toggleDemo}>{demoPlaying ? 'Stop demo' : 'Start demo'}</Button>
      </FormGroup>
    </FloorCountForm>
  );
};
