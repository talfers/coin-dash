import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      setPage: this.setPage,
      ...this.savedSettings(),
      confirmFavorites: this.confirmFavorites
    }
  }

  savedSettings() {
    let coinDashData = JSON.parse(localStorage.getItem('coinDash'));
    if(!coinDashData){
      return {page: 'settings', firstVisit: true}
    } else {
      return {}
    }
  }

  setPage = page => this.setState({page});

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem('coinDash', JSON.stringify({
      test: 'Hello, first-timer!'
    }));
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )

  }
}
