import * as React from "react";

import { getPaymentsHierarchy } from '../store/payments/models';
import PaymentTable from './PaymentTable';
import { useAppSelector } from '../hooks';
import { selectPayments } from '../store/payments/paymentSlice';

export const PaymentTableList: React.FC = () => {
    const payments = useAppSelector(selectPayments);
    const selectedDocNums = useAppSelector(state => state.payments.selectedDocNums);

    const paymentsHierarchy = getPaymentsHierarchy(payments);

    const paymentTables = Array.from(paymentsHierarchy.entries()).sort((a, b) => a[0] - b[0]).map(([year, paymentsByQuarter]) => (
        <PaymentTable key={year} year={year} paymentsByQuarters={paymentsByQuarter} selectedDocNums={selectedDocNums} />
    ));

    return (
        <div className="payments">
            <div className="payments__container">
                {paymentTables}
            </div>
        </div>
    );
}
