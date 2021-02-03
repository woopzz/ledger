import React from "react";
import { Snackbar, IconButton, Icon } from "@material-ui/core";
import { PaymentContext } from "../context";

interface IMessageSnackbarProps {
  msg: string;
  handleClose: () => void;
}

const MessageSnackbar: React.FC<IMessageSnackbarProps> = ({ msg, handleClose }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      message={msg}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      }
    />
  );
};

const Message: React.FC = () => {
  const { payments, dispatch } = React.useContext(PaymentContext);

  const handleClose = () => {
    dispatch({ type: "closeMsg" });
  };

  let messageSnackbar;
  if (payments.status === "error" && payments.msg) {
    messageSnackbar = <MessageSnackbar msg={payments.msg} handleClose={handleClose} />;
  }

  return <div className="message">{messageSnackbar}</div>;
};

export default Message;
