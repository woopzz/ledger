export type PaymentData = {
  readonly docNo: string; // Номер документа
  readonly date: string; // Дата операции
  readonly amount: string; // Сумма
  readonly currency: string; // Валюта
  readonly note: string; // Назначение платежа

  readonly account: string; // Счет
  readonly companyRegistry: string; // ЕГРПОУ
  readonly bankCode: string; // МФО

  readonly agent: string; // Корреспондент
  readonly agentAccount: string; //Счет корреспондента
  readonly agentCompanyRegistry: string; //ЕГРПОУ корреспондента
  readonly agentBank: string; // Название банка
  readonly agentBankCode: string; // МФО банка
};

export type PaymentTableInfo =
  | {
      readonly id: string;
      readonly date: string;
      readonly amount: number;
      readonly collapsible: true;
      readonly data: PaymentData;
    }
  | {
      readonly id: string;
      readonly date: string;
      readonly amount: number;
      readonly collapsible: false;
    };
