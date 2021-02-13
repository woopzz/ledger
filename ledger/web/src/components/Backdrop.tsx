import React from "react";
import { CircularProgress, Backdrop as MaterialBackdrop } from "@material-ui/core";

const Backdrop: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div>
      <MaterialBackdrop open className="backdrop">
        <CircularProgress color="inherit" />
      </MaterialBackdrop>
    </div>
  );
};

export default Backdrop;
