import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './payments/paymentSlice';

export const store = configureStore({
    reducer: {
        'payments': paymentReducer,
    }
})

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
