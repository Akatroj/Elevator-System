import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '.';
import { useCurrentFloor } from '../hooks';
import { ElevatorButtons } from './ElevatorButtons';

type Props = {};

const TopPanelWrapper = styled(Wrapper)`
  justify-content: space-between;
  width: 80%;
`;

export const TopPanel = (props: Props) => {
  const currentFloor = useCurrentFloor();
  return (
    <TopPanelWrapper>
      <ElevatorButtons />
      <h2> witaj na pietrze {currentFloor}</h2>
    </TopPanelWrapper>
  );
};
