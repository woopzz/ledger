import React from "react";

import { default as MaterialBackdrop } from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { PaymentContext } from "../context/PaymentContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const Backdrop: React.FC = () => {
  const classes = useStyles();

  const { payments } = React.useContext(PaymentContext);
  const open = payments.status === "loading";

  return (
    <div>
      <MaterialBackdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </MaterialBackdrop>
    </div>
  );
};

export default Backdrop;
