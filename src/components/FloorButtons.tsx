import classNames from 'classnames';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Floor } from '../models';
import { Size } from './utils';

type FloorButtonsProps = {
  floorCount: number;
  clickedFloors: Floor[];
  size: Size;
  clickHandler: (floor: number) => void;
};

type OuterContainerProps = { size: Size };
type ButtonProps = { size: Size };

const OuterContainer = styled.div<OuterContainerProps>`
  /* TODO: width and height based on fontsize */
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
  background-color: #3f4045;
  text-align: center;
  outline: 3px solid #747681;
  outline-offset: -3px;
  color: #f5efed;
  &.active {
    outline-color: red;
  }
  &.debug {
    z-index: 50;
  }
`;

export const FloorButtons = ({
  size,
  floorCount,
  clickedFloors,
  clickHandler,
}: FloorButtonsProps) => {
  const buttonSize = useMemo<Size>(
    () => ({
      width: size.width / 2,
      height: size.width / 2,
    }),
    [size]
  );

  // TODO: rename

  const buttons = useMemo(() => {
    const highlightButton: boolean[] = new Array(floorCount).fill(false);
    clickedFloors.forEach(floor => (highlightButton[floor] = true));

    return highlightButton.map((highlight, floorIndex) => {
      const className = classNames({
        active: highlight,
        debug: true,
      });
      return (
        <Button
          key={floorIndex}
          className={className}
          size={buttonSize}
          onClick={() => clickHandler(floorIndex)}
        >
          {floorIndex}
        </Button>
      );
    });
  }, [clickedFloors, floorCount, buttonSize, clickHandler]);

  return <OuterContainer size={size}>{buttons}</OuterContainer>;
};
