import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";

import { PaymentContextProvider } from "./context";
import { Backdrop, ControlPanel, PaymentList, Message, Downloader } from "./components";

const useStyles = makeStyles({
  app: {
    maxWidth: "1140px",
    margin: "10px auto",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <CssBaseline />
      <PaymentContextProvider>
        <ControlPanel />
        <PaymentList />
        <Message />
        <Backdrop />
        <Downloader />
      </PaymentContextProvider>
    </div>
  );
};

export default App;
