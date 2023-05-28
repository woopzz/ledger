import { TCsvColumn, TPaymentField, TPayment } from './types';

export const FIELDS: Record<TCsvColumn, TPaymentField> = {
    'ЄДРПОУ': 'companyRegistry',
    'МФО': 'bankCode',
    'Рахунок': 'account',
    'Валюта': 'currency',

    'Номер документу': 'docNo',
    'Дата операції': 'dateStr',
    'МФО банку': 'agentBankCode',
    'Назва банку': 'agentBank',

    'Рахунок кореспондента': 'agentAccount',
    'ЄДРПОУ кореспондента': 'agentCompanyRegistry',
    'Кореспондент': 'agent',
    'Сума': 'amountStr',
    'Призначення платежу': 'note',
}

const getPaymentDate = (payment: TPayment): Date => {
    return new Date(payment.dateStr.split('.').reverse().join('-'));
}

/**
 * An object representation of a payment which comes from PrivatBank CSV row.
 */
export function createPayment(values: string[]): TPayment {
    const self = {} as TPayment;

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
    const date = getPaymentDate(self);
    self.year = date.getFullYear();

    // We order records by quarter.
    switch (date.getMonth()) {
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

export const sortPaymentsByDate = (payments: TPayment[], { reverse = false } = {}) => {
    const coef = reverse ? -1 : 1;
    return payments.sort((a, b) => coef * (getPaymentDate(a).getTime() - getPaymentDate(b).getTime()));
};
