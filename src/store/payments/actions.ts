import { TPayment, TActionAppendPayments, PaymentsActions, TActionSelectPayment, TActionDiscardPayment } from './types';

export const appendPayments = (payments: TPayment[]): TActionAppendPayments => {
    return {
        type: PaymentsActions.APPEND,
        payload: payments,
    }
}

export const selectPayment = (docNo: TPayment['docNo']): TActionSelectPayment => {
    return {
        type: PaymentsActions.SELECT,
        payload: docNo,
    }
}

export const discardPayment = (docNo: TPayment['docNo']): TActionDiscardPayment => {
    return {
        type: PaymentsActions.DISCARD,
        payload: docNo,
    }
}
