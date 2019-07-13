import React from 'react';

const cc = require('cryptocompare');


export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      setPage: this.setPage,
      favorites: ['BTC', 'ETH', 'LTC'],
      ...this.savedSettings(),
      confirmFavorites: this.confirmFavorites,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites
    }
  }

  savedSettings() {
    let coinDashData = JSON.parse(localStorage.getItem('coinDash'));
    if(!coinDashData){
      return {page: 'settings', firstVisit: true}
    } else {
      let {favorites} = coinDashData;
      return (
        {favorites}
      )
    }
  }

  setPage = page => this.setState({page});

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem('coinDash', JSON.stringify({
      favorites: this.state.favorites
    }));
  }

  componentDidMount() {
    this.fetchCoins();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
  }

  addCoin = (key) => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({favorites});
    }
  }

  removeCoin = (key) => {
    let favorites = [...this.state.favorites];
    let newFavorites = favorites.filter((item) => item !== key);
    this.setState({favorites: newFavorites});
  }

  isInFavorites = (key) => {
    let favorites = [...this.state.favorites]
    return favorites.includes(key);
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )

  }
}
