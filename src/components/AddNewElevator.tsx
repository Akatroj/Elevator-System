import React, { ReactEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Size } from './utils';

type OuterContainerProps = { size: Size };
type InnerContainerProps = { size: Size };
type AddElevatorButtonProps = {
  clickHandler: ReactEventHandler;
  size: Size;
};

const OuterContainer = styled.div<OuterContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
  `}

  border: 2px dashed yellow;
  border-radius: 30px;
`;

const InnerContainer = styled.div<InnerContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
  border: 2px dashed yellow;
  border-radius: 15px;
  color: green;
  cursor: pointer;
`;

export const AddElevatorButton = ({ size, clickHandler }: AddElevatorButtonProps) => {
  const innerSize: Size = {
    width: size.width / 2,
    height: size.height / 2,
  };
  return (
    <OuterContainer size={size}>
      <InnerContainer size={innerSize} onClick={clickHandler}>
        <FontAwesomeIcon icon={faPlus} size={'5x'} />
      </InnerContainer>
    </OuterContainer>
  );
};
