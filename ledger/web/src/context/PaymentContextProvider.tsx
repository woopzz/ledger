import React from "react";
import { Payment, PaymentState, PaymentAction } from "../types/payment";

const initState: PaymentState = { status: "success", list: [], msg: "" };

const joinPaymentLists = (fst: Payment[], snd: Payment[]): Payment[] => {
  const unitedList = fst.slice();
  const existedDocNumbers: string[] = unitedList.map((x) => x.docNo);

  for (let payment of snd) {
    if (!existedDocNumbers.includes(payment.docNo)) {
      unitedList.push(payment);
      existedDocNumbers.push(payment.docNo);
    }
  }

  // allowed date format: yyyy-mm-dd
  const makeDate = (repr: string): Date => new Date(repr.split('.').reverse().join('-'));
  unitedList.sort((a: Payment, b: Payment) => makeDate(a.date).getTime() - makeDate(b.date).getTime());

  return unitedList;
};

const reducer = (state: PaymentState, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case "loaded":
      return { status: "success", list: joinPaymentLists(state.list, action.list), msg: "" };
    case "request":
      return {
        status: "loading",
        list: state.list,
        msg: "Loading the bank statement. Please wait!",
      };
    case "error":
      return { status: "error", list: state.list, msg: action.msg };
    case "closeMsg":
      return { ...state, msg: "" };
    case "download":
      return { status: "download", file: action.file, list: state.list, msg: state.msg };
  }
};

export const PaymentContext = React.createContext<{
  payments: PaymentState;
  dispatch: React.Dispatch<PaymentAction>;
}>({
  payments: initState,
  dispatch: () => null,
});

export const PaymentContextProvider: React.FC = ({ children }) => {
  const [payments, dispatch] = React.useReducer(reducer, initState);

  return (
    <PaymentContext.Provider value={{ payments, dispatch }}>{children}</PaymentContext.Provider>
  );
};
