import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useDebugMode, useElevatorSystem } from '../hooks';
import { Floor } from '../models';
import { DeleteButton, FloorButtons } from '.';
import classNames from 'classnames';

type MenuProps = {
  visible: boolean;
  hide: () => void;
};

const OuterContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;

  width: min(450px, 100vw);
  height: 100vh;
  background-color: yellow;

  transition: transform 0.5s ease-in-out;
  &.hidden {
    transform: translate(100%, 0);
  }
`;

const Button = styled.button``;

const FloorCountForm = styled.form``;

const HideButton = styled(DeleteButton)`
  font-size: 3rem;
`;

export const Menu = ({ visible, hide }: MenuProps) => {
  const navigate = useNavigate();
  const { floorCount, setFloorCount, paused, togglePaused, toggleDemo, demoPlaying } =
    useElevatorSystem();
  const { debug, toggleDebug } = useDebugMode();

  const [newFloorCount, setNewFloorCount] = useState(floorCount);

  const className = classNames({ hidden: !visible });
  return (
    <OuterContainer
      className={className}
      onClick={(event: SyntheticEvent) => event.stopPropagation()}
    >
      <HideButton clickHandler={hide} />
      <FloorButtons
        clickedFloors={[]}
        floorCount={floorCount}
        clickHandler={(floor: Floor) => navigate(`/floors/${floor}`)}
        size={{ width: 50, height: 100 }}
      ></FloorButtons>
      <Button onClick={togglePaused}>{paused ? 'Start interval' : 'Pause interval'}</Button>
      <Button onClick={toggleDebug}>{debug ? 'Stop debug mode' : 'Start debug mode'}</Button>
      <Button onClick={toggleDemo}>{demoPlaying ? 'Stop demo' : 'Start demo'}</Button>
      {/* TODO: Extract component */}
      <FloorCountForm onSubmit={(event: SyntheticEvent) => event.preventDefault()}>
        <input
          name="floorCount"
          min={2}
          value={newFloorCount}
          onChange={event => setNewFloorCount(Number(event.target.value))}
        />
        <label htmlFor="floorCount">Change the number of floors.</label>
        <Button onClick={() => setFloorCount(newFloorCount)}>{'Apply'}</Button>
      </FloorCountForm>
    </OuterContainer>
  );
};
