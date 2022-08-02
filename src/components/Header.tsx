import * as React from 'react';

import { Calculator } from './Calculator';
import { loadPayments, dumpPayments } from '../utils/payment_csv';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addPayments, selectPayments } from '../store/payments/paymentSlice';

export const Header: React.FC = () => {
    const inputEl = React.useRef<HTMLInputElement>(null);
    const payments = useAppSelector(selectPayments);
    const dispatch = useAppDispatch();

    const onInputChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        if (files !== null && files.length > 0) {
            const payments = await loadPayments(files[0]);
            dispatch(addPayments(payments));
        }
    }

    const onImportBtnClick = () => inputEl.current?.click();

    const onExportBtnClick = () => {
        if (payments.length < 1) {
            alert('Nothing to download!');
            return;
        }

        const csvString = dumpPayments(payments);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const objectURL = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = objectURL;
        link.download = 'payments.csv';
        link.click();
        link.onclick = () => window.URL.revokeObjectURL(objectURL);
    }

    return (
        <div className="header">
            <div className="header__container">
                <input onChange={onInputChange} ref={inputEl} className="hidden" type="file" />
                <div onClick={onImportBtnClick} className="header__button">Импорт</div>
                <div onClick={onExportBtnClick} className="header__button">Экспорт</div>
                <Calculator />
            </div>
        </div>
    );
}
