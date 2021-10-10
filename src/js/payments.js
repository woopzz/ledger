const fs = require('fs');
const csvParser = require('csv-parse');
const { contextBridge, ipcRenderer } = require('electron');
const { floatRound } = require('./utils');

/**
 * (1) The keys equal to the header columns of PrivatBank CSV (in the same order).
 * (2) The values must be used to store corresponding data in Payment object.
 */
const FIELDS = {
    'ЕГРПОУ': 'companyRegistry',
    'МФО': 'bankCode',
    'Счет': 'account',
    'Валюта': 'currency',

    'Номер документа': 'docNo',
    'Дата операции': 'dateStr',
    'МФО банка': 'agentBankCode',
    'Название банка':  'agentBank',

    'Счет корреспондента': 'agentAccount',
    'ЕГРПОУ корреспондента': 'agentCompanyRegistry',
    'Корреспондент': 'agent',
    'Сумма': 'amountStr',
    'Назначение платежа': 'note',
}

/**
 * A structure of payment objects from CSV files.
 */
const payments = {};

/**
 * An object representation of a payment which comes from PrivatBank CSV row.
 */
function Payment (values) {
    const self = {};

    const techNames = Object.values(FIELDS);
    for (let i = 0; i < techNames.length; i++) {
        self[techNames[i]] = values[i];
    }

    // We need a Date object to order records by date.
    self.date = new Date(self.dateStr.split(".").reverse().join("-"));

    // We order records by quarter.
    switch (self.date.getMonth()) {
        case 0: case 1: case 2:
            self.quarter = 1;
            break;
        case 3: case 4: case 5:
            self.quarter = 2;
            break;
        case 6: case 7: case 8:
            self.quarter = 3;
            break;
        case 9: case 10: case 11:
            self.quarter = 4;
            break;
    }

    // We add amounts, so we need the Number type to do it properly.
    self.amount = parseFloat(self.amountStr.replaceAll(" ", ""));

    return self;
}

/**
 * Transform CSV rows to Payments objects and store it.
 */
function loadPaymentsFromFile () {
    return new Promise((resolve, reject) => {

        fs.createReadStream('./payments.csv')

        /**
         * Set up a csvParser instance.
         */
        .pipe(csvParser({ delimiter: ';', from_line: 2 }))

        /**
         * Transform every CSV row to a Payment object.
         * Then save the object in a proper place depends on record's date.
         */
        .on('data', row => {
            const payment = new Payment(row);

            const year = payment.date.getFullYear();
            const quarter = payment.quarter;
            const month = payment.date.getMonth() + 1;  // a zero-based value

            // Build up a hierarchy: year > quarter > payments.
            if (payments[year] === undefined) {
                payments[year] = { [quarter]: [payment] };
            } else {
                if (payments[year][quarter] == undefined) {
                    payments[year][quarter] = [payment];
                } else {
                    payments[year][quarter].push(payment);
                }
            }
        })

        .on('end', () => {
            resolve();
        });
    });
}

function getPaymentsHtml () {
    let htmlParts = [];

    for (const year of Object.keys(payments).sort().reverse()) {
        let annualTotal = 0.0;
        const quarterBlocks = [];

        for (const quarter of Object.keys(payments[year] || {}).sort()) {
            let quarterTotal = 0.0;

            const paymentLines = [];
            for (const payment of (payments[year][quarter] || []).sort()) {
                quarterTotal += payment.amount;
                paymentLines.push(`
                    <tr>
                        <td class="payment-table-item">${payment.dateStr || ''}</td>
                        <td class="payment-table-item">${payment.note || ''}</td>
                        <td class="payment-table-item text-align_right">${payment.amountStr || ''} ${payment.currency || ''}</td>
                    </tr>
                `);
            }

            annualTotal += quarterTotal;
            quarterBlocks.push(`
                <tr>
                    <td class="payment-table-item payment-table-item_quarter font-title-2">квартал ${quarter}</td>
                    <td class="payment-table-item payment-table-item_quarter text-align_right font-title-2" colspan="2">
                        ${quarterTotal} (x 0.05 = ${floatRound(quarterTotal * 0.05)})
                    </td>
                </tr>
                ${paymentLines.join('')}
            `);
        }

        htmlParts.push(`
            <table class="payment-table">
                <tr>
                    <td class="payment-table-item payment-table-item_year font-title">${year}</td>
                    <td class="payment-table-item payment-table-item_year text-align_right font-title-2" colspan="2">
                        ${annualTotal} (x 0.05 = ${floatRound(annualTotal * 0.05)})
                    </td>
                </tr>
                ${quarterBlocks.join('')}
            </table>
        `);
    }

    return htmlParts.join('');
}

module.exports =  {
    loadPaymentsFromFile,
    getPaymentsHtml
}
