import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStocks } from '../../redux/stockReducer/stockSlice';
import socket from '../../socket';


const StockList = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  
  console.log('stocks', stocks); // also)
  console.log('socket', socket); // unnecessary logs 

  useEffect(() => {
    const handleStockUpdate = (data) => {
      dispatch(updateStocks(data));
    };

    socket.emit('start'); // made to start the stock updates

    socket.on('ticker', handleStockUpdate);

    return () => {
      socket.off('ticker', handleStockUpdate);
    };
  }, [dispatch]);

  return (
    <div>
      {!stocks.length && <h1> The stocks array is empty... </h1>}
      {stocks.map((stock) => (
        <div key={ stock.ticker }>
          <h2> { stock.ticker } </h2>
          <p> Price: { stock.price } </p>
          <p> Change: { stock.change } </p>
        </div>
      ))}
    </div>
  );
};

export default StockList;
