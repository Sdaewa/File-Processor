import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Box } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../UI/ProgressBar";
import FileUpload from "../Upload/FileUpload";
import useStyles from "../Upload/UploadStyles";

const Files = () => {
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });
  const [isLoaded, setIsLoaded] = useState(0);

  const updateUploadedFiles = (files) =>
    setNewInfo({ ...newInfo, files: files });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    for (let i = 0; i < newInfo.files.length; i++) {
      data.append("file", newInfo.files[i]);
    }

    axios
      .post("http://localhost:8000/", data, {
        headers: {
          // encoding: null,
          encoding: "binary",
        },
        onUploadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        toast.success("upload success");
      })
      .catch((e) => {
        toast.error("upload fail");
      });
  };

  return (
    <Container className={classes.dropZone}>
      <div className="form-group">
        <ToastContainer
          position={"top-center"}
          autoClose={3000}
          hideProgressBar
        />
        <form>
          <FileUpload updateFilesCb={updateUploadedFiles} multiple />
          <ProgressBar value={isLoaded} />
          <Box className={classes.box}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default Files;
