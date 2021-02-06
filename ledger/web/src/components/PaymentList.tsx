import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Payment, PaymentRow } from "../types";
import { PaymentContext } from "../context";

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
  collapsibleCell: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});

const Row: React.FC<{ paymentRow: PaymentRow }> = ({ paymentRow }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

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
        <TableCell className={classes.collapsibleCell} colSpan={9}>
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

const PaymentList: React.FC = () => {
  const { payments } = React.useContext(PaymentContext);
  const classes = useRowStyles();

  const rows = Payment.group(payments.list);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(33);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!rows.length) {
    return (
      <div className="empty-payment-list">
        <h3>You have no payments for now.</h3>
      </div>
    );
  }

  return (
    <div className="payment-list">
      <TableContainer className={classes.container} component={Paper}>
        <TablePagination
          rowsPerPageOptions={[33]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
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
              <Row key={row.id} paymentRow={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentList;
