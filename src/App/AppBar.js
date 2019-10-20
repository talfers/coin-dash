import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './context';

/* Function */

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

/* Components */

function ControlBtn({name, active}) {
  return (
    <AppContext.Consumer>
      {({firstVisit, page, setPage}) => (
        <ControlBtnElement
          onClick={() => setPage(name)}
          active={page === name}
          hidden={firstVisit && name==='dashboard'}
        >
          {toProperCase(name)}
        </ControlBtnElement>
      )}

    </AppContext.Consumer>
  )
}

function AppBar() {
  return (
    <Bar>
      <Logo>CoinDash</Logo>
      <div></div>
      <ControlBtn active name="dashboard"></ControlBtn>
      <ControlBtn name="settings"></ControlBtn>
    </Bar>
  )
}

/* Styled Components */

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`

const ControlBtnElement = styled.div`
  cursor: pointer;
  ${props => props.active && css`
      text-shadow: 0px 0px 60px #03ff03;
    `}
  ${props => props.hidden && css`
      display: none
    `}
`

const Logo = styled.div`
  font-size: 1.5rem;
`



export default AppBar;
