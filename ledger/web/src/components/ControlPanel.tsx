import React from "react";
import { Payment, PaymentData } from "../types";
import { PaymentContext } from "../context";
import * as api from "../api";

const ControlPanel: React.FC = () => {
  const { payments, dispatch } = React.useContext(PaymentContext);

  const handleImport = function (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files && e.target.files[0];
    if (file === null || file === undefined) return;

    const formData = new FormData();
    formData.append("fstatement", file);

    dispatch({ type: "request" });
    api
      .sendFormData("http://localhost:5000/parsecsv", formData)
      .then((result: PaymentData[]) =>
        dispatch({ type: "loaded", list: result.map((x) => new Payment(x)) })
      )
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  const handleClick = () => {
    const data = JSON.stringify(payments.list.map((x) => x.data));

    dispatch({ type: "request" });
    api
      .sendJson("http://localhost:5000/save", data)
      .then((result: string) => dispatch({ type: "download", file: new Blob([result]) }))
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  return (
    <div className="control-panel">
      <input type="file" onChange={handleImport} />
      <button onClick={handleClick}>Save</button>
    </div>
  );
};

export default ControlPanel;
