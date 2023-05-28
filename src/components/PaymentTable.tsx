import { memo, useCallback } from 'react';
import { groupBy } from 'lodash';
import { useAppDispatch, useAppSelector } from '../hooks';
import { sortPaymentsByDate, togglePaymentMarked } from '../store';
import type { TGetFullYearReturnType, TPayment, TQuarter } from '../store';

interface IPaymentTableProps {
    year: TGetFullYearReturnType;
    payments: TPayment[];
}

const PaymentTable = ({ year, payments }: IPaymentTableProps) => {
    const paymentsByQuarters = groupBy(payments, x => x.quarter);
    const quarters = Object.keys(paymentsByQuarters).sort((a, b) => a > b ? -1 : 1).map(x => parseInt(x)) as TQuarter[];
    return (
        <table className="w-full border-collapse mt-6">
            <tbody>
                <tr>
                    <td colSpan={4} className="px-3 py-4 bg-gray-300 text-center text-3xl font-light leading-normal">{year}</td>
                </tr>
                {quarters.map(quarter => <PaymentTableQuarter key={quarter} year={year} quarter={quarter} payments={paymentsByQuarters[quarter]} />)}
            </tbody>
        </table >
    );
};

interface IPaymentTableQuarterProps {
    year: TGetFullYearReturnType;
    quarter: TQuarter;
    payments: TPayment[];
}

const PaymentTableQuarter = ({ year, quarter, payments }: IPaymentTableQuarterProps) => {
    const selectedDocNums = useAppSelector(state => (state.payments.selectedPaymentInfo[year] || {})[quarter]) || [];
    const dispatch = useAppDispatch();

    const sortedPayments = sortPaymentsByDate(payments, { reverse: true });

    const onClick = useCallback((payment: TPayment) => {
        dispatch(togglePaymentMarked(payment));
    }, []);

    return (
        <>
            <tr>
                <td colSpan={4} className="table-cell p-3 border-b border-gray-500 text-xl font-medium leading-normal">квартал {quarter}</td>
            </tr>
            {sortedPayments.map(payment =>
                <MemoizedPaymentTableItem
                    key={payment.docNo} payment={payment}
                    checked={selectedDocNums.includes(payment.docNo)} onClick={onClick}
                />
            )}
        </>
    );
};

interface IPaymentTableItemProps {
    payment: TPayment;
    checked: boolean;
    onClick: (payment: TPayment) => void;
}

const PaymentTableItem = ({ payment, checked, onClick }: IPaymentTableItemProps) => {
    return (
        <tr>
            <td className="table-cell p-3 mx-auto my-0 border-b border-gray-500 leading-normal">
                <input
                    defaultChecked={checked}
                    onClick={() => onClick(payment)}
                    value={payment.docNo}
                    className="checkbox"
                    type="checkbox" />
            </td>
            <td className="table-cell p-3 border-b border-gray-500 leading-normal w-28">{payment.dateStr || ''}</td>
            <td className="table-cell p-3 border-b border-gray-500 leading-normal">{payment.note || ''}</td>
            <td className="table-cell p-3 border-b border-gray-500 leading-normal w-36 text-right">{payment.amountStr || ''} {payment.currency || ''}</td>
        </tr>
    );
};

const MemoizedPaymentTableItem = memo(PaymentTableItem);

export default PaymentTable;
