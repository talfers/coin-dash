import React from 'react';
import { AppContext } from '../App/context';

function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({firstVisit}) => {
        if(firstVisit) {
          return (
            <div>
              Welcome to CoinDash, please select your favorite coins to get started.
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
