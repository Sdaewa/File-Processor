import React, { useState } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FileUpload from "./Components/FileUpload";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: "auto",
  },
}));

const App = () => {
  const classes = useStyles();

  const [newInfo, setNewInfo] = useState({
    files: [],
  });

  const updateUploadedFiles = (files) =>
    setNewInfo({ ...newInfo, files: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
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
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item>
                <FileUpload
                  accept=".jpg,.png,.jpeg, .pdf"
                  label="Drop area"
                  updateFilesCb={updateUploadedFiles}
                  multiple
                />
              </Grid>
              <button type="submit">Submit</button>
            </Grid>
          </form>

          <Grid container>
            <Grid item>Pack</Grid>
          </Grid>
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
