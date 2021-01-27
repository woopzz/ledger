import React from "react";
import PaymentsProvider from "./components/PaymentProvider";
import CssBaseline from '@material-ui/core/CssBaseline';

// import logo from "./logo.svg";
import "./App.css";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <CssBaseline />
      <PaymentsProvider />
    </div>
  );
};

export default App;
