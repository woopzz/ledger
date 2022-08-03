import * as React from 'react';
import { TGetFullYearReturnType, TPayment, TQuarter } from '../store/payments/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { markPayment, unmarkPayment } from '../store/payments/paymentSlice';
import { groupBy } from 'lodash';

interface IPaymentTableProps {
    year: TGetFullYearReturnType;
    payments: TPayment[];
}

const PaymentTable: React.FC<IPaymentTableProps> = ({ year, payments, }) => {
    const selectedDocNums = useAppSelector(state => state.payments.selectedPaymentInfo[year]) || [];
    const dispatch = useAppDispatch();

    const paymentsByQuarters = groupBy(payments, x => x.quarter);
    const quarters = Object.keys(paymentsByQuarters).sort();

    const toggleInput = (event: React.ChangeEvent<HTMLInputElement>, docNo: TPayment['docNo']) => {
        const action = event.target.checked ? markPayment : unmarkPayment;
        dispatch(action({ docNo, year }));
    };

    const getQuarterPayments = (quarter: TQuarter): TPayment[] => {
        return (paymentsByQuarters[quarter] || []).sort();
    }

    return (
        <table className="payments-table">
            <tbody>
                <tr>
                    <td colSpan={4} className="payments-table__cell payments-table__cell_year">{year}</td>
                </tr>
                {quarters.map(quarter =>
                    <React.Fragment key={quarter}>
                        <tr>
                            <td colSpan={4} className="payments-table__cell payments-table__cell_quarter">квартал {quarter}</td>
                        </tr>
                        {getQuarterPayments(+quarter as TQuarter).map(payment =>
                            <tr key={payment.docNo}>
                                <td className="payments-table__cell payments-table__cell_checkbox">
                                    <input
                                        defaultChecked={selectedDocNums.includes(payment.docNo)}
                                        onChange={ev => toggleInput(ev, payment.docNo)}
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
