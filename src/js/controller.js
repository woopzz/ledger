import events from './events';
import Payment from './models/payment';
import { addPayments, getPayments } from './db';
import { FIELDS, isWindows1251, getWindows1251Content, loadFromCSVString, createCSVString, getPaymentsHtml } from './utils';

document.addEventListener(events.ImportBtnClicked, function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = ev => {
        const file = ev.target.files[0];
        const newEvent = new CustomEvent(events.FileSelected, { detail: file });
        document.dispatchEvent(newEvent);
    }
});

document.addEventListener(events.FileSelected, async function (ev) {
    const file = ev.detail;
    if (!file) return;

    let csvString;
    if (await isWindows1251(file)) {
        csvString = await getWindows1251Content(file);
    } else {
        csvString = await file.text();
    }

    const paymentInfoItems = loadFromCSVString(csvString);
    addPayments(paymentInfoItems.map(x => new Payment(x)));
});

document.addEventListener(events.PaymentsUpdated, function () {
    const payments = getPayments();
    document.getElementById('payment-tables').innerHTML = getPaymentsHtml(payments);
})

document.addEventListener(events.ExportBtnClicked, function () {
    const payments = getPayments();
    if (payments.length < 1) {
        alert('Nothing to download!');
        return;
    }

    const csvArrays = [];
    csvArrays.push(Object.keys(FIELDS));
    for (let payment of payments) {
        const line = [];
        for (let key of Object.values(FIELDS))
            line.push(payment[key]);
        csvArrays.push(line);
    }

    const csvString = createCSVString(csvArrays);
    const blob = new Blob([csvString], { type: 'text/csv' });
    const objectURL = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectURL;
    link.download = 'payments.csv';
    link.click();
    link.onclick = ev => window.URL.revokeObjectURL(objectURL);
});