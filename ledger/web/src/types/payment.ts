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

export class Payment {
  readonly data: PaymentData;
  readonly date: Date;
  readonly row: PaymentRow;

  constructor(data: PaymentData) {
    this.data = data;
    this.date = this.makeDate(data.date);
    this.row = this.makePaymentRow();
  }

  private makeDate(repr: PaymentData["date"]): Date {
    return new Date(repr.split(".").reverse().join("-"));
  }

  private makePaymentRow(): PaymentRow {
    return {
      id: this.data.docNo,
      date: this.data.date,
      amount: parseFloat(this.data.amount.replaceAll(" ", "")),
      collapsible: true,
      data: this.data,
    };
  }

  static join(fst: Payment[], snd: Payment[]): Payment[] {
    const unitedList = fst.slice();
    const existedDocNumbers: string[] = unitedList.map((x) => x.data.docNo);

    for (let payment of snd) {
      if (!existedDocNumbers.includes(payment.data.docNo)) {
        unitedList.push(payment);
        existedDocNumbers.push(payment.data.docNo);
      }
    }

    unitedList.sort((a, b) => a.date.getTime() - b.date.getTime());

    return unitedList;
  }

  static group(payments: Payment[]): PaymentRow[] {
    /* Keep in mind! The implementation assumes that the payment list is ordered previously. */
    if (!payments.length) return [];

    let result: PaymentRow[] = [];
    const today = new Date();

    let currentYear = payments[0].date.getFullYear();
    const lastYear = payments[payments.length - 1].date.getFullYear();
    for (let paymentIndex = 0; currentYear <= lastYear; currentYear++) {
      let yearAmount = 0;
      let quarterAmount = 0;

      for (let currentMonth = 1; currentMonth <= 12; currentMonth++) {
        let monthAmount = 0;

        while (paymentIndex < payments.length) {
          const payment = payments[paymentIndex];
          const month = payment.date.getMonth() + 1;
          const year = payment.date.getFullYear();
          if (month !== currentMonth || year !== currentYear) break;

          monthAmount += payments[paymentIndex].row.amount;
          quarterAmount += monthAmount;
          result.push(payment.row);
          paymentIndex++;
        }

        // Keep in mind! The month param in the constructor is a zero-based value.
        const nextMonthDate = new Date(currentYear, currentMonth, 1);

        if ([3, 6, 9, 12].includes(currentMonth)) {
          if (quarterAmount && today >= nextMonthDate) {
            const displayName = `${currentMonth / 3} кв. ${currentYear}`;
            result.push({
              id: displayName,
              date: displayName,
              amount: quarterAmount,
              collapsible: false,
            });
            quarterAmount = 0;
          }
        }

        if (monthAmount && today >= nextMonthDate) {
          const displayName = `${String(currentMonth).padStart(2, "0")}.${currentYear}`;
          result.push({
            id: displayName,
            date: displayName,
            amount: monthAmount,
            collapsible: false,
          });
          yearAmount += monthAmount;
        }
      }

      if (yearAmount && today >= new Date(currentYear + 1, 0, 1))
        result.push({
          id: String(currentYear),
          date: String(currentYear),
          amount: yearAmount,
          collapsible: false,
        });
    }

    return result;
  }
}

export type PaymentState =
  | {
      status: "success" | "error" | "loading";
      list: Payment[];
      msg: string;
    }
  | { status: "download"; file: Blob; list: Payment[]; msg: string };

export type PaymentAction =
  | { type: "request" }
  | { type: "loaded"; list: Payment[] }
  | { type: "error"; msg: string }
  | { type: "closeMsg" }
  | { type: "download"; file: Blob };

export type PaymentResponse = { ok: true; result: PaymentData[] } | { ok: false; msg: string };

export type CSVResponse = { ok: true; result: string } | { ok: false; msg: string };

export type PaymentRow =
  | {
      readonly id: Payment["data"]["docNo"];
      readonly date: Payment["data"]["date"];
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
