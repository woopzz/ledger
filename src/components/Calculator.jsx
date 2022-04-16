import React from 'react';
import { useSelector } from 'react-redux';
import { floatRound } from 'MyUtils/calc';

const Calculator = () => {
    const [payments, selectedDocNums] = useSelector(state => [state.payments.list, state.payments.selectedDocNums]);
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

export default Calculator;
