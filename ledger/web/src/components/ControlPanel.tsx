import React from "react";

import { PaymentResponse, CSVResponse } from "../types/payment";
import { PaymentContext } from "../context/PaymentContextProvider";

const ControlPanel: React.FC = () => {
  const { payments, dispatch } = React.useContext(PaymentContext);

  const handleImport = function (e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.target?.files && e.target.files[0];
    if (file === null || file === undefined) return;

    const formData = new FormData();
    formData.append("fstatement", file);

    dispatch({ type: "request" });
    fetch("http://localhost:5000/parsecsv", { body: formData, method: "post" })
      .then(
        (response: Response): Promise<PaymentResponse> => {
          if (!response.ok) throw new Error(response.statusText);

          return response.json();
        }
      )
      .then((data: PaymentResponse) => {
        if (data.ok) {
          dispatch({ type: "loaded", list: data.result });
        } else {
          dispatch({ type: "error", msg: data.msg });
        }
      })
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const body = JSON.stringify(payments.list);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    dispatch({ type: "request" });
    fetch("http://localhost:5000/save", { body, headers, method: "post" })
      .then(
        (response: Response): Promise<CSVResponse> => {
          if (!response.ok) throw new Error(response.statusText);

          return response.json();
        }
      )
      .then((data: CSVResponse) => {
        if (data.ok) {
          console.log(data.result);
          dispatch({ type: "download", file: new Blob([data.result]) });
        } else {
          dispatch({ type: "error", msg: data.msg });
        }
      })
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
