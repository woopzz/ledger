import events from './events';
import Payment from './models/payment';
import { addPayments, getPayments, getPaymentByDocNo } from './db';
import * as utils from './utils';

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
    if (await utils.isWindows1251(file)) {
        csvString = await utils.getWindows1251Content(file);
    } else {
        csvString = await file.text();
    }

    const paymentInfoItems = utils.loadFromCSVString(csvString);
    addPayments(paymentInfoItems.map(x => new Payment(x)));
});

document.addEventListener(events.PaymentsUpdated, function () {
    const payments = getPayments();
    document.getElementById('payment-tables').innerHTML = utils.getPaymentsHtml(payments);
})

document.addEventListener(events.ExportBtnClicked, function () {
    const payments = getPayments();
    if (payments.length < 1) {
        alert('Nothing to download!');
        return;
    }

    const csvArrays = [];
    csvArrays.push(Object.keys(utils.FIELDS));
    for (let payment of payments) {
        const line = [];
        for (let key of Object.values(utils.FIELDS))
            line.push(payment[key]);
        csvArrays.push(line);
    }

    const csvString = utils.createCSVString(csvArrays);
    const blob = new Blob([csvString], { type: 'text/csv' });
    const objectURL = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectURL;
    link.download = 'payments.csv';
    link.click();
    link.onclick = ev => window.URL.revokeObjectURL(objectURL);
});

document.addEventListener(events.CheckboxUpdated, function (ev) {
    const { docNo, coef } = ev.detail;
    const payment = getPaymentByDocNo(docNo);
    if (!payment) return;

    const totalNode = document.querySelector('[data-role="state-total"]');
    const vatNode = document.querySelector('[data-role="state-vat"]');
    const countNode = document.querySelector('[data-role="state-count"]');

    const total = +totalNode.textContent + coef * payment.amount
    totalNode.textContent = utils.floatRound(total);
    vatNode.textContent = utils.floatRound(total * 0.05);
    countNode.textContent = +countNode.textContent + coef;
});
