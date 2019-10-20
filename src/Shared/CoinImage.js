import React from 'react';
import styled, { css } from 'styled-components';

const CoinImageStyled = styled.img`
  height: 50px;
  ${props => props.spotlight && css`
      height: 200px;
      display: block;
      margin: auto;
    `}
`

export default function CoinImage({coin, spotlight}) {
  return (
    <CoinImageStyled
      spotlight={spotlight}
      alt={coin.Symbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  )
}
