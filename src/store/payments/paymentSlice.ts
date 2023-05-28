import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPayment } from './types';
import type { TRootState } from '../index';
import { flattenDeep } from 'lodash';

interface IPaymentState {
    list: TPayment[],
    selectedPaymentInfo: Record<TPayment['year'], TPayment['docNo'][] | undefined>,
}

const initialState: IPaymentState = {
    list: [],
    selectedPaymentInfo: {},
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
            state.list = Array.from(mapDocNoOnPayment.values());
        },
        togglePaymentMarked: (state, action: PayloadAction<TPayment>) => {
            const { year, docNo } = action.payload;

            const info = state.selectedPaymentInfo[year];
            if (info === undefined) {
                state.selectedPaymentInfo[year] = [docNo];
                return;
            }

            if (info.includes(docNo)) {
                state.selectedPaymentInfo[year] = info.filter(x => x !== docNo);
            } else {
                info.push(docNo);
            }
        },
    },
});

export const { addPayments, togglePaymentMarked } = paymentSlice.actions;

export const selectPayments = (state: TRootState) => state.payments.list;
export const selectMarkedPayments = (state: TRootState) => {
    const docNums = flattenDeep(Object.values(state.payments.selectedPaymentInfo));
    return state.payments.list.filter(payment => docNums.includes(payment.docNo));
};

export default paymentSlice.reducer;
