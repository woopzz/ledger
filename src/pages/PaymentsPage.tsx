import { useRef, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addPayments, selectPayments } from '../store';
import { dumpPayments, loadPayments } from '../utils/payment_csv';
import Calculator from '../components/Calculator';
import PaymentTableList from '../components/PaymentTableList';
import { useErrorBoundary } from 'react-error-boundary';

const PaymentsPage = () => {
    const inputEl = useRef<HTMLInputElement>(null);
    const payments = useAppSelector(selectPayments);
    const dispatch = useAppDispatch();
    const { showBoundary } = useErrorBoundary();

    const onInputChange = async (ev: ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        if (files !== null && files.length > 0) {
            try {
                const payments = await loadPayments(files[0]);
                dispatch(addPayments(payments));
            } catch (error) {
                showBoundary(error);
            }
        }
    }

    const onImportBtnClick = () => inputEl.current?.click();

    const onExportBtnClick = () => {
        if (payments.length < 1) {
            alert('Немає платежів!');
            return;
        }
        try {
            const csvString = dumpPayments(payments);
            const blob = new Blob([csvString], { type: 'text/csv' });
            const objectURL = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = objectURL;
            link.download = 'payments.csv';
            link.click();
            link.onclick = () => window.URL.revokeObjectURL(objectURL);
        } catch (error) {
            showBoundary(error);
        }
    }

    return (
        <>
            <div className="px-0 py-6 sticky top-0 bg-gray-600 shadow-md">
                <div className="max-w-screen-lg mx-auto my-0 px-2 flex items-center">
                    <input onChange={onInputChange} ref={inputEl} className="hidden" type="file" />
                    <div onClick={onImportBtnClick} className="action-button">Імпорт</div>
                    <div onClick={onExportBtnClick} className="action-button">Експорт</div>
                    <Calculator />
                </div>
            </div>
            <PaymentTableList />
        </>
    );
};

export default PaymentsPage;
