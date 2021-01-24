import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import { PaymentsState, PaymentsAction, PaymentsResponse } from "./types/payment";

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

const App: React.FC = () => {
  const [payments, dispatch] = React.useReducer(paymentsReducer, { status: "empty" });

  const onchangeInputImport = function (e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.target?.files && e.target.files[0];
    if (file === null) return;

    const formData = new FormData();
    formData.append("fstatement", file);

    const parseResponse = (response: Response): Promise<PaymentsResponse> => {
      if (!response.ok) throw new Error(response.statusText);

      return response.json();
    };

    const parseData = (data: PaymentsResponse) => {
      if (data.ok) {
        dispatch({ type: "loaded", list: data.result });
      } else {
        dispatch({type: "error", msg: data.msg});
      }
    }

    dispatch({ type: "request" });
    fetch("http://localhost:5000/parsecsv", { body: formData, method: "post" })
      .then(parseResponse)
      .then(parseData)
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  let contentJsx;
  if (payments.status === "loaded") {
    contentJsx = (
      <ul>
        {payments.list.map((el) => (
          <li key={el.docNo}>{el.amount}</li>
        ))}
      </ul>
    );
  } else {
    contentJsx = (
      <>
        {payments.status === "error" && <div>You have an error: {payments.msg}</div>}
        {payments.status === "loading" && <div>{payments.msg}</div>}
        <div>You should load a bank statement!</div>
        <input id="input-import" type="file" onChange={onchangeInputImport} />
      </>
    );
  }

  return <div className="App">{contentJsx}</div>;
};

export default App;
