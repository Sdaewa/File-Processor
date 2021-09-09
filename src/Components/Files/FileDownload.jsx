import React, { useState } from "react";

import ProgressBar from "../UI/ProgressBar";
import { Button } from "@material-ui/core";
import axios from "axios";

const FileDownload = (props) => {
  const [isLoaded, setIsLoaded] = useState(0);

  const download = () => {
    axios
      .get("http://localhost:8000/convert", {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "newDocument.pdf";
        a.click();
      });
  };

  return (
    <div id="container">
      <h1>Download File</h1>
      <ProgressBar value={isLoaded} />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={download}>
        Download
      </Button>
    </div>
  );
};

export default FileDownload;
