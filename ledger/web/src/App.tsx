import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { PaymentContextProvider } from "./context";
import { Backdrop, ControlPanel, PaymentList, Message, Downloader } from "./components";

// import logo from "./logo.svg";
// import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
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
