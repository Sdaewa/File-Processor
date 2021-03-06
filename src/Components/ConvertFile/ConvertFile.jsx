import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Container, Box, Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileUpload from "../Upload/FileUpload";
import DeleteFile from "../DeleteFile/DeleteFile";
import useStyles from "../Upload/UploadStyles";
import Loader from "../UI/Loader";
import { StateContext } from "../../Store/StateContext";

const ConvertFile = () => {
  const ctx = useContext(StateContext);
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });
  const [isConverting, setIsConverting] = useState(false);

  const updateUploadedFiles = (files) => {
    setNewInfo({ ...newInfo, files: files });
    if (newInfo) {
      ctx.setIsDisabled(false);
    }
  };

  const deleteFileHandler = () => {
    ctx.setThereIsFile(false);
    setNewInfo({ ...newInfo, files: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConverting(true);
    const file = newInfo.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://processor-server.herokuapp.com/upload", formData)
      .then(() => {
        ctx.setThereIsFile(true);
        setIsConverting(false);
        toast.success("Convertion Successful");
      })
      .catch(() => {
        setIsConverting(false);
        toast.error("Convertion Failed");
      });
  };

  const actionButtons = () => {
    if (ctx.thereIsFile) {
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
            disabled={ctx.isDisabled}
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
            <FileUpload updateFilesCb={updateUploadedFiles} />
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
