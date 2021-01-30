import { Payment } from "./types/payment";

export const joinPaymentLists = (fst: Payment[], snd: Payment[]): Payment[] => {
  const unitedList = fst.slice();
  const existedDocNumbers: string[] = unitedList.map((x) => x.docNo);

  for (let payment of snd) {
    if (!existedDocNumbers.includes(payment.docNo)) {
      unitedList.push(payment);
      existedDocNumbers.push(payment.docNo);
    }
  }

  // allowed date format: yyyy-mm-dd
  const makeDate = (repr: string): Date => new Date(repr.split(".").reverse().join("-"));
  unitedList.sort(
    (a: Payment, b: Payment) => makeDate(a.date).getTime() - makeDate(b.date).getTime()
  );

  return unitedList;
};
