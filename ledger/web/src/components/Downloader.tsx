import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

import { PaymentContext } from "../context/PaymentContextProvider";

const useStyles = makeStyles({
  link: {
    padding: '1em',
  }
});

const Downloader: React.FC = () => {
  const classes = useStyles();
  const { payments, dispatch } = React.useContext(PaymentContext);

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    dispatch({'type': 'loaded', list: payments.list});
  }

  let dialog;
  if (payments.status === "download") {
    dialog = (
      <Dialog aria-labelledby="simple-dialog-title" open>
        <Button
          color="primary"
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
