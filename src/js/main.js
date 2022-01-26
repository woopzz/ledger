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
}
