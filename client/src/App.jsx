import StockList from './components/StockList/StockList'
import './styles/App.css'

const App = () => {
  return (
    <div className="app-container">
      <h1>My Finance App</h1>
      <StockList />
      <h2>P.S (When the price goes up the it is shown as a green color, otherwise red)</h2>
    </div>
  );
}

export default App;
