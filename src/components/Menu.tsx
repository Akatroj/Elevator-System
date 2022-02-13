import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useFloorCount } from '../hooks';
import { Floor } from '../models';
import { ElevatorButtons } from '.';

type Props = {
  visible: boolean;
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

export const Menu = ({ visible }: Props) => {
  const navigate = useNavigate();
  const { floorCount } = useFloorCount();
  return (
    <>
      <OuterContainer className={visible ? '' : 'hidden'}>
        <ElevatorButtons
          floorCount={floorCount}
          clickHandler={(floor: Floor) => navigate(`/floors/${floor}`)}
          size={{ width: 50, height: 100 }}
        ></ElevatorButtons>
      </OuterContainer>
    </>
  );
};
