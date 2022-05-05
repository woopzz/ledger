import { PaymentsActions, TPayment, TPaymentAction } from './types';

interface IPaymentState {
    list: TPayment[],
    selectedDocNums: TPayment['docNo'][],
}

const defaultState: IPaymentState = {
    list: [],
    selectedDocNums: [],
};

export const paymentReducer = (state: IPaymentState = defaultState, action: TPaymentAction): IPaymentState => {
    switch (action.type) {
        case PaymentsActions.APPEND:
            // Ensure all payments are unique.
            const mapDocNoOnPayment = new Map();
            for (const payment of [...state.list, ...action.payload]) {
                mapDocNoOnPayment.set(payment.docNo, payment);
            }
            return { ...state, list: Array.from(mapDocNoOnPayment.values()) };
        case PaymentsActions.SELECT:
            return { ...state, selectedDocNums: [...state.selectedDocNums, action.payload] };
        case PaymentsActions.DISCARD:
            return { ...state, selectedDocNums: state.selectedDocNums.filter(x => x !== action.payload) };
        default:
            return state;
    }
};
