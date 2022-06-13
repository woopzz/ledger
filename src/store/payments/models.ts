import { TCsvColumn, TPaymentField, TPayment, TPaymentsHierarchy } from './types';

export const FIELDS: Record<TCsvColumn, TPaymentField> = {
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

/**
 * An object representation of a payment which comes from PrivatBank CSV row.
 *
 * TODO: Still don't know how to provide proper types to create a payment from the input file.
 */
export function createPayment(values: string[]): TPayment {
    const self: TPayment = {
        'companyRegistry': '',
        'bankCode': '',
        'account': '',
        'currency': '',
        'docNo': '',
        'dateStr': '',
        'agentBankCode': '',
        'agentBank': '',
        'agentAccount': '',
        'agentCompanyRegistry': '',
        'agent': '',
        'amountStr': '',
        'note': '',
        date: new Date(),
        quarter: 1,
        amount: 0.0
    };

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
    self.date = new Date(self.dateStr.split('.').reverse().join('-'));

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
    self.amount = parseFloat(self.amountStr.replace(/ /g, ''));

    return self;
}

/**
 * Build up a hierarchy: year > quarter > payments.
 */
export const getPaymentsHierarchy = (payments: TPayment[]): TPaymentsHierarchy => {
    const res: TPaymentsHierarchy = new Map();

    for (const payment of payments) {
        const year = payment.date.getFullYear();
        const quarter = payment.quarter;

        const yearInMap = res.get(year);
        const quarterInMap = yearInMap?.get(quarter);

        if (quarterInMap !== undefined) {
            quarterInMap.push(payment);
        } else if (yearInMap !== undefined) {
            yearInMap.set(quarter, [payment]);
        } else {
            res.set(year, new Map([[quarter, [payment]]]));
        }
    }

    return res;
}
