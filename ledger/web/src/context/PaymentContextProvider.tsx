import React from "react";
import { PaymentState, PaymentAction, Payment } from "../types";

const initState: PaymentState = { status: "success", list: [], msg: "" };

const reducer = (state: PaymentState, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case "loaded":
      return { status: "success", list: Payment.join(state.list, action.list), msg: "" };
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
