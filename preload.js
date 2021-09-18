const fs = require('fs');
const csvParser = require('csv-parse');

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
    'Дата операции': 'date',
    'МФО банка': 'agentBankCode',
    'Название банка':  'agentBank',

    'Счет корреспондента': 'agentAccount',
    'ЕГРПОУ корреспондента': 'agentCompanyRegistry',
    'Корреспондент': 'agent',
    'Сумма': 'amount',
    'Назначение платежа': 'note',
}

/**
 * An object representation of a payment which comes from a PrivatBank CSV row.
 */
function Payment (values) {
    const self = {};

    const techNames = Object.values(FIELDS);
    for (let i = 0; i < techNames.length; i++) {
        self[techNames[i]] = values[i];
    }

    // We need a Date object to order records by date.
    self.date = new Date(self.date.split(".").reverse().join("-"));

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
    self.amount = parseFloat(self.amount.replaceAll(" ", ""));

    return self;
}

/**
 * Get data from payments.csv (in the same folder with this JS file).
 * Then parse it and display it on the screen.
 */
function loadPayments () {
    const data = {};

    fs.createReadStream('./payments.csv')

        /**
         * Set up csvParser.
         */
        .pipe(csvParser({ delimiter: ';', from_line: 2 }))

        /**
         * Transform every CSV row into a Payment object.
         * Then save the object in a proper place depends on record's date.
         */
        .on('data', row => {
            const payment = new Payment(row);

            const year = payment.date.getFullYear();
            const quarter = payment.quarter;
            const month = payment.date.getMonth() + 1;  // a zero-based value

            // Build up a hierarchy: year > quarter > month > payments.
            if (data[year] === undefined) {
                data[year] = { [quarter]: { [month]: [payment] } };
            } else {
                if (data[year][quarter] == undefined) {
                    data[year][quarter] = { [month]: [payment] };
                } else {
                    if (!Array.isArray(data[year][quarter][month])) {
                        data[year][quarter][month] = [payment];
                    } else {
                        data[year][quarter][month].push(payment);
                    }
                }
            }
        })

        /**
         * Display data on the screen, when all rows have been processed.
         */
        .on('end', () => {
            // console.log(data);
            for (const year of Object.keys(data).sort()) {
                document.body.insertAdjacentHTML('beforeend', `<h2>${year}</h2>`);

                for (const quarter of Object.keys(data[year]).sort()) {
                    document.body.insertAdjacentHTML('beforeend', `<h3>-- ${quarter} quarter</h3>`);

                    for (const month of Object.keys(data[year][quarter]).sort()) {
                        document.body.insertAdjacentHTML('beforeend', `<h4>------ ${month} month</h4>`);

                        for (const payment of data[year][quarter][month]) {
                            document.body.insertAdjacentHTML('beforeend', `<p>---------- ${payment.amount}</p>`);
                        }
                    }
                }
            }
        });
}

window.addEventListener('DOMContentLoaded', loadPayments);
