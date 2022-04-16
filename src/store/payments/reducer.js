import { ACTION_APPEND_PAYMENTS, ACTION_SELECT_PAYMENT, ACTION_DISCARD_PAYMENT } from './actions';

const defaultState = {
    list: [],
    selectedDocNums: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_APPEND_PAYMENTS:
            // Ensure all payments are unique.
            const mapDocNoOnPayment = new Map();
            for (const payment of [...state.list, ...action.payload]) {
                mapDocNoOnPayment.set(payment.docNo, payment);
            }
            return { ...state, list: Array.from(mapDocNoOnPayment.values()) };
        case ACTION_SELECT_PAYMENT:
            return { ...state, selectedDocNums: [...state.selectedDocNums, action.payload] };
        case ACTION_DISCARD_PAYMENT:
            return { ...state, selectedDocNums: state.selectedDocNums.filter(x => x !== action.payload) };
        default:
            return state;
    }
};

export default reducer;
