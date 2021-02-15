import React from "react";
import { CircularProgress, Backdrop as MaterialBackdrop } from "@material-ui/core";

const Backdrop: React.FC = () => {
  return (
    <div>
      <MaterialBackdrop open className="backdrop">
        <CircularProgress color="inherit" />
      </MaterialBackdrop>
    </div>
  );
};

export default Backdrop;
