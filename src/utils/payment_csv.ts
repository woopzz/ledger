import * as csv from 'jquery-csv';

import { FIELDS, createPayment } from '../store';
import type { TPayment } from '../store';
import * as fileUtils from './file';

const csvOptions: csv.TOptions = { separator: ';', delimiter: "'" };

export async function loadPayments(file: File): Promise<TPayment[]> {
    const isWin1251 = await fileUtils.isWindows1251(file);

    let csvString: string;
    if (isWin1251) {
        csvString = await fileUtils.getWindows1251Content(file);
    } else {
        csvString = await file.text();
    }

    const res = csv.toArrays(csvString, csvOptions) as string[][];
    if (res.length < 2 || res[0][0] !== 'ЄДРПОУ') {
        return [];
    }

    return res.slice(1).map(x => createPayment(x));
}

export function dumpPayments(payments: TPayment[]): string {
    const csvArrays = [];
    csvArrays.push(Object.keys(FIELDS));

    for (const payment of payments) {
        const line = [];
        for (const key of Object.values(FIELDS)) {
            line.push(payment[key]);
        }
        csvArrays.push(line);
    }

    return csv.fromArrays(csvArrays, csvOptions);
}
