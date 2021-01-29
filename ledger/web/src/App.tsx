import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { PaymentContextProvider } from "./context/PaymentContextProvider";
import ControlPanel from "./components/ControlPanel";
import PaymentList from "./components/PaymentList";
import Message from "./components/Message";
import Backdrop from "./components/Backdrop";

// import logo from "./logo.svg";
// import "./App.css";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <CssBaseline />
      <PaymentContextProvider>
        <ControlPanel />
        <PaymentList />
        <Message />
        <Backdrop />
      </PaymentContextProvider>
    </div>
  );
};

export default App;
