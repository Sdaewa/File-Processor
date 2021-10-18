import React, { useState, useContext } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StateContext } from "../../Store/StateContext";

const ModalEmail = () => {
  const ctx = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmail(value);
  };

  const postEmail = () => {
    axios({
      method: "POST",
      url: "https://pacific-ravine-03339.herokuapp.com/sendByEmail",

      data: {
        emailAddress: email,
      },
      headers: {
        "Content-Type": "application/json",
      },
      onDownloadProgress: (ProgressEvent) => {
        setIsLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
      },
    })
      .then((res) => {
        toast.success("Email was sent");
        ctx.setFiles({});
        setTimeout(() => {
          setIsLoading(false);
          ctx.setThereIsFile(false);
          ctx.setIsDisabled(true);
        }, 4000);
        setEmail("");
      })
      .catch((err) => {
        toast.error("Could not send the email");
        ctx.setFiles({});
        ctx.setThereIsFile(false);
        setIsLoading(false);
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
      {isLoading === true ? (
        <ProgressBar value={isLoaded} />
      ) : (
        <Button
          variant="contained"
          disabled={ctx.thereIsFile !== true ? true : false}
          color="primary"
          onClick={handleClickOpen}>
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
              ctx.setIsDisabledOnUp(false);
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
