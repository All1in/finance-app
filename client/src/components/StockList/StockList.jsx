import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStocks } from '../../redux/stockReducer/stockSlice';
import socket from '../../socket';
import { toggleTicker } from '../../redux/stockReducer/stockSlice';
import "./StockList.css"


const StockList = () => {
  const [tickerVisibility, setTickerVisibility] = useState({}) // state for this (the possibility to switch on/off tickers by user)

  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  
  console.log('stocks', stocks); // also)
  console.log('socket', socket); // unnecessary logs 

  useEffect(() => {
    const handleStockUpdate = (data) => {
      console.log('data in handleStockUpdate', data); // also unnecessary logs 
      dispatch(updateStocks(data)); // I'm changing state in Redux
    };

    socket.emit('start'); // made to start the stock updates

    socket.on('ticker', handleStockUpdate); 

    return () => {
      socket.off('ticker', handleStockUpdate);
    };
  }, [dispatch]);


  const handleToggleTicker = (ticker) => {
    dispatch(toggleTicker(ticker));
    setTickerVisibility((prevVisibility) => ({
      ...prevVisibility,
      [ticker]: !prevVisibility[ticker],
    }));
  };


  return (
    <div className="stock-list-container" >
      {!stocks.length && <h1> The stocks array is empty... </h1>}
      {stocks.map((stock) => (
        <div 
            className={`stock-item ${tickerVisibility[stock.ticker] === false ? 'hidden' : ''}`}
            key={ stock.ticker } // keys for React
        >
          <h2> { stock.ticker } </h2>
          <p className={`price ${ stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : '' }`}>
            Price: { stock.price }
          </p>
          <p className="change">
            Change: { stock.change } 
          </p>
          <label>
            <input
              type="checkbox"
              checked={tickerVisibility[stock.ticker] !== false}
              onChange={() => handleToggleTicker(stock.ticker)}
            />
            Show Ticker
          </label>
        </div>
      ))}
    </div>
  );
};

export default StockList;
