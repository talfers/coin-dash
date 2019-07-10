import React from 'react';
import { AppContext } from '../App/context';


function Content(props) {
  return (
    <AppContext.Consumer>
      {({coinList}) => {
        if(!coinList) {
          return <div>Loading Coins...</div>;
        } else {
          return <div>{ props.children }</div>;
        }
      }}
    </AppContext.Consumer>
  )
}

export default Content;
