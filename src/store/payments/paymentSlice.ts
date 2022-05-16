import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPayment } from './types';
import type { TRootState } from '../index';

interface IPaymentState {
    list: TPayment[],
    selectedDocNums: TPayment['docNo'][],
}

const initialState: IPaymentState = {
    list: [],
    selectedDocNums: [],
};

export const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        addPayments: (state, action: PayloadAction<TPayment[]>) => {
            const newPayments = action.payload;
            // Ensure all payments are unique.
            const mapDocNoOnPayment = new Map<TPayment['docNo'], TPayment>();
            for (const payment of [...state.list, ...newPayments]) {
                mapDocNoOnPayment.set(payment.docNo, payment);
            }
            state.list = [...state.list, ...Array.from(mapDocNoOnPayment.values())];
        },
        markPayment: (state, action: PayloadAction<TPayment['docNo']>) => {
            const docNo = action.payload;
            state.selectedDocNums.push(docNo);
        },
        unmarkPayment: (state, action: PayloadAction<TPayment['docNo']>) => {
            const docNo = action.payload;
            state.selectedDocNums = state.selectedDocNums.filter(x => x !== docNo);
        },
    },
});

export const { addPayments, markPayment, unmarkPayment } = paymentSlice.actions;

export const selectPayments = (state: TRootState) => state.payments.list;
export const selectMarkedPayments = (state: TRootState) => {
    const docNums = state.payments.selectedDocNums;
    return state.payments.list.filter(payment => docNums.includes(payment.docNo));
};

export default paymentSlice.reducer;
