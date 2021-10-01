import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Box, Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProgressBar from "../UI/ProgressBar";
import FileUpload from "../Upload/FileUpload";
import DeleteFile from "../DeleteFile/DeleteFile";
import useStyles from "../Upload/UploadStyles";
import Loader from "../UI/Loader";

const ConvertFile = () => {
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });
  const [thereIsFile, setThereIsFile] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const updateUploadedFiles = (files) => {
    setNewInfo({ ...newInfo, files: files });
  };

  const deleteFileHandler = () => {
    setThereIsFile(false);
    setNewInfo({ files: [] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsConverting(true);
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
      })
      .then((res) => {
        console.log(res);
        if (res.data === "No File selected !") {
          return toast.warning("No File selected !");
        } else {
          toast.success("Convertion successful!");
          setThereIsFile(true);
          setIsConverting(false);
          console.log(thereIsFile);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setIsConverting(false);
        toast.error("Convertion fail");
      });
  };

  const actionButtons = () => {
    if (thereIsFile) {
      return <DeleteFile onDelete={deleteFileHandler} />;
    } else {
      if (isConverting) {
        return <Loader />;
      } else {
        return (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}>
            Convert
          </Button>
        );
      }
    }
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
                <Box className={classes.box}>{actionButtons()}</Box>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default ConvertFile;
