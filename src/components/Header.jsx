import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calculator from 'MyComponents/Calculator';
import { loadPayments, dumpPayments } from 'MyUtils/payment_csv';
import { appendPayments } from 'MyStore/payments/actions';

function Header() {
    const inputEl = useRef(null);
    const payments = useSelector(state => state.payments.list);
    const dispatch = useDispatch();

    const onInputChange = async ev => {
        const file = ev.target.files[0];
        if (file) {
            const payments = await loadPayments(file);
            dispatch(appendPayments(payments));
        }
    }

    const onImportBtnClick = () => inputEl.current.click();

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
        link.onclick = ev => window.URL.revokeObjectURL(objectURL);
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

export default Header;
