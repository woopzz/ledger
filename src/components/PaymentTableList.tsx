import * as React from "react";
import { useSelector } from 'react-redux';

import { getPaymentsHierarchy } from 'MyStore/payments/models';
import PaymentTable from 'MyComponents/PaymentTable';
import { TRootState } from 'MyStore/index';

export const PaymentTableList: React.FC = () => {
    const payments = useSelector((state: TRootState) => state.payments.list);
    const selectedDocNums = useSelector((state: TRootState) => state.payments.selectedDocNums);

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
