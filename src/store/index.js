import { createStore, combineReducers } from 'redux';
import paymentReducer from './payments/reducer';

const rootReducer = combineReducers({
    payments: paymentReducer,
});

const store = createStore(rootReducer);

export default store;
