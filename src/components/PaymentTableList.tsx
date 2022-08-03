import * as React from "react";

import PaymentTable from './PaymentTable';
import { useAppSelector } from '../hooks';
import { selectPayments } from '../store/payments/paymentSlice';
import { groupBy } from 'lodash';

export const PaymentTableList: React.FC = () => {
    const payments = useAppSelector(selectPayments);
    const paymentsByYear = groupBy(payments, 'year');
    return (
        <div className="payments">
            <div className="payments__container">
                {Object.entries(paymentsByYear).map(([year, payments]) => <PaymentTable key={year} year={+year} payments={payments} />)}
            </div>
        </div>
    );
}
