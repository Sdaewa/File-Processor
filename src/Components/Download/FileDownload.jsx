import React, { useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../UI/ProgressBar";
import { Button, CssBaseline } from "@material-ui/core";
import { StateContext } from "../../Store/StateContext";

const FileDownload = () => {
  const ctx = useContext(StateContext);
  const [isLoaded, setIsLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const download = () => {
    axios
      .get("http://localhost:8000/downloadPdf", {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === "BAD") {
          setIsLoading(false);
          console.log("error");
        }
        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "newDocument.pdf";
        a.click();
        toast.success("Download Successful");
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      })
      .catch((e) => {
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
          disabled={ctx.thereIsFile !== true ? true : false}
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
