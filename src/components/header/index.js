import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-right: 100px;
  width: 200px;
`;

const Header = () => {
  const active = {
    fontWeight: 700,
    color: 'red',
  };

  return (
    <Wrap>
      <ul style={{ margin: 0 }}>
        <li>
          <NavLink to="/" exact activeStyle={active}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/bar-chart" exact activeStyle={active}>
            BAR-CHART
          </NavLink>
        </li>
        <li>
          <NavLink to="/pie-chart" exact activeStyle={active}>
            PIE-CHART
          </NavLink>
        </li>
        <li>
          <NavLink to="/stacked-chart" exact activeStyle={active}>
            STACKED-CHART
          </NavLink>
        </li>
      </ul>
    </Wrap>
  );
};

export default Header;
