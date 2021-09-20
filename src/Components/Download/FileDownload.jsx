import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../UI/ProgressBar";
import { Button } from "@material-ui/core";

const FileDownload = () => {
  const [isLoaded, setIsLoaded] = useState(0);

  const download = () => {
    axios
      .get(process.env.TO_PDF_URL, {
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
        toast.success("Download Successful");
      })
      .catch((e) => {
        toast.error("Download Failed");
      });
  };

  return (
    <div id="container">
      <h1>Download PDF</h1>
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
