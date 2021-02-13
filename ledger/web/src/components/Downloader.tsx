import React from "react";
import { Dialog, Button } from "@material-ui/core";

type DownloaderProps = {
  blob: Blob | null;
  doAfterDownload: () => void;
};

const Downloader: React.FC<DownloaderProps> = ({ blob, doAfterDownload }) => {
  if (blob === null) return null;

  return (
    <Dialog open onClose={() => doAfterDownload()}>
      <Button
        className="download-button"
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
