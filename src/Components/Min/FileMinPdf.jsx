import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Container,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Box,
  CardContent,
  CssBaseline,
} from "@material-ui/core";
import ProgressBar from "../UI/ProgressBar";

const FileDownload = () => {
  const [isLoaded, setIsLoaded] = useState(0);

  const download = () => {
    axios
      .get(process.env.MIN_PDF_URL, {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        const data = new Buffer.from(res.data).toString("base64");
        const blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        // a.download = "newDocument.pdf";
        a.click();
        toast.success("Download Successful");
      })
      .catch((e) => {
        toast.error("Download Failed");
      });
  };

  return (
    <>
      <CssBaseline />
      {/* <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title={"Minimize PDF file"}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}>
                  <ProgressBar value={isLoaded} />
                </Box>
              </CardContent>
              <CardActions> */}
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={download}>
        Download
      </Button>
      {/* </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
};

export default FileDownload;
