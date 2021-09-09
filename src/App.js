import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import FilesZone from "./Components/Files/FilesZone";
import useStyles from "./Components/Files/UploadStyles";
import FileDownload from "./Components/Files/FileDownload";

const App = () => {
  const classes = useStyles();
  // const [pdf, setPdf] = useState("");

  // const handleGet = (event) => {
  //   event.preventDefault();

  //   axios
  //     .get("http://localhost:8000/convert")

  //     .then((res) => {
  //       const data = new Buffer.from(res.data).toString("base64");
  //       const blob = new Blob([data], { type: "application/pdf" });
  //       const url = URL.createObjectURL(blob);
  //       setPdf(url);
  //       toast.success("upload success");
  //     })
  //     .catch((e) => {
  //       toast.error("upload fail");
  //     });
  // };

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
        <FilesZone />
        <FileDownload />
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
