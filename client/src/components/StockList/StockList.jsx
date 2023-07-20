import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStocks } from '../../redux/stockReducer/stockSlice';
import socket from '../../socket';
import "./StockList.css"


const StockList = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);

  useEffect(() => {
    const handleStockUpdate = (data) => {
      dispatch(updateStocks(data));
    };

    socket.emit('start'); // Start the stock updates

    socket.on('ticker', handleStockUpdate);

    return () => {
      socket.off('ticker', handleStockUpdate);
    };
  }, [dispatch]);


  return (
      <div className="stock-list-container">
        { !stocks.length && <h1>The stocks array is empty...</h1> }
        {stocks.map((stock) => (
            <div
                className="stock-item"
                key={ stock.ticker }
            >
              <h2>{ stock.ticker }</h2>
              <p className={`price ${stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : ''}`}>
                Price: { stock.price }
              </p>
              <p className="change">Change: { stock.change }</p>
            </div>
        ))}
      </div>
  );
};

export default StockList;
