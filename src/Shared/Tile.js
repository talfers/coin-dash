import styled from 'styled-components';
import { AppContext } from '../App/context';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Styles';

export const Tile = styled.div`
  ${lightBlueBackground}
  ${subtleBoxShadow}
  padding: 10px;

`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
`;
