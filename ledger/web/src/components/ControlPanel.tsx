import React from "react";
import { Toolbar, Button, Icon } from "@material-ui/core";

type ControlPanelProps = {
  importHandler: (file: File) => void;
  exportHandler: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ importHandler, exportHandler }) => {
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) importHandler(files[0]);
  };

  return (
    <Toolbar className="toolbar">
      <input ref={inputFileRef} hidden type="file" onChange={onChangeInput} />
      <Button startIcon={<Icon>file_upload</Icon>} onClick={() => inputFileRef.current?.click()}>
        Импорт
      </Button>
      <Button startIcon={<Icon>file_download</Icon>} onClick={() => exportHandler()}>
        Экспорт
      </Button>
    </Toolbar>
  );
};

export default ControlPanel;
