import React from "react";
import { CircularProgress, Backdrop as MaterialBackdrop } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const Backdrop: React.FC<{show: boolean}> = ({show}) => {
  const classes = useStyles();

  if (!show) return null;

  return (
    <div>
      <MaterialBackdrop open className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </MaterialBackdrop>
    </div>
  );
};

export default Backdrop;
