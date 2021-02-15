import React from "react";
import { Grid, List, ListItem, ListItemText, Dialog } from "@material-ui/core";

import { PaymentData } from "../types/payment";

type PDPProps = {
  paymentData: PaymentData | null;
  onClick: () => void;
};

const PaymentDataPane: React.FC<PDPProps> = ({ paymentData, onClick }) => {
  if (paymentData === null) return null;

  return (
    <Dialog open maxWidth="lg" onClick={onClick}>
      <Grid container>
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
              <ListItemText primary="Счет корреспондента" secondary={paymentData.agentAccount} />
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
    </Dialog>
  );
};

export default PaymentDataPane;
