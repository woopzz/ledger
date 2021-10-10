const { ipcRenderer } = require('electron');
const { loadPaymentsFromFile, getPaymentsHtml } = require('./payments');

async function actionLoadPayments () {
    await loadPaymentsFromFile();
    document.getElementById('payment-tables').innerHTML = getPaymentsHtml();
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
