import styled, { css } from 'styled-components';

export type Size = {
  width: string;
  height: string;
};

type DoorProps = Size;

type ElevatorDoorsProps = {
  size: DoorProps;
  open: boolean;
};

const Door = styled.div<DoorProps>`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `};
  position: absolute;
  background-color: silver;
  transition: transform 1s;
  &.left {
    border-right: 1px solid black;
    left: ${({ width }) => width};
    &.open {
      transform: translate(-100%, 0);
    }
  }
  &.right {
    border-left: 1px solid black;
    right: ${({ width }) => width};
    &.open {
      transform: translate(100%, 0);
    }
  }
  &.closed {
    transform: translate(0, 0);
  }
`;

const ElevatorDoors = ({ open, size: { width, height } }: ElevatorDoorsProps) => {
  const openClass = open ? 'open' : 'closed';

  return (
    <>
      <Door className={`left ${openClass}`} width={width} height={height} />
      <Door className={`right ${openClass}`} width={width} height={height} />
    </>
  );
};

export default ElevatorDoors;
