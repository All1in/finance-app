import { useEffect, useState} from 'react'
import axios from 'axios'

const StockList = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:4000/');
            setStocks(response.data);
          } catch (error) {
            console.error('Error fetching stock data:', error);
          }
        }
    
        fetchData()
    
        return () => {
          clearInterval(fetchInterval)
        }
      }, [])

    return (
        <div>
        {stocks.map((stock) => (
            <div key={stock.ticker}>
                <h2>{stock.ticker}</h2>
                <p>Price: {stock.price}</p>
                <p>Change: {stock.change}</p>
            </div>
        ))}
    </div>
    );
}

export default StockList;