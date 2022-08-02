import * as React from 'react';
import { TGetFullYearReturnType, TPayment, TQuarter, TQuartersToPayments } from '../store/payments/types';
import { useAppDispatch } from '../hooks';
import { markPayment, unmarkPayment } from '../store/payments/paymentSlice';

interface IPaymentTableProps {
    year: TGetFullYearReturnType;
    paymentsByQuarters: TQuartersToPayments;
    selectedDocNums: string[];
}

const PaymentTable: React.FC<IPaymentTableProps> = ({ year, paymentsByQuarters, selectedDocNums }) => {
    const dispatch = useAppDispatch();

    const quarters = Array.from(paymentsByQuarters.keys()).sort();

    const toggleInput = (event: React.ChangeEvent<HTMLInputElement>, docNo: TPayment['docNo']) => {
        const action = event.target.checked ? markPayment : unmarkPayment;
        dispatch(action(docNo));
    };

    const getQuarterPayments = (quarter: TQuarter): TPayment[] => {
        return (paymentsByQuarters.get(quarter) || []).sort();
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
                        {getQuarterPayments(quarter).map(payment =>
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
