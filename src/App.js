import React, { useState } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Container,
  Grid,
  Toolbar,
  Box,
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
  dropZone: {
    // justifyContent: "center",
    // alignItems: "center",
    // height: "50vh",
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
        <Container className={classes.dropZone}>
          <form onSubmit={handleSubmit}>
            <FileUpload
              accept=".jpg,.png,.jpeg, .pdf"
              label="Drop area"
              updateFilesCb={updateUploadedFiles}
              multiple
            />
            <Box className={classes.box}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Container>
        <Grid container>
          <Grid item>Pack</Grid>
        </Grid>
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
