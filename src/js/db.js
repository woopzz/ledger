import events from './events';

const _payments = {};

export function addPayments(payments) {
    for (let payment of payments) {
        _payments[payment.docNo] = payment;
    }
    document.dispatchEvent(new Event(events.PaymentsUpdated));
}

export function getPayments() {
    return Object.values(_payments);
}

export function getPaymentByDocNo(docNo) {
    return _payments[docNo];
}
