import React from "react";
import { useSelector } from 'react-redux';

import { getPaymentsHierarchy } from 'MyStore/payments/models';
import PaymentTable from 'MyComponents/PaymentTable';

const PaymentTableList = () => {
    const [payments, selectedDocNums] = useSelector(state => [state.payments.list, state.payments.selectedDocNums]);

    const paymentsHierarchy = getPaymentsHierarchy(payments);
    const years = Object.keys(paymentsHierarchy).sort().reverse();
    const paymentTables = years.map(year =>
        <PaymentTable key={year} year={year} paymentsByQuarters={paymentsHierarchy[year]} selectedDocNums={selectedDocNums} />
    );

    return (
        <div className="payments">
            <div className="payments__container">
                {paymentTables}
            </div>
        </div>
    );
}

export default PaymentTableList;
