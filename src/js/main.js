import events from './events';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onInit);
} else {
    onInit();
}

function onInit() {
    document.getElementById('button-import').addEventListener('click', () => document.dispatchEvent(new Event(events.ImportBtnClicked)));
    document.getElementById('button-export').addEventListener('click', () => document.dispatchEvent(new Event(events.ExportBtnClicked)));
}
