import React from 'react';
import styled, {css} from 'styled-components';
import { AppContext } from '../App/context';
import { SelectableTile } from '../Shared/Tile';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;
`;

function getCoinsToDisplay(coinList) {
  return Object.keys(coinList).slice(0, 100);
}

export default function CoinGrid() {
  return (
    <AppContext.Consumer>
      {({coinList}) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList).map(coinKey => {
              return <CoinTile coinKey={coinKey} />
            }
            )}
          </CoinGridStyled>
        )
      }
    }
    </AppContext.Consumer>
  )
}
