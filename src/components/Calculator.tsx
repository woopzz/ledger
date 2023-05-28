import { floatRound } from '../utils/calc';
import { useAppSelector } from '../hooks';
import { selectMarkedPayments } from '../store';

const Calculator = () => {
    const markedPayments = useAppSelector(selectMarkedPayments);
    const totalSum = markedPayments.reduce((acum, x) => acum + x.amount, 0);
    const taxSum = floatRound(totalSum * 0.05);

    return (
        <div className='text-lg text-gray-100'>
            <div className="font-medium">Вибрано <span>{markedPayments.length}</span> платежів:</div>
            <div>{totalSum.toFixed(2)} x 0.05 = {taxSum.toFixed(2)}</div>
        </div>
    );
}

export default Calculator;
