import styled from 'styled-components';
import { Wrapper } from '.';

type ElevatorDoorsProps = {
  open: boolean;
};

const Door = styled.div`
  width: 3em;
  height: 10em;
  position: absolute;
  background-color: silver;
  transition: transform 1s;
  &.left {
    left: 3em;
    border-right: 1px solid black;
    &.open {
      transform: translate(-100%, 0);
    }
  }
  &.right {
    right: 3em;
    border-left: 1px solid black;
    &.open {
      transform: translate(100%, 0);
    }
  }
  &.closed {
    transform: translate(0, 0);
  }
`;

export const ElevatorDoors = ({ open }: ElevatorDoorsProps) => {
  const openClass = open ? 'open' : 'closed';

  return (
    <>
      <Door className={`left ${openClass}`} />
      <Door className={`right ${openClass}`} />
    </>
  );
};
