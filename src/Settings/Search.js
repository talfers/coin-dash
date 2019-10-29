import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/context';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  align-self: center;
  justify-self: left;
  padding-left: 0.25rem;
`;

function objectToArray(coinList){
  let newArray = [];
  let objKeys = Object.keys(coinList);
  objKeys.forEach(key => newArray.push(coinList[key]));
  return newArray;
}

const handleFilter = debounce(function(inputValue, coinList, setFilteredCoins) {
  let newCoinList = objectToArray(coinList);
  // Get all coin symbols (key) array
  let coinSymbols = Object.keys(coinList);
  // Get all coin symbols (key) array
  let coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName);
  // Mashing the two symbols and names together in one array
  let allStringsForSearch = coinSymbols.concat(coinNames);
  let fuzzyData = fuzzy.filter(inputValue, allStringsForSearch, {})
  let fuzzyResults = fuzzyData.map(result => result.string)
  let filteredResults = {};
  newCoinList.forEach(coin => {
    if(fuzzyResults.includes(coin.CoinName.toString()) || fuzzyResults.includes(coin.Symbol.toString())) {
      let sym = coin.Symbol;
      filteredResults[sym] = coin;
    } else {
      return null;
    }
  });
  setFilteredCoins(filteredResults);

}, {} , 500)


function filterCoins(e, coinList, setFilteredCoins) {
  let inputValue = e.target.value;
  if(!inputValue) {
    setFilteredCoins(null);
  } else {
    handleFilter(inputValue, coinList, setFilteredCoins);
  }

}

export default function Search() {
  return (
    <AppContext.Consumer>
      {({setFilteredCoins, coinList}) => {
        return (
          <SearchGrid>
            <h2>Search all coins</h2>
            <SearchInput onKeyUp={(e) => {filterCoins(e, coinList, setFilteredCoins)}}></SearchInput>
          </SearchGrid>
        )

      }}

    </AppContext.Consumer>
  )
}


/* DEBOUNCE FUNCTION */
// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    var context = this;
    var args = arguments;

    // The function to be called after
    // the debounce time has elapsed
    var later = function() {
      // null timeout to indicate the debounce ended
      timeout = null;

      // Call function now if you did not on the leading end
      if (!immediate) func.apply(context, args);
    };

    // Determine if you should call the function
    // on the leading or trail end
    var callNow = immediate && !timeout;

    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, wait);

    // Call immediately if you're dong a leading
    // end execution
    if (callNow) func.apply(context, args);
  };
};
