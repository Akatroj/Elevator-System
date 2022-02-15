import React, { ReactEventHandler } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from '.';

type AddElevatorButtonProps = {
  clickHandler: ReactEventHandler;
};

const AddElevatorWrapper = styled(Wrapper)`
  color: green;
  border: 2px dashed #3bb273;
  &.outer {
    width: 12em;
    height: 15em;
    border-radius: 30px;
  }

  &.inner {
    width: 6em;
    height: 7em;
    border-radius: 15px;
    cursor: pointer;
  }
`;

export const AddElevatorButton = ({ clickHandler }: AddElevatorButtonProps) => {
  return (
    <AddElevatorWrapper className="outer">
      <AddElevatorWrapper onClick={clickHandler} className="inner">
        <FontAwesomeIcon icon={faPlus} size={'5x'} />
      </AddElevatorWrapper>
    </AddElevatorWrapper>
  );
};
