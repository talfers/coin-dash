import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/context';
import {fontSize1, greenBoxShadow, color3} from '../Shared/Styles';

function ConfirmButton() {
  return (
    <AppContext.Consumer>
    {({confirmFavorites}) =>
      <CenterDiv>
        <ConfirmButtonStyled onClick={() => confirmFavorites()}>
          Confirm Favorites
        </ConfirmButtonStyled>
      </CenterDiv>
    }
    </AppContext.Consumer>
  )
}

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1}
  padding: 5px;
  cursor: pointer;

  &:hover {
    ${greenBoxShadow}
  }
`

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default ConfirmButton;
