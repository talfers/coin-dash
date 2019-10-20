import React from 'react';
import styled, { css } from 'styled-components';
import {SelectableTile} from '../Shared/Tile'
import {fontSize3, fontSizeBig} from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';

const numberFormat = (number) => {
  return +(number + '').slice(0, 7);
}

const JustifyRight = styled.div`
  justify-self: right;
`

const JustifyLeft = styled.div`
  justify-self: left;
`

const TickerPrice = styled.div`
  ${fontSizeBig};
`
const ChangePctStyled = styled.div`
  color: green;
  ${props => props.red && css`
      color: red;
    `}
`

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3}
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5px;
        justify-items: right;
      `}
`

function ChangePct({data}) {
  return (
    <JustifyRight>
      <ChangePctStyled red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePctStyled>
    </JustifyRight>
  )
}

function PriceTile({sym, data}){
  return(
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <ChangePct data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

function PriceTileCompact({sym, data}) {
  return(
    <PriceTileStyled compact>
      <JustifyLeft> {sym} </JustifyLeft>
      <ChangePct data={data} />
      <div>
        ${numberFormat(data.PRICE)}
      </div>
    </PriceTileStyled>
  )
}

export default function({price, index}) {
  let sym = Object.keys(price)[0];
  let data = price[sym]?price[sym]['USD']:{PRICE:'Not found'};
  let TileClass = index < 5?PriceTile:PriceTileCompact;
  return (
    <TileClass sym={sym} data={data}>
      {sym} {data.PRICE}
    </TileClass>
  )
}
