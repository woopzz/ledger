import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPayment, TQuarter } from './types';
import type { TRootState } from '../index';
import { flattenDeep } from 'lodash';

interface IPaymentState {
    list: TPayment[],
    selectedPaymentInfo: Record<TPayment['year'], Record<TPayment['quarter'], TPayment['docNo'][]>>,
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
            const { year, quarter, docNo } = action.payload;

            let yearInfo = state.selectedPaymentInfo[year];
            if (yearInfo === undefined) {
                state.selectedPaymentInfo[year] = yearInfo = {} as Record<TQuarter, TPayment['docNo'][]>;
            }

            const quarterInfo = yearInfo[quarter];
            if (quarterInfo === undefined) {
                yearInfo[quarter] = [docNo];
                return;
            }

            if (quarterInfo.includes(docNo)) {
                yearInfo[quarter] = quarterInfo.filter(x => x !== docNo);
            } else {
                quarterInfo.push(docNo);
            }
        },
    },
});

export const { addPayments, togglePaymentMarked } = paymentSlice.actions;

export const selectPayments = (state: TRootState) => state.payments.list;
export const selectMarkedPayments = (state: TRootState) => {
    const docNums = flattenDeep(Object.values(state.payments.selectedPaymentInfo).map(
        (quarterToDocNo) => Object.values(quarterToDocNo)
    )) as string[];
    return state.payments.list.filter(payment => docNums.includes(payment.docNo));
};

export default paymentSlice.reducer;
