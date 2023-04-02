import { FC } from "react";

import PaymentTable from './PaymentTable';
import { useAppSelector } from '../hooks';
import { selectPayments } from '../store/payments/paymentSlice';
import { groupBy } from 'lodash';

export const PaymentTableList: FC = () => {
    const payments = useAppSelector(selectPayments);
    const paymentsByYear = groupBy(payments, 'year');
    return (
        <div className="max-w-screen-lg m-auto p-0 pt-2 pb-8">
            <div className="py-0 px-2">
                {Object.entries(paymentsByYear).map(([year, payments]) => <PaymentTable key={year} year={+year} payments={payments} />)}
            </div>
        </div>
    );
}
