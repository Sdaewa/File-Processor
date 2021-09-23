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
      .get("http://localhost:8000/convertToMin", {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        if (res.statusText === "bad") {
          setTimeout(() => {
            setIsLoading(false);
          }, 6000);
          console.log("error");
        }
        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "newMinDocument.pdf";
        a.click();
        toast.success("Download Successful");
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        toast.error("Download Failed");
      });
  };

  const loadIcon = <ProgressBar value={isLoaded} />;

  return (
    <>
      <CssBaseline />
      {isLoading === true ? (
        loadIcon
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => {
            setIsLoading(true);
            download();
          }}>
          Download
        </Button>
      )}
    </>
  );
};

export default FileDownload;
