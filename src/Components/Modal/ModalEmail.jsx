import React, { useState, useRef } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const ModalEmail = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("value", value);
    setEmail(value);
  };

  const postEmail = () => {
    // setEmail(emailVal);
    axios({
      method: "POST",
      url: "http://localhost:8000/sendByEmail",
      data: {
        emailAddress: email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    <div>
      <h1>Send PDF by email</h1>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Send by email
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
          {/* <input /> */}
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
    </div>
  );
};

export default ModalEmail;
