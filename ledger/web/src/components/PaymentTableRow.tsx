import React from "react";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Icon,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { PaymentTableInfo } from "../types/payment";

const PaymentTableRow: React.FC<{ paymentRow: PaymentTableInfo }> = ({ paymentRow }) => {
  const [open, setOpen] = React.useState(false);

  let arrowIconButton, collapsibleRow;
  if (paymentRow.collapsible) {
    const paymentData = paymentRow.data;
    arrowIconButton = (
      <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
      </IconButton>
    );
    collapsibleRow = (
      <TableRow hidden={!open}>
        <TableCell className="table-collapsible-cell" colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Номер документа" secondary={paymentData.docNo} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Дата операции" secondary={paymentData.date} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Сумма" secondary={paymentData.amount} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Валюта" secondary={paymentData.currency} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Назначение платежа" secondary={paymentData.note} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Счет" secondary={paymentData.account} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ЕГРПОУ" secondary={paymentData.companyRegistry} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="МФО" secondary={paymentData.bankCode} />
                  </ListItem>

                  <ListItem>
                    <ListItemText primary="Корреспондент" secondary={paymentData.agent} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Счет корреспондента"
                      secondary={paymentData.agentAccount}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ЕГРПОУ корреспондента"
                      secondary={paymentData.agentCompanyRegistry}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Название банка" secondary={paymentData.agentBank} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="МФО банка" secondary={paymentData.agentBankCode} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableRow>
        <TableCell>{arrowIconButton}</TableCell>
        <TableCell>{paymentRow.date}</TableCell>
        <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
        <TableCell />
        <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
        <TableCell />
        <TableCell>{paymentRow.amount.toFixed(2)}</TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
      {collapsibleRow}
    </>
  );
};

export default PaymentTableRow;
