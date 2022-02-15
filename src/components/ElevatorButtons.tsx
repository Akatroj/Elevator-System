import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCurrentFloor, useElevatorSystem } from '../hooks';
import { ElevatorDirection } from '../models';

type ButtonActiveState = { [key in ElevatorDirection]: boolean };

const OuterContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-size: 30pt;

  .active {
    color: red;
  }

  .pointer {
    cursor: pointer;
  }
`;

export const ElevatorButtons = () => {
  const [active, setActive] = useState<ButtonActiveState>({ up: false, down: false });
  const { elevators, requestPickup } = useElevatorSystem();
  const currentFloor = useCurrentFloor();

  const activate = (key: ElevatorDirection) => {
    active[key] = true;
    setActive({ ...active });
  };

  useEffect(() => {
    // TODO: ugly solution, may not always work
    const arrived =
      elevators.find(elevator => elevator.currentFloor === currentFloor) ?? false;
    if (arrived) setActive({ up: false, down: false });
  }, [elevators, currentFloor]);

  const clickHandler = (key: ElevatorDirection) => {
    requestPickup(currentFloor, key);
    activate(key);
  };

  const upClass = classNames({ pointer: true, active: active.up });
  const downClass = classNames({ pointer: true, active: active.down });
  return (
    <OuterContainer>
      <FontAwesomeIcon
        icon={faPlay}
        rotation={270}
        className={upClass}
        onClick={() => clickHandler('up')}
        fixedWidth
      />
      <FontAwesomeIcon
        icon={faPlay}
        rotation={90}
        className={downClass}
        onClick={() => clickHandler('down')}
        fixedWidth
      />
    </OuterContainer>
  );
};
