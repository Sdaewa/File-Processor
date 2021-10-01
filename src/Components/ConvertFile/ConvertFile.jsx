import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Box, Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProgressBar from "../UI/ProgressBar";
import FileUpload from "../Upload/FileUpload";
import DeleteFile from "../DeleteFile/DeleteFile";
import useStyles from "../Upload/UploadStyles";

const ConvertFile = () => {
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });
  const [thereIsFile, setThereIsFile] = useState(false);

  const updateUploadedFiles = (files) => {
    setNewInfo({ ...newInfo, files: files });
  };

  const deleteFileHandler = () => {
    setThereIsFile(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    for (let i = 0; i < newInfo.files.length; i++) {
      data.append("file", newInfo.files[i]);
    }
    console.log(data);
    axios
      .post("http://localhost:8000/upload", data, {
        headers: {
          // encoding: null,
          encoding: "binary",
        },
        // onUploadProgress: (ProgressEvent) => {
        //   setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        // },
      })

      .then((res) => {
        console.log(res);
        if (res.data === "No File selected !") {
          toast.success("No File selected !");
        } else {
          toast.success("Convertion successful!");
          setThereIsFile(true);
          console.log(thereIsFile);
        }
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Convertion fail");
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
          <Container maxWidth="md" component="main">
            <FileUpload updateFilesCb={updateUploadedFiles} multiple />
            <Grid
              container
              direction="column"
              alignContent="center"
              style={{ padding: "25px 25px", marginBottom: "40px" }}>
              <Grid item>
                <Box className={classes.box}>
                  {thereIsFile ? (
                    <DeleteFile onDelete={deleteFileHandler} />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}>
                      Convert
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default ConvertFile;
