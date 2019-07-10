import React from 'react';
import { AppContext } from '../App/context';

function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({firstVisit}) => {
        if(firstVisit) {
          return (
            <div>
              Welcome to CoinDash
            </div>
          )

        } else {
          return null;
        }

      }}

    </AppContext.Consumer>

  )
}

export default WelcomeMessage;
