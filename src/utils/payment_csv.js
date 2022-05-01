import csv from 'jquery-csv';

import { FIELDS, Payment } from 'MyStore/payments/models';
import * as fileUtils from 'MyUtils/file';

const csvOptions = { separator: ';', delimiter: "'" };

export async function loadPayments(file) {
    // ЕГРПОУ
    const isWin1251 = await fileUtils.isWindows1251(file, [197, 195, 208, 207, 206, 211]);

    let csvString;
    if (isWin1251) {
        csvString = await fileUtils.getWindows1251Content(file);
    } else {
        csvString = await file.text();
    }

    const res = csv.toArrays(csvString, csvOptions);
    if (res.length < 2 || res[0][0] !== 'ЕГРПОУ') {
        return;
    }

    return res.slice(1).map(x => new Payment(x));
}

export function dumpPayments(payments) {
    const csvArrays = [];
    csvArrays.push(Object.keys(FIELDS));

    for (const payment of payments) {
        const line = [];
        for (let key of Object.values(FIELDS))
            line.push(payment[key]);
        csvArrays.push(line);
    }

    return csv.fromArrays(csvArrays, csvOptions);
}