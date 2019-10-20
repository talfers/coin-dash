import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/context';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
`;

function getLowerCoins(filteredCoins, coinList) {
  return (filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0, 100)

}

function getCoinsToDisplay(coinList, topSection, favorites, filteredCoins) {
  return topSection ? favorites : getLowerCoins(filteredCoins, coinList)
}

export default function CoinGrid({topSection}) {
  return (
    <AppContext.Consumer>
      {({coinList, favorites, filteredCoins}) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => {
              return <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey} />
            }
            )}
          </CoinGridStyled>
        )
      }
    }
    </AppContext.Consumer>
  )
}
