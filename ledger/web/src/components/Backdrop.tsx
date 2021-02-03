import React from "react";
import { CircularProgress, Backdrop as MaterialBackdrop } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { PaymentContext } from "../context";

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
