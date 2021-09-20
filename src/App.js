import React from "react";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Container,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import FilesZone from "./Components/FilesZone/FilesZone";
import useStyles from "./Components/Upload/UploadStyles";
import FileDownload from "./Components/Download/FileDownload";
import FileMinPdf from "./Components/Min/FileMinPdf";
import ModalEmail from "./Components/Modal/ModalEmail";

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
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom>
            Choose
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={"Download PDF"}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardActions>
                  <FileDownload />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={"Download Minimized PDF"}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardActions>
                  <FileMinPdf />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={"Send to email"}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardActions>
                  <ModalEmail />
                </CardActions>
              </Card>
            </Grid>
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
