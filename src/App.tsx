import React, { SyntheticEvent, useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from './components/';
import { ElevatorSystemProvider } from './contexts/';

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Burger = styled.div`
  position: absolute;

  top: 10px;
  right: 10px;
  font-size: 50pt;
  color: gray;
  cursor: pointer;
`;

export const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ElevatorSystemProvider>
      <OuterContainer onClick={() => setShowMenu(false)}>
        <Burger>
          <FontAwesomeIcon
            icon={faBars}
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              setShowMenu(true);
            }}
          />
        </Burger>
        <Menu visible={showMenu}></Menu>
        <Outlet />
      </OuterContainer>
    </ElevatorSystemProvider>
  );
};
