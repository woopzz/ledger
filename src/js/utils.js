import csv from 'jquery-csv';

/**
 * (1) The keys equal to the header columns of PrivatBank CSV (in the same order).
 * (2) The values must be used to store corresponding data in Payment object.
 */
export const FIELDS = {
    'ЕГРПОУ': 'companyRegistry',
    'МФО': 'bankCode',
    'Счет': 'account',
    'Валюта': 'currency',

    'Номер документа': 'docNo',
    'Дата операции': 'dateStr',
    'МФО банка': 'agentBankCode',
    'Название банка': 'agentBank',

    'Счет корреспондента': 'agentAccount',
    'ЕГРПОУ корреспондента': 'agentCompanyRegistry',
    'Корреспондент': 'agent',
    'Сумма': 'amountStr',
    'Назначение платежа': 'note',
}

export async function isWindows1251(file) {
    const arrBuffer = await file.slice(0, 6).arrayBuffer();
    const intBuffer = new Uint8Array(arrBuffer);

    const expected = [197, 195, 208, 207, 206, 211];  // ЕГРПОУ
    for (let i = 0; i < expected.length; i++)
        if (intBuffer[i] !== expected[i])
            return false;

    return true;
}

export async function getWindows1251Content(file) {
    const arrBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder('windows-1251');
    return decoder.decode(arrBuffer);
}

export function loadFromCSVString(csvString) {
    const res = csv.toArrays(csvString, getCSVOptions());
    if (res.length > 1 && res[0][0] !== 'ЕГРПОУ') {
        const msg = 'Unexpected CSV data!';
        alert(msg);
        throw Error(msg);
    }
    return res.slice(1);
}

export function createCSVString(lines) {
    return csv.fromArrays(lines, getCSVOptions());
}

export function getPaymentsHtml(payments) {
    let htmlParts = [];

    const paymentsHierarchy = getPaymentsHierarchy(payments);
    for (const year of Object.keys(paymentsHierarchy).sort().reverse()) {
        const quarterBlocks = [];

        for (const quarter of Object.keys(paymentsHierarchy[year] || {}).sort()) {

            const paymentLines = [];
            for (const payment of (paymentsHierarchy[year][quarter] || []).sort()) {
                paymentLines.push(`
                    <tr>
                        <td class="payments-table__cell payments-table__cell_checkbox">
                            <input data-doc-no="${payment.docNo}" class="checkbox" type="checkbox">
                        </td>
                        <td class="payments-table__cell payments-table__cell_date">${payment.dateStr || ''}</td>
                        <td class="payments-table__cell">${payment.note || ''}</td>
                        <td class="payments-table__cell payments-table__cell_amount">${payment.amountStr || ''} ${payment.currency || ''}</td>
                    </tr>
                `);
            }

            quarterBlocks.push(`
                <tr>
                    <td colspan="4" class="payments-table__cell payments-table__cell_quarter">квартал ${quarter}</td>
                </tr>
                ${paymentLines.join('')}
            `);
        }

        htmlParts.push(`
            <table class="payments-table">
                <tr>
                    <td colspan="4" class="payments-table__cell payments-table__cell_year">${year}</td>
                </tr>
                ${quarterBlocks.join('')}
            </table>
        `);
    }

    return htmlParts.join('');
}

export function floatRound(number, places = 2) {
    return +(Math.round(number + "e+" + places) + "e-" + places);
}

// --------------------------------
// --------------------------------
// --------------------------------

/**
 * Build up a hierarchy: year > quarter > payments.
 */
function getPaymentsHierarchy(payments) {
    const res = {};

    for (const payment of payments) {
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

function getCSVOptions() {
    return { separator: ';', delimiter: "'" };
}
