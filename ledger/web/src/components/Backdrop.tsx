import React from "react";
import { CircularProgress, Backdrop as MaterialBackdrop } from "@material-ui/core";

const Backdrop: React.FC = () => {
  return (
    <MaterialBackdrop open className="backdrop">
      <CircularProgress color="inherit" />
    </MaterialBackdrop>
  );
};

export default Backdrop;
