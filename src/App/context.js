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
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins
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
      // Callback after to fetch prices for user favorites
    }, () => {
      this.fetchPrices();
    });
    localStorage.setItem('coinDash', JSON.stringify({
      favorites: this.state.favorites
    }));
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
  }

  fetchPrices = async () => {
    // Don't want to fetch on firstVisit
    if(this.state.firstVisit) {return};
    // MUST await this too because at first will be receiving promises (promise array)
    let prices = await this.prices();
    console.log(prices);
    this.setState({prices});
  }

  prices = async () => {
    let returnData = [];
    for(let i = 0; i < this.state.favorites.length; i++){
       try {
        // priceFull (from cryptocompare) takes in (sym, currency)
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData)
      } catch (e){
        console.log('Fetch price error: ', e)
      }}
      return returnData;

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

  // Take in filtered list, sets the "filteredCoin" state
  setFilteredCoins = (filteredCoins) => {
    this.setState({filteredCoins: filteredCoins});
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )

  }
}
