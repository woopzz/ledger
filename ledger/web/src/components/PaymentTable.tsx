import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

import { PaymentData, PaymentTableInfo } from "../types/payment";

type PTRProps = {
  paymentRow: PaymentTableInfo;
  onClick: () => void;
};

const PaymentTableRow: React.FC<PTRProps> = ({ paymentRow, onClick }) => {
  const hasShadeOnHover = paymentRow.data !== null;
  const className = hasShadeOnHover ? "hover" : "";

  return (
    <TableRow hover={hasShadeOnHover} className={className} onClick={onClick}>
      <TableCell>{paymentRow.date}</TableCell>
      <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
      <TableCell />
      <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
      <TableCell />
      <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
      <TableCell />
      <TableCell />
    </TableRow>
  );
};

type PaymentTableProps = {
  rows: PaymentTableInfo[];
  onRowClick: (data: PaymentData | null) => void;
};

const PaymentTable: React.FC<PaymentTableProps> = ({ rows, onRowClick }) => {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
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
        {rows.map((row) => (
          <PaymentTableRow key={row.id} paymentRow={row} onClick={() => onRowClick(row.data)} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentTable;
