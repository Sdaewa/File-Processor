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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import FileUpload from "./Components/FileUpload";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: "auto",
  },
  dropZone: {
    padding: "50px 25px 25px",
  },
  box: {
    textAlign: "center",
    padding: "25px 20px",
  },
}));

const App = () => {
  const classes = useStyles();
  const [newInfo, setNewInfo] = useState({
    files: [],
  });

  const updateUploadedFiles = (files) =>
    setNewInfo({ ...newInfo, files: files });
  console.log(newInfo.files[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("file", newInfo.files[0]);
    console.log("clicked", data);
    axios({
      method: "post",
      url: "http://localhost:8000/upload",
      data: data,
    }).then((res) => {
      // then print response status
      console.log(res.statusText);
    });
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
        <Container className={classes.dropZone}>
          <form>
            <FileUpload
              accept=".jpg,.png,.jpeg,.pdf"
              updateFilesCb={updateUploadedFiles}
              multiple
            />
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
