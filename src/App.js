import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import FilesZone from "./Components/FilesZone/FilesZone";
import useStyles from "./Components/Upload/UploadStyles";
import FileDownload from "./Components/Download/FileDownload";
import FileMinPdf from "./Components/Min/FileMinPdf";
import Modal from "./Components/Modal/Modal";

const App = () => {
  const classes = useStyles();

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
            PDF Processor
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <FilesZone />
        <FileDownload />
        <FileMinPdf />
        <Modal />
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
