const { ipcRenderer } = require('electron');
const { loadPaymentsFromFile, savePaymentsToFile, getPaymentsHtml } = require('./payments');

ipcRenderer.on('open-csv-files', async function (ev, files) {
    await Promise.all(files.map((x) => loadPaymentsFromFile(x)));
    document.getElementById('payment-tables').innerHTML = getPaymentsHtml();
});

ipcRenderer.on('save-to-file', async function (ev, filePath) {
    savePaymentsToFile(filePath).then(() => alert('Успешно сохранено!'));
});

function actionLoadPayments () {
    ipcRenderer.send('run-open-csv-file-dialog');
}

function actionDumpPayments () {
    ipcRenderer.send('run-save-csv-file-dialog');
}

ipcRenderer.on('action-load-payments', actionLoadPayments);
ipcRenderer.on('action-dump-payments', actionDumpPayments);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button-import').addEventListener('click', actionLoadPayments);
    document.getElementById('button-export').addEventListener('click', actionDumpPayments);
});
