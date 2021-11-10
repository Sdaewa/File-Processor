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
      .get("http://localhost:8080/convertToMin", {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        if (res.statusText === "BAD") {
          setIsLoading(false);
        }
        const urlFile = res.data.url;

        fetch(urlFile)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement("a");
            // create a blobURI pointing to our Blob
            link.href = URL.createObjectURL(blob);
            link.download = "miniPdf.pdf";
            // some browser needs the anchor to be in the doc
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 10000);

            toast.success("Download Successful");
            ctx.setFiles({});
            setTimeout(() => {
              setIsLoading(false);
              ctx.setThereIsFile(false);
              ctx.setIsDisabled(true);
            }, 4000);
          });
      })
      .then(() => {
        axios.post("http://localhost:8080/delete");
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
