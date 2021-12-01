const csvParser = require('csv-parse');
const csvWriter = require('csv-writer');

const { floatRound, getFileContent } = require('./utils');

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
 * payment doc no => payment info
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

    // docNo is used to indentify a payment, so it's required.
    if (!self.docNo) {
        const msg = 'A payment does not have a number!';
        alert(msg);
        throw Error(msg);
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
 * Build up a hierarchy: year > quarter > payments.
 */
function getPaymentsHierarchy () {
    const res = {};

    for (const payment of Object.values(payments)) {
        const year = payment.date.getFullYear();
        const quarter = payment.quarter;

        if (res[year] === undefined) {
            res[year] = { [quarter]: [payment] };
        } else {
            if (res[year][quarter] == undefined) {
                res[year][quarter] = [payment];
            } else {
                res[year][quarter].push(payment);
            }
        }
    }

    return res;
}

/**
 * Transform CSV rows to Payments objects and store it.
 */
function loadPaymentsFromFile (filePath) {
    return new Promise((resolve, reject) => {
        const data = getFileContent(filePath);

        /**
         * Set up a csvParser instance.
         */
        csvParser(data, { delimiter: ';', from_line: 2, quote: "'"})

        /**
         * Transform every CSV row to a Payment object.
         * Then save the object in a proper place depends on record's date.
         */
        .on('data', row => {
            const payment = new Payment(row);
            payments[payment.docNo] = payment;
        })

        .on('end', () => {
            resolve();
        });
    });
}

function savePaymentsToFile (filePath) {
    const header = Object.entries(FIELDS).map(([k, v]) => ({id: v, title: k}));

    const data = Object.values(payments).sort((a, b) => a.date > b.date ? 1 : -1).map(payment => {
        const res = {};
        for (const key of Object.values(FIELDS)) {
            res[key] = payment[key];
        }
        return res;
    });

    const writer = csvWriter.createObjectCsvWriter({
        path: filePath,
        header: header,
        fieldDelimiter: ';'
    })

    return writer.writeRecords(data);
}

function getPaymentsHtml () {
    let htmlParts = [];

    const paymentsHierarchy = getPaymentsHierarchy();
    for (const year of Object.keys(paymentsHierarchy).sort().reverse()) {
        let annualTotal = 0.0;
        const quarterBlocks = [];

        for (const quarter of Object.keys(paymentsHierarchy[year] || {}).sort()) {
            let quarterTotal = 0.0;

            const paymentLines = [];
            for (const payment of (paymentsHierarchy[year][quarter] || []).sort()) {
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
    savePaymentsToFile,
    getPaymentsHtml
}
