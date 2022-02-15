import React from 'react';
import styled from 'styled-components';
import { ElevatorButtons } from '.';
import { useCurrentFloor } from '../hooks';

type Props = {};

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const TopPanel = (props: Props) => {
  const currentFloor = useCurrentFloor();
  return (
    <OuterContainer>
      <h2> witaj na pietrze {currentFloor}</h2>
      <ElevatorButtons />
    </OuterContainer>
  );
};
