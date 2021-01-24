type Payment = {
  docNo: string; // Номер документа
  date: string; // Дата операции
  amount: number; // Сумма
  currency: string; // Валюта
  note: string; // Назначение платежа

  account: string; // Счет
  companyRegistry: string; // ЕГРПОУ
  bankCode: string; // МФО

  agent: string; // Корреспондент
  agentAccount: string; //Счет корреспондента
  agentCompanyRegistry: string; //ЕГРПОУ корреспондента
  agentBank: string; // Название банка
  agentBankCode: string; // МФО банка
};

export type PaymentsState =
  | { status: "empty" }
  | { status: "loading"; msg: string }
  | { status: "loaded"; list: Payment[] }
  | { status: "error"; msg: string };

export type PaymentsAction =
  | { type: "request" }
  | { type: "loaded"; list: Payment[] }
  | { type: "error"; msg: string };

export type PaymentsResponse = { ok: true; result: Payment[] } | { ok: false; msg: string };
