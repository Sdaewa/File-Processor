import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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

const ModalEmail = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("value", value);
    setEmail(value);
  };

  const postEmail = () => {
    axios(
      {
        method: "POST",
        url: process.env.SEND_EMAIL_URL,

        data: {
          emailAddress: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        onDownloadProgress: (ProgressEvent) => {
          setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      }
    )
      .then((res) => {
        console.log("response");
        res.json();
        console.log(res);
      })
      .then((data) => {
        console.log(data);
        alert(data.message);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {/* <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title={"Send PDF to email"}
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Enter email
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Please enter an email address to send PDF to
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={onChange}
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={postEmail} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/* </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
};

export default ModalEmail;
