const { ipcRenderer } = require('electron');
const { loadPaymentsFromFile, getPaymentsHtml } = require('./payments');

ipcRenderer.on('selected-csv-files', async function (ev, files) {
    await Promise.all(files.map(() => loadPaymentsFromFile()));
    document.getElementById('payment-tables').innerHTML = getPaymentsHtml();
});

function actionLoadPayments () {
    ipcRenderer.send('open-csv-file-dialog');
}

function actionDumpPayments () {
    alert('dump');
}

ipcRenderer.on('action-load-payments', actionLoadPayments);
ipcRenderer.on('action-dump-payments', actionDumpPayments);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button-import').addEventListener('click', actionLoadPayments);
    document.getElementById('button-export').addEventListener('click', actionDumpPayments);
});
