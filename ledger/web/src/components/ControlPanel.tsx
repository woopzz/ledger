import React from "react";

import { PaymentResponse } from "../types/payment";
import { PaymentContext } from "../context/PaymentContextProvider";

const ControlPanel: React.FC = () => {
  const { dispatch } = React.useContext(PaymentContext);

  const onchangeInputImport = function (e: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <div className="control-panel">
      <input id="input-import" type="file" onChange={onchangeInputImport} />
    </div>
  );
};

export default ControlPanel;
