import React from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 0.3em;
  right: 0.3em;
  z-index: 10;

  visibility: unset;
  color: red;
  cursor: pointer;
`;

type DeleteButtonProps = { className?: string; clickHandler: () => void };

export const DeleteButton = ({ className, clickHandler }: DeleteButtonProps) => {
  return (
    <DeleteButtonWrapper onClick={clickHandler} className={className}>
      <FontAwesomeIcon icon={faXmark} fixedWidth />
    </DeleteButtonWrapper>
  );
};
