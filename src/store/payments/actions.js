export const ACTION_APPEND_PAYMENTS = 'APPEND_PAYMENTS';
export const ACTION_SELECT_PAYMENT = 'SELECT_PAYMENT';
export const ACTION_DISCARD_PAYMENT = 'DISCARD_PAYMENT';

export const appendPayments = payments => {
    return {
        type: ACTION_APPEND_PAYMENTS,
        payload: payments,
    }
}

export const selectPayment = docNo => {
    return {
        type: ACTION_SELECT_PAYMENT,
        payload: docNo,
    }
}

export const discardPayment = docNo => {
    return {
        type: ACTION_DISCARD_PAYMENT,
        payload: docNo,
    }
}
