const csv = require('jquery-csv');
// const fs = require('fs');
// const iconv = require('iconv');
// const { execSync } = require('child_process');

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


export function loadFromCSVString(csvString) {
    const res = csv.toArrays(csvString, { separator: ';', delimeter: '"' });
    if (res.length > 1 && res[0][0] !== 'ЕГРПОУ') {
        const msg = 'Unexpected CSV data!';
        alert(msg);
        throw Error(msg);
    }
    return res.slice(1);
}

export function createCSVString(lines) {
    return csv.fromArrays(lines, { separator: ';', delimeter: '"' });
}

export function getPaymentsHtml(payments) {
    let htmlParts = [];

    const paymentsHierarchy = getPaymentsHierarchy(payments);
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

// exports.getFileContent = function (filePath) {
//     // Get the file content.
//     let data = fs.readFileSync(filePath);

//     // Check file encoding. If it's UTF-8, that's what we need.
//     const fileCommandShellOutput = execSync('file -bi ' + filePath, { encoding: 'utf8' });
//     if (fileCommandShellOutput.includes('charset=utf-8')) {
//         return data;
//     }

//     // Otherwise we assume that the file has cp1251 encoding.
//     try {
//         return iconv.Iconv('windows-1251', 'utf8').convert(data);
//     } catch {
//         throw Error("It's definitely not windows-1251.")
//     }
// }

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

function floatRound(number, places = 2) {
    return +(Math.round(number + "e+" + places) + "e-" + places);
}
