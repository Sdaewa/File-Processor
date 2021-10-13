import React, { useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../UI/ProgressBar";
import { Button, CssBaseline } from "@material-ui/core";
import { StateContext } from "../../Store/StateContext";
import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";

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
        if (res.statusText === "BAD") {
          setIsLoading(false);
          console.log("error");
        }

        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        // let url = URL.createObjectURL(blob);
        // let a = document.createElement("a");
        // a.href = url;
        // a.download = "newDocument.pdf";
        // a.click();

        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");

        // Set link's href to point to the Blob URL
        link.href = blobUrl;

        // Append link to the body
        document.body.appendChild(link);

        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        // Remove link from body

        toast.success("Download Successful");
        ctx.setFiles({});
        setTimeout(() => {
          setIsLoading(false);
          ctx.setThereIsFile(false);
          ctx.setIsDisabled(true);
        }, 4000);
      })
      .catch((e) => {
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
            download();
          }}>
          Download
        </Button>
      )}
    </>
  );
};

export default FileDownload;
