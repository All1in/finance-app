import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StockList from './StockList';

const mockStore = configureMockStore();

test('renders stock items correctly', () => {
    // Mock the Redux store with an initial state
    const initialState = [
        { ticker: 'AAPL', price: 150, change: 5 },
        { ticker: 'GOOGL', price: 2800, change: -10 },
    ];
    const store = mockStore(initialState);

    // Render the component inside the Provider with the mock store
    const { getByText, getAllByTestId } = render(
        <Provider store={store}>
            <StockList />
        </Provider>
    );

    // Check if the stock items are rendered correctly
    const stockItems = getAllByTestId('stock-item');
    expect(stockItems).toHaveLength(2); // Check if two stock items are rendered

    const appleStockItem = getByText('AAPL');
    expect(appleStockItem).toBeInTheDocument();

    const googleStockItem = getByText('GOOGL');
    expect(googleStockItem).toBeInTheDocument();
});
