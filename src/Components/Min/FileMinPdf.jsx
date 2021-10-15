import React, { useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, CssBaseline } from "@material-ui/core";
import ProgressBar from "../UI/ProgressBar";
import { StateContext } from "../../Store/StateContext";

const FileDownload = () => {
  const ctx = useContext(StateContext);
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
          setIsLoading(false);
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
        ctx.setFiles({});
        setTimeout(() => {
          setIsLoading(false);
          ctx.setThereIsFile(false);
          ctx.setIsDisabled(true);
        }, 4000);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error("Download Failed");
      });
  };

  return (
    <>
      <CssBaseline />
      {isLoading === true ? (
        <ProgressBar value={isLoaded} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={ctx.thereIsFile !== true ? true : false}
          onClick={() => {
            setIsLoading(true);
            ctx.setIsDisabledOnUp(false);
            download();
          }}>
          Download
        </Button>
      )}
    </>
  );
};

export default FileDownload;
