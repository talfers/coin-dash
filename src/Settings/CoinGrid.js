import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/context';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;
`;

function getCoinsToDisplay(coinList, topSection, favorites) {
  return topSection ? favorites : Object.keys(coinList).slice(0, topSection? 10: 100);
}

export default function CoinGrid({topSection}) {
  return (
    <AppContext.Consumer>
      {({coinList, favorites}) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => {
              return <CoinTile topSection={topSection} coinKey={coinKey} />
            }
            )}
          </CoinGridStyled>
        )
      }
    }
    </AppContext.Consumer>
  )
}
