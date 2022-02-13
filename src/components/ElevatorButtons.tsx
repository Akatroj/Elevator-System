import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Size } from './utils';

type Props = { floorCount: number; size: Size; clickHandler: (floor: number) => void };

type OuterContainerProps = { size: Size };
type ButtonProps = { size: Size };

const OuterContainer = styled.div<OuterContainerProps>`
  display: flex;
  flex-flow: row wrap;
  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
  `};
  overflow: hidden auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Button = styled.div<ButtonProps>`
  box-sizing: border-box;
  margin: 1px;
  ${({ size: { width, height } }) =>
    css`
      width: ${width - 2}px;
      height: ${height - 2}px;
    `};
  cursor: pointer;
  background-color: gray;
  text-align: center;
  outline: 1px dotted black;
  outline-offset: -4px;
`;

export const ElevatorButtons = ({ size, floorCount, clickHandler }: Props) => {
  const buttonSize = useMemo<Size>(
    () => ({
      width: size.width / 2,
      height: size.width / 2,
    }),
    [size]
  );

  // TODO: rename
  // TODO: add keys to array

  const buttons = useMemo(
    () =>
      [...Array(floorCount)].map((_, floorIndex) => (
        <Button size={buttonSize} onClick={() => clickHandler(floorIndex)}>
          {floorIndex}
        </Button>
      )),
    [floorCount, buttonSize, clickHandler]
  );

  return <OuterContainer size={size}>{buttons}</OuterContainer>;
};
