import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Elevator from './Elevator';

type Props = {};

const ElevatorsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;

  background-color: aqua;
  width: 100vw;
  height: 100vh;
`;

const ElevatorContainer = (props: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpen(!open);
      console.log(open);
    }, 2000);
  }, [open]);
  const elevators = [...Array(10)].map((el, idx) => <Elevator key={idx} open={open} />);
  return <ElevatorsContainer>{elevators}</ElevatorsContainer>;
};

export default ElevatorContainer;
