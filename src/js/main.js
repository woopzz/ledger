import events from './events';

import '../css/main.css';
import '../css/header.css';
import '../css/state.css';
import '../css/payments.css';
import '../css/payments-table.css';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onInit);
} else {
    onInit();
}

function onInit() {
    document.getElementById('button-import').addEventListener('click', () => document.dispatchEvent(new Event(events.ImportBtnClicked)));
    document.getElementById('button-export').addEventListener('click', () => document.dispatchEvent(new Event(events.ExportBtnClicked)));
    document.addEventListener('click', e => {
        const target = e.target;
        const docNo = target.dataset.docNo;
        if (docNo) {
            const coef = target.checked ? 1 : -1;
            const ev = new CustomEvent(events.CheckboxUpdated, { detail: { docNo, coef } });
            document.dispatchEvent(ev);
        }
    });
}
