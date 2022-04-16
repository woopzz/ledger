import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPayment, discardPayment } from 'MyStore/payments/actions';

const PaymentTable = ({ year, paymentsByQuarters, selectedDocNums }) => {
    const dispatch = useDispatch();

    const quarters = Object.keys(paymentsByQuarters).sort();

    const toggleInput = event => {
        const action = event.target.checked ? selectPayment : discardPayment;
        dispatch(action(event.target.value));
    };

    return (
        <table className="payments-table">
            <tbody>
                <tr>
                    <td colSpan="4" className="payments-table__cell payments-table__cell_year">{year}</td>
                </tr>
                {quarters.map(quarter =>
                    <React.Fragment key={quarter}>
                        <tr>
                            <td colSpan="4" className="payments-table__cell payments-table__cell_quarter">квартал {quarter}</td>
                        </tr>
                        {paymentsByQuarters[quarter].sort().map(payment =>
                            <tr key={payment.docNo}>
                                <td className="payments-table__cell payments-table__cell_checkbox">
                                    <input
                                        defaultChecked={selectedDocNums.includes(payment.docNo)}
                                        onChange={toggleInput}
                                        value={payment.docNo}
                                        className="checkbox"
                                        type="checkbox" />
                                </td>
                                <td className="payments-table__cell payments-table__cell_date">{payment.dateStr || ''}</td>
                                <td className="payments-table__cell">{payment.note || ''}</td>
                                <td className="payments-table__cell payments-table__cell_amount">{payment.amountStr || ''} {payment.currency || ''}</td>
                            </tr>
                        )}
                    </React.Fragment>
                )}
            </tbody>
        </table >
    );
}

export default PaymentTable;
