import { FC, Fragment, memo, useCallback } from 'react';
import { TGetFullYearReturnType, TPayment, TQuarter } from '../store/payments/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { togglePaymentMarked } from '../store/payments/paymentSlice';
import { sortPaymentsByDate } from '../store/payments/models';
import { groupBy } from 'lodash';

interface IPaymentTableProps {
    year: TGetFullYearReturnType;
    payments: TPayment[];
}

const PaymentTable: FC<IPaymentTableProps> = ({ year, payments, }) => {
    const selectedDocNums = useAppSelector(state => state.payments.selectedPaymentInfo[year]) || [];
    const dispatch = useAppDispatch();

    const paymentsByQuarters = groupBy(payments, x => x.quarter);
    const quarters = Object.keys(paymentsByQuarters).sort((a, b) => a > b ? -1 : 1);

    const onClick = useCallback((payment: TPayment) => {
        dispatch(togglePaymentMarked(payment));
    }, []);

    const getQuarterPayments = (quarter: TQuarter): TPayment[] => {
        return sortPaymentsByDate(paymentsByQuarters[quarter] || [], { reverse: true });
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
                            <MemoizedPaymentTableItem key={payment.docNo} payment={payment} checked={selectedDocNums.includes(payment.docNo)} onClick={onClick} />
                        )}
                    </Fragment>
                )}
            </tbody>
        </table >
    );
}

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
