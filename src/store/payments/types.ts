export enum PaymentsActions {
    APPEND,
    SELECT,
    DISCARD,
}

export type TQuarter = 1 | 2 | 3 | 4;
export type TGetFullYearReturnType = ReturnType<typeof Date.prototype.getFullYear>;

export type TCsvColumn = (
    'ЄДРПОУ' |
    'МФО' |
    'Рахунок' |
    'Валюта' |
    'Номер документа' |
    'Дата операции' |
    'МФО банку' |
    'Назва банку' |
    'Рахунок кореспондента' |
    'ЄДРПОУ кореспондента' |
    'Кореспондент' |
    'Сума' |
    'Призначення платежу'
)

export type TPaymentField = (
    'companyRegistry' |
    'bankCode' |
    'account' |
    'currency' |
    'docNo' |
    'dateStr' |
    'agentBankCode' |
    'agentBank' |
    'agentAccount' |
    'agentCompanyRegistry' |
    'agent' |
    'amountStr' |
    'note'
)

type TCsvPayment = Record<TPaymentField, string>;

export type TPayment = TCsvPayment & {
    year: number;
    quarter: TQuarter;
    amount: number;
}
