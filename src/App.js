import React, { useState } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Container,
  Toolbar,
  Box,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import FilePreview from "./Components/Files/FilePreview";
import ProgressBar from "./Components/UI/ProgressBar";
import FileUpload from "./Components/Files/FileUpload";
import useStyles from "./Components/Files/UploadStyles";
import FileDownload from "./Components/Files/FileDownload";

const App = () => {
  const classes = useStyles();
  const [pdf, setPdf] = useState("");
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

    console.log(pdf);
  };

  const handleGet = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:8000/convert")

      .then((res) => {
        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        console.log(url);
        setPdf(url);
        toast.success("upload success");
      })
      .catch((e) => {
        toast.error("upload fail");
      });
    console.log(pdf);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        style={{
          alignItems: "center",
          position: "static",
        }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            File compressor
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className="form-group">
          <ToastContainer
            position={"top-center"}
            autoClose={3000}
            hideProgressBar
          />
        </div>
        <Container className={classes.dropZone}>
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
        </Container>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleGet}>
          GET
        </Button>
        <FileDownload onClick={handleGet} pdf={pdf} />
        <Container
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "750px",
          }}></Container>
        <FilePreview onGet={pdf} />
      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </>
  );
};

export default App;
