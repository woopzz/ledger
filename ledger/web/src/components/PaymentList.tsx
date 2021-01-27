import React from "react";
import { Payment } from "../types/payment";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row: React.FC<{ payment: Payment }> = ({ payment }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
          </IconButton>
        </TableCell>
        <TableCell>{payment.date}</TableCell>
        <TableCell>{payment.amount}</TableCell>
        <TableCell />
        <TableCell>{payment.amount}</TableCell>
        <TableCell />
        <TableCell>{payment.amount}</TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Номер документа" secondary={payment.docNo} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Дата операции" secondary={payment.date} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Сумма" secondary={payment.amount} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Валюта" secondary={payment.currency} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Назначение платежа" secondary={payment.note} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Счет" secondary={payment.account} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ЕГРПОУ" secondary={payment.companyRegistry} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="МФО" secondary={payment.bankCode} />
                  </ListItem>

                  <ListItem>
                    <ListItemText primary="Корреспондент" secondary={payment.agent} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Счет корреспондента" secondary={payment.agentAccount} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ЕГРПОУ корреспондента"
                      secondary={payment.agentCompanyRegistry}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Название банка" secondary={payment.agentBank} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="МФО банка" secondary={payment.agentBankCode} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const PaymentList: React.FC<{ payments: Payment[] }> = (props) => {
  if (!props.payments.length) {
    return (
      <div className="empty-payment-list">
        <h3>You have no payments for now.</h3>
      </div>
    );
  }

  return (
    <div className="payment-list">
      <TableContainer component={Paper}>
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
            {props.payments.map((payment) => (
              <Row key={payment.docNo} payment={payment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentList;
