import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/context';
import PriceTile from './PriceTile';

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default function() {
  return (
    <AppContext.Consumer>
      {({prices}) => {
        return (
          <PriceGrid>
            {prices.map((price, index) => <PriceTile key={`priceTile-${index}`} price={price} index={index} />)}
          </PriceGrid>
        )

      }}
    </AppContext.Consumer>
  );
}
