import React from "react";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
  Container,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./Components/Upload/UploadStyles";
import Main from "./Components/Main/Main";

const App = () => {
  const classes = useStyles();

  const Github = () => {
    return (
      <Typography align="center" variant="body2" color="textSecondary">
        <Link color="inherit" href="https://github.com/sdaewa" target="_blank">
          <GitHubIcon />
        </Link>
      </Typography>
    );
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
            PDF Processor
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ marginBottom: "50px" }}>
        <Main />
      </main>
      <Container
        style={{
          margin: "25px auto",
          padding: "25px auto",
          width: "100%",
          alignItems: "center",
          position: "sticky",
        }}>
        <footer className={classes.footer}>
          <Typography align="center" variant="body1">
            Luis Ramirez
          </Typography>
          <Github />
        </footer>
      </Container>
    </>
  );
};

export default App;
