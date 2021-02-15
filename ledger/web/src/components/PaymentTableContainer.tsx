import React from "react";
import { TablePagination, TableContainer } from "@material-ui/core";

import Payment from "../services/payment";
import { PaymentData } from "../types/payment";

import PaymentTable from "./PaymentTable";
import PaymentDataPane from "./PaymentDataPane";

type PTCProps = {
  payments: Payment[];
};

type PTCState = {
  page: number;
  activePayment: PaymentData | null;
};

class PaymentTableContainer extends React.Component<PTCProps, PTCState> {
  static readonly rowsPerPage = 33;

  constructor(props: PTCProps) {
    super(props);
    this.state = {
      page: 0,
      activePayment: null,
    };

    this.changePage = this.changePage.bind(this);
    this.showPaymentInfo = this.showPaymentInfo.bind(this);
    this.hidePaymentInfo = this.hidePaymentInfo.bind(this);
  }

  render() {
    const rows = Payment.group(this.props.payments);
    if (!rows.length) {
      return <h3>You have no payments for now.</h3>;
    }

    const page = this.state.page;
    const rowsPerPage = PaymentTableContainer.rowsPerPage;
    const currentRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <TableContainer className="table-container">
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.changePage}
        />
        <PaymentTable rows={currentRows} onRowClick={this.showPaymentInfo} />
        <PaymentDataPane paymentData={this.state.activePayment} onClick={this.hidePaymentInfo} />
      </TableContainer>
    );
  }

  changePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) {
    this.setState({ page: page });
  }

  showPaymentInfo(data: PaymentData | null) {
    this.setState({ activePayment: data });
  }

  hidePaymentInfo() {
    this.setState({ activePayment: null });
  }
}

export default PaymentTableContainer;
