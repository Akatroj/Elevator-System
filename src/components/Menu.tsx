import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useElevatorSystem } from '../hooks';
import { Floor } from '../models';
import { DeleteButton, FloorButtons, Wrapper } from '.';
import { MenuForm } from './MenuForm';
import classNames from 'classnames';

type MenuProps = {
  visible: boolean;
  hide: () => void;
};

const MenuWrapper = styled(Wrapper)`
  flex-flow: column;
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;

  width: min(450px, 100vw);
  height: 100vh;
  background-color: #96c0b7;

  transition: transform 0.5s ease-in-out;
  &.hidden {
    transform: translate(100%, 0);
  }
`;

const BigFloorButtons = styled(FloorButtons)`
  font-size: 3em;
`;

const HideButton = styled(DeleteButton)`
  font-size: 3rem;
`;

export const Menu = ({ visible, hide }: MenuProps) => {
  const navigate = useNavigate();
  const { floorCount } = useElevatorSystem();

  const className = classNames({ hidden: !visible });
  return (
    <MenuWrapper
      className={className}
      onClick={(event: SyntheticEvent) => event.stopPropagation()}
    >
      <HideButton clickHandler={hide} />
      <BigFloorButtons
        clickedFloors={[]}
        floorCount={floorCount}
        clickHandler={(floor: Floor) => navigate(`/floors/${floor}`)}
      ></BigFloorButtons>
      <MenuForm />
    </MenuWrapper>
  );
};
