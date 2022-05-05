import * as React from 'react';
import { useSelector } from 'react-redux';
import { floatRound } from '../utils/calc';
import { TRootState } from 'MyStore/index';

export const Calculator: React.FC = () => {
    const payments = useSelector((state: TRootState) => state.payments.list);
    const selectedDocNums = useSelector((state: TRootState) => state.payments.selectedDocNums);

    const selectedPayments = payments.filter(x => selectedDocNums.includes(x.docNo));
    const totalSum = selectedPayments.reduce((acum, x) => acum + x.amount, 0);
    const taxSum = floatRound(totalSum * 0.05);

    return (
        <div className='state'>
            <div className="state__title">Выбрано <span>{selectedDocNums.length}</span> платежей:</div>
            <div>{totalSum.toFixed(2)} x 0.05 = {taxSum.toFixed(2)}</div>
        </div>
    );
}
