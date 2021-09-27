import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Box, Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProgressBar from "../UI/ProgressBar";
import FileUpload from "../Upload/FileUpload";
import useStyles from "../Upload/UploadStyles";

const Files = () => {
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });
  // const [isLoaded, setIsLoaded] = useState(0);

  const updateUploadedFiles = (files) => {
    setNewInfo({ ...newInfo, files: files });
    console.log("state=>", files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    for (let i = 0; i < newInfo.files.length; i++) {
      data.append("file", newInfo.files[i]);
      console.log("hdlSbumit", data);
    }

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
        console.log("then res=>", res.body);
        toast.success("upload success");
      })
      .catch((e) => {
        console.log(e.message);
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
          <Container maxWidth="md" component="main">
            {/* <Grid item> */}
            <FileUpload updateFilesCb={updateUploadedFiles} multiple />
            {/* </Grid> */}
            <Grid
              container
              direction="column"
              alignContent="center"
              style={{ padding: "25px 25px", marginBottom: "40px" }}>
              <Grid item>{/* <ProgressBar value={isLoaded} /> */}</Grid>
              <Grid item>
                <Box className={classes.box}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}>
                    Upload
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default Files;