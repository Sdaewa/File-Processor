import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, CssBaseline } from "@material-ui/core";
import ProgressBar from "../UI/ProgressBar";

const FileDownload = () => {
  const [isLoaded, setIsLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const download = () => {
    axios
      .get(process.env.MIN_PDF_URL, {
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
        // a.download = "newDocument.pdf";
        a.click();
        toast.success("Download Successful");
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error("Download Failed");
      });
  };

  const loadIcon = <ProgressBar value={isLoaded} />;

  return (
    <>
      <CssBaseline />
      {isLoading && { loadIcon }}
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={download}>
        Download
      </Button>
    </>
  );
};

export default FileDownload;
