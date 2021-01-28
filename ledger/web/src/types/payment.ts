export type Payment = {
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

export type PaymentState = {
  status: "success" | "error" | "loading";
  list: Payment[];
  msg: string;
};

export type PaymentAction =
  | { type: "request" }
  | { type: "loaded"; list: Payment[] }
  | { type: "error"; msg: string }
  | { type: "closeMsg" };

export type PaymentResponse = { ok: true; result: Payment[] } | { ok: false; msg: string };
