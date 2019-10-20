import React from 'react';
import styled from 'styled-components';
import {Tile} from '../Shared/Tile'
import { AppContext } from '../App/context';
import CoinImage from '../Shared/CoinImage';

const SpotlightName = styled.h2`
  text-align: center;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({coinList, currentFavorite}) => {
        return(
          <Tile>
            <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
            <CoinImage spotlight coin={coinList[currentFavorite]}/>
          </Tile>
        )

      }}
    </AppContext.Consumer>
  )
}
