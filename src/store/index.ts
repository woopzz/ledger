import { createStore, combineReducers } from 'redux';
import { paymentReducer } from './payments/reducer';

const rootReducer = combineReducers({
    payments: paymentReducer,
});

export const store = createStore(rootReducer);

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
