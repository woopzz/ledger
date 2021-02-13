import React from "react";
import { Snackbar, IconButton, Icon } from "@material-ui/core";

type MessageProps = {
  text: string,
  onDismiss: () => void,
}

const Message: React.FC<MessageProps> = ({ text, onDismiss }) => {
  if (!text) return null;

  return (
    <Snackbar
      open
      autoHideDuration={6000}
      message={text}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => onDismiss()}
        >
          <Icon>close</Icon>
        </IconButton>
      }
    />
  );
};

export default Message;
