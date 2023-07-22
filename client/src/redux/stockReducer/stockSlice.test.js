import stockReducer, { updateStocks } from './stockSlice';
import { createStore } from 'redux';

describe('stockReducer', () => {
    it('should return the initial state', () => {
        const store = createStore(stockReducer);
        const currentState = store.getState();
        expect(currentState).toEqual([]);
    });

    it('should update stocks when receiving updateStocks action', () => {
        const initialState = [
            { symbol: 'AAPL', price: 150 },
            { symbol: 'GOOGL', price: 2800 },
        ];
        const updatedStocks = [
            { symbol: 'AAPL', price: 160 },
            { symbol: 'GOOGL', price: 2850 },
            { symbol: 'MSFT', price: 300 },
        ];
        const action = { type: updateStocks.type, payload: updatedStocks };

        const stateAfterUpdate = stockReducer(initialState, action);

        expect(stateAfterUpdate).toEqual(updatedStocks);
    });

    it('should not mutate the original state', () => {
        const initialState = [
            { symbol: 'AAPL', price: 150 },
            { symbol: 'GOOGL', price: 2800 },
        ];
        const updatedStocks = [
            { symbol: 'AAPL', price: 160 },
            { symbol: 'GOOGL', price: 2850 },
            { symbol: 'MSFT', price: 300 },
        ];
        const action = { type: updateStocks.type, payload: updatedStocks };

        const stateAfterUpdate = stockReducer(initialState, action);

        // The original state should remain unchanged
        expect(initialState).toEqual([
            { symbol: 'AAPL', price: 150 },
            { symbol: 'GOOGL', price: 2800 },
        ]);

        // The state returned by the reducer should be a new object, not the same reference
        expect(stateAfterUpdate).not.toBe(initialState);
    });
});
