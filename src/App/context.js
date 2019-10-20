import React from 'react';
import moment from 'moment';
const cc = require('cryptocompare');

export const AppContext = React.createContext();

// for max num of favorties in arr
const MAX_FAVORITES = 10;
// for max num of 'days' to fetch data for
const TIME_UNITS = 10;

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
      currentFavorite,
      prices: null,
      historical: null
      // Callback after to fetch prices for user favorites
    }, () => {
      this.fetchPrices();
      this.fetchHistorical();
    });
    localStorage.setItem('coinDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  }

  setCurrentFavorite = (sym) => {
    // Fetch historical after the setState
    // Clear hist to not show old, and show indictor (very smart!)
    this.setState({
      currentFavorite: sym,
      historical: null
    }, this.fetchHistorical);
    localStorage.setItem('coinDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('coinDash')),
      currentFavorite: sym
    }))
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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

  fetchHistorical = async () => {
    if(this.state.firstVisit) return;
    const results = await this.historical();
    let historical = [
      {
        // data will be array of arrays with x and y values (data and price)
        name: this.state.currentFavorite,
        data: results.map((ticker, i) => {
          return [
            moment().subtract({months: TIME_UNITS - i}).valueOf(),
            ticker.USD
          ]
        })
      }
    ]
    this.setState({historical});
  }

  historical = () => {
    let promises = [];
    for(let i = TIME_UNITS; i > 0; i--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment().subtract({months: i}).toDate()
        )
      )
    }
    // Return when ALL promises are resolved
    return Promise.all(promises)
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
