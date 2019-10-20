import React from 'react';
import styled, { css } from 'styled-components';
import {SelectableTile} from '../Shared/Tile'
import {fontSize3, fontSizeBig, greenBoxShadow} from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/context';

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
    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none;
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

function PriceTile({sym, data, currentFavorite, setCurrentFavorite}){
  return(
    <PriceTileStyled onClick={(sym) => {setCurrentFavorite(sym)}} currentFavorite={currentFavorite}>
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

function PriceTileCompact({sym, data, currentFavorite, setCurrentFavorite}) {
  return(
    <PriceTileStyled compact onClick={(sym) => {setCurrentFavorite(sym)}} currentFavorite={currentFavorite}>
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
    <AppContext.Consumer>
      {({currentFavorite, setCurrentFavorite}) => {
        return (
          <TileClass
            sym={sym}
            data={data}
            currentFavorite={currentFavorite === sym}
            setCurrentFavorite={() => setCurrentFavorite(sym)}
          >
          </TileClass>
        )
      }}
    </AppContext.Consumer>

  )
}
