import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CssBaseline,
} from "@material-ui/core";

import ProgressBar from "../UI/ProgressBar";

const ModalEmail = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
        url: "http://localhost:8000/sendByEmail",

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
        if (res.statusText === "BAD") {
          setTimeout(() => {
            setIsLoading(false);
          }, 6000);
          console.log("error");
        }
        console.log("response");
        res.json();
        console.log(res);
      })
      .then((data) => {
        console.log(data);
        alert(data.message);
        setEmail("");
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
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

  const loadIcon = <ProgressBar value={isLoaded} />;

  return (
    <>
      <CssBaseline />
      {isLoading === true ? (
        loadIcon
      ) : (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Enter email
        </Button>
      )}

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
          <Button
            type="submit"
            onClick={() => {
              setIsLoading(true);
              postEmail();
            }}
            color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEmail;
