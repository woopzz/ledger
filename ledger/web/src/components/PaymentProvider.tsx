import React from "react";
import { PaymentsState, PaymentsAction, PaymentsResponse } from "../types/payment";
import PaymentList from "./PaymentList";

const paymentsReducer = function (state: PaymentsState, action: PaymentsAction): PaymentsState {
  switch (action.type) {
    case "request":
      return { status: "loading", msg: "Loading the bank statement. Please wait!" };
    case "loaded":
      return { status: "loaded", list: action.list };
    case "error":
      return { status: "error", msg: action.msg };
  }
};

const PaymentsProvider: React.FC = () => {
  const [payments, dispatch] = React.useReducer(paymentsReducer, { status: "empty" });

  const onchangeInputImport = function (e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.target?.files && e.target.files[0];
    if (file === null) return;

    const formData = new FormData();
    formData.append("fstatement", file);

    dispatch({ type: "request" });
    fetch("http://localhost:5000/parsecsv", { body: formData, method: "post" })
      .then(
        (response: Response): Promise<PaymentsResponse> => {
          if (!response.ok) throw new Error(response.statusText);

          return response.json();
        }
      )
      .then((data: PaymentsResponse) => {
        if (data.ok) {
          dispatch({ type: "loaded", list: data.result });
        } else {
          dispatch({ type: "error", msg: data.msg });
        }
      })
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  let error, loadingMenu, paymentList;
  if (payments.status === "error") {
    error = <div>You have an error: {payments.msg}</div>;
  }

  if (payments.status === "loaded") {
    paymentList = <PaymentList payments={payments.list} />;
  } else {
    loadingMenu = (
      <>
        <div>You should load a bank statement!</div>
        <input id="input-import" type="file" onChange={onchangeInputImport} />
      </>
    );
  }

  return (
    <>
      {error}
      {paymentList}
      {loadingMenu}
    </>
  );
};

export default PaymentsProvider;
