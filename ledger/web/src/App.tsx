import React from "react";
import PaymentsProvider from "./components/PaymentProvider";

// import logo from "./logo.svg";
import "./App.css";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <PaymentsProvider />
    </div>
  );
};

export default App;
