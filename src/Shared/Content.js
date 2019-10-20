import React from 'react';
import { AppContext } from '../App/context';


function Content(props) {
  return (
    <AppContext.Consumer>
      {({coinList, firstVisit, prices}) => {
        if(!coinList) {
          return <div>Loading Coins...</div>;
        } if(!firstVisit && !prices) {
          return <div>Loading Prices...</div>;
        } else {
          return <div>{ props.children }</div>;
        }
      }}
    </AppContext.Consumer>
  )
}

export default Content;
