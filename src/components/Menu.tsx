import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useElevatorSystem } from '../hooks';
import { Floor } from '../models';
import { DeleteButton, FloorButtons } from '.';

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
  const { floorCount, setFloorCount, reset } = useElevatorSystem();

  const [newFloorCount, setNewFloorCount] = useState(floorCount);
  return (
    <>
      <OuterContainer
        className={visible ? '' : 'hidden'}
        onClick={(event: SyntheticEvent) => event.stopPropagation()}
      >
        <HideButton clickHandler={hide} />
        <FloorButtons
          clickedFloors={[]}
          floorCount={floorCount}
          clickHandler={(floor: Floor) => navigate(`/floors/${floor}`)}
          size={{ width: 50, height: 100 }}
        ></FloorButtons>
        <Button onClick={() => console.log('not yet implemented')}>{'Debug on'}</Button>
        <Button onClick={() => console.log('not yet implemented')}>{'Interval on'}</Button>
        <Button onClick={() => console.log('not yet implemented')}>{'Demo on'}</Button>
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
    </>
  );
};
