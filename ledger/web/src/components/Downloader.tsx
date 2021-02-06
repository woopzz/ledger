import React from "react";
import { Dialog, Button, makeStyles } from "@material-ui/core";
import { PaymentContext } from "../context";

const useStyles = makeStyles({
  link: {
    padding: "1em",
  },
});

const Downloader: React.FC = () => {
  const classes = useStyles();
  const { payments, dispatch } = React.useContext(PaymentContext);

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    dispatch({ type: "loaded", list: payments.list });
  };

  let dialog;
  if (payments.status === "download") {
    dialog = (
      <Dialog aria-labelledby="simple-dialog-title" open>
        <Button
          className={classes.link}
          href={window.URL.createObjectURL(payments.file)}
          download="payments.csv"
          onClick={handleOnClick}
        >
          Download your CSV
        </Button>
      </Dialog>
    );
  }

  return <div className="downloader">{dialog}</div>;
};

export default Downloader;
