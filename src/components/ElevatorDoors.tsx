import styled, { css } from 'styled-components';
import { Size } from './utils';

type DoorProps = { size: Size };

type ElevatorDoorsProps = {
  size: Size;
  open: boolean;
};

const Door = styled.div<DoorProps>`
  ${({ size: { width, height } }) => css`
    width: ${width}px;
    height: ${height}px;
    &.left {
      left: ${width}px;
    }
    &.right {
      right: ${width}px;
    }
  `};
  position: absolute;
  background-color: silver;
  transition: transform 1s;
  &.left {
    border-right: 1px solid black;
    &.open {
      transform: translate(-100%, 0);
    }
  }
  &.right {
    border-left: 1px solid black;
    &.open {
      transform: translate(100%, 0);
    }
  }
  &.closed {
    transform: translate(0, 0);
  }
`;

export const ElevatorDoors = ({ open, size }: ElevatorDoorsProps) => {
  const openClass = open ? 'open' : 'closed';

  return (
    <>
      <Door className={`left ${openClass}`} size={size} />
      <Door className={`right ${openClass}`} size={size} />
    </>
  );
};
