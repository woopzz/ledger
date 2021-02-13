import React from "react";
import { Dialog, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    padding: "1em",
  },
});

type DownloaderProps = {
  blob: Blob | null;
  doAfterDownload: () => void;
};

const Downloader: React.FC<DownloaderProps> = ({ blob, doAfterDownload }) => {
  const classes = useStyles();

  if (blob === null) return null;

  return (
    <Dialog open onClose={() => doAfterDownload()}>
      <Button
        className={classes.link}
        href={window.URL.createObjectURL(blob)}
        download="payments.csv"
        onClick={() => doAfterDownload()}
      >
        Download your CSV
      </Button>
    </Dialog>
  );
};

export default Downloader;
