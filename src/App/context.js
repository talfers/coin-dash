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
      setCurrentFavorite: this.setCurrentFavorite,
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
      let {favorites, currentFavorite} = coinDashData;
      return (
        {favorites, currentFavorite}
      )
    }
  }

  setPage = page => this.setState({page});

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false,
      page: "dashboard",
      currentFavorite
      // Callback after to fetch prices for user favorites
    }, () => {
      this.fetchPrices();
    });
    localStorage.setItem('coinDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  }

  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym
    });
    localStorage.setItem('coinDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('coinDash')),
      currentFavorite: sym
    }))
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
