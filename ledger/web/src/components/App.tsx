import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import * as api from "../api";
import { Payment, PaymentData } from "../types/payment";

import Message from "./Message";
import ControlPanel from "./ControlPanel";
import Downloader from "./Downloader";
import PaymentTable from "./PaymentTable";
import Backdrop from "./Backdrop";

type AppProps = {};

type AppState = {
  payments: Payment[];
  error: string;
  csvBlob: null | Blob;
  showBackdrop: boolean;
};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    payments: [],
    error: "",
    csvBlob: null,
    showBackdrop: false,
  };

  render() {
    const parseCSV = this.parseCSV.bind(this);
    const exportPayments = this.exportPayments.bind(this);
    const dismissMessage = this.dismissMessage.bind(this);
    const doAfterDownload = this.doAfterDownload.bind(this);

    return (
      <div className="app">
        <CssBaseline />
        <ControlPanel importHandler={parseCSV} exportHandler={exportPayments} />
        <PaymentTable payments={this.state.payments} />
        <Downloader blob={this.state.csvBlob} doAfterDownload={doAfterDownload} />
        <Message text={this.state.error} onDismiss={dismissMessage} />
        <Backdrop show={this.state.showBackdrop} />
      </div>
    );
  }

  parseCSV(file: File) {
    const formData = new FormData();
    formData.append("fstatement", file);

    this.setState({ showBackdrop: true });
    api
      .sendFormData("http://localhost:5000/parsecsv", formData)
      .then((result: PaymentData[]) =>
        this.setState({ payments: result.map((x) => new Payment(x)) })
      )
      .catch((error: Error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ showBackdrop: false }));
  }

  exportPayments() {
    this.setState({ showBackdrop: true });
    const data = JSON.stringify(this.state.payments.map((x) => x.data));
    api
      .sendJson("http://localhost:5000/save", data)
      .then((result: string) => this.setState({ csvBlob: new Blob([result]) }))
      .catch((error: Error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ showBackdrop: false }));
  }

  dismissMessage() {
    this.setState({ error: "" });
  }

  doAfterDownload() {
    this.setState({ csvBlob: null });
  }
}

export default App;
