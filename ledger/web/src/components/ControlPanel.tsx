import React from "react";
import { Toolbar, Button, Icon, makeStyles } from "@material-ui/core";

import { Payment, PaymentData } from "../types";
import { PaymentContext } from "../context";
import * as api from "../api";

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "center",
  },
});

const ControlPanel: React.FC = () => {
  const { payments, dispatch } = React.useContext(PaymentContext);
  const classes = useStyles();
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleImportChange = function (e: React.ChangeEvent<HTMLInputElement>) {
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

  const handleImportClick = () => inputFileRef.current?.click();

  const handleSaveClick = () => {
    const data = JSON.stringify(payments.list.map((x) => x.data));

    dispatch({ type: "request" });
    api
      .sendJson("http://localhost:5000/save", data)
      .then((result: string) => dispatch({ type: "download", file: new Blob([result]) }))
      .catch((error: Error) => dispatch({ type: "error", msg: error.message }));
  };

  return (
    <Toolbar className={classes.toolbar}>
      <input ref={inputFileRef} hidden type="file" onChange={handleImportChange} />
      <Button startIcon={<Icon>file_upload</Icon>} onClick={handleImportClick}>
        Импорт
      </Button>
      <Button startIcon={<Icon>file_download</Icon>} onClick={handleSaveClick}>
        Экспорт
      </Button>
    </Toolbar>
  );
};

export default ControlPanel;
