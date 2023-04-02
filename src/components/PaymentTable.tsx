import { FC, ChangeEvent, Fragment } from 'react';
import { TGetFullYearReturnType, TPayment, TQuarter } from '../store/payments/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { markPayment, unmarkPayment } from '../store/payments/paymentSlice';
import { groupBy } from 'lodash';

interface IPaymentTableProps {
    year: TGetFullYearReturnType;
    payments: TPayment[];
}

const PaymentTable: FC<IPaymentTableProps> = ({ year, payments, }) => {
    const selectedDocNums = useAppSelector(state => state.payments.selectedPaymentInfo[year]) || [];
    const dispatch = useAppDispatch();

    const paymentsByQuarters = groupBy(payments, x => x.quarter);
    const quarters = Object.keys(paymentsByQuarters).sort();

    const toggleInput = (event: ChangeEvent<HTMLInputElement>, docNo: TPayment['docNo']) => {
        const action = event.target.checked ? markPayment : unmarkPayment;
        dispatch(action({ docNo, year }));
    };

    const getQuarterPayments = (quarter: TQuarter): TPayment[] => {
        return (paymentsByQuarters[quarter] || []).sort();
    }

    return (
        <table className="w-full border-collapse mt-6">
            <tbody>
                <tr>
                    <td colSpan={4} className="px-3 py-4 bg-gray-300 text-center text-3xl font-light leading-normal">{year}</td>
                </tr>
                {quarters.map(quarter =>
                    <Fragment key={quarter}>
                        <tr>
                            <td colSpan={4} className="table-cell p-3 border-b border-gray-500 text-xl font-medium leading-normal">квартал {quarter}</td>
                        </tr>
                        {getQuarterPayments(+quarter as TQuarter).map(payment =>
                            <tr key={payment.docNo}>
                                <td className="table-cell p-3 mx-auto my-0 border-b border-gray-500 leading-normal">
                                    <input
                                        defaultChecked={selectedDocNums.includes(payment.docNo)}
                                        onChange={ev => toggleInput(ev, payment.docNo)}
                                        value={payment.docNo}
                                        className="checkbox"
                                        type="checkbox" />
                                </td>
                                <td className="table-cell p-3 border-b border-gray-500 leading-normal w-28">{payment.dateStr || ''}</td>
                                <td className="table-cell p-3 border-b border-gray-500 leading-normal">{payment.note || ''}</td>
                                <td className="table-cell p-3 border-b border-gray-500 leading-normal w-36 text-right">{payment.amountStr || ''} {payment.currency || ''}</td>
                            </tr>
                        )}
                    </Fragment>
                )}
            </tbody>
        </table >
    );
}

export default PaymentTable;
