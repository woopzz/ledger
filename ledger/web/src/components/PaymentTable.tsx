import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";

import { Payment } from "../types/payment";
import PaymentTableRow from "./PaymentTableRow";

const useRowStyles = makeStyles({
  container: {
    "& td, & th": {
      border: "1px solid black",
      width: "12%",
      textAlign: "center",
    },
    "& tr > *:first-child": {
      width: "4%",
    },
    "& tr[hidden]": {
      display: "none",
    },
  },
});

const PaymentTable: React.FC<{ payments: Payment[] }> = ({ payments }) => {
  const classes = useRowStyles();

  const rowsPerPage = 33;
  const [page, setPage] = React.useState(0);

  const rows = Payment.group(payments);
  if (!rows.length) {
    return (
      <div className="empty-payment-list">
        <h3>You have no payments for now.</h3>
      </div>
    );
  }

  return (
    <TableContainer className={classes.container} component={Paper}>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, page: number) => setPage(page)}
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
            <TableCell>6</TableCell>
            <TableCell>7</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <PaymentTableRow key={row.id} paymentRow={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
