import { FC } from 'react';
import { floatRound } from '../utils/calc';
import { useAppSelector } from '../hooks';
import { selectMarkedPayments } from '../store/payments/paymentSlice';

export const Calculator: FC = () => {
    const markedPayments = useAppSelector(selectMarkedPayments);
    const totalSum = markedPayments.reduce((acum, x) => acum + x.amount, 0);
    const taxSum = floatRound(totalSum * 0.05);

    return (
        <div className='state'>
            <div className="state__title">Выбрано <span>{markedPayments.length}</span> платежей:</div>
            <div>{totalSum.toFixed(2)} x 0.05 = {taxSum.toFixed(2)}</div>
        </div>
    );
}
