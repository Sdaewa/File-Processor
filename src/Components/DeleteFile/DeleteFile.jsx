import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const DeleteFile = () => {
  const deleteHandler = () => {
    axios
      .post("http://localhost:8000/delete")
      .then(toast.success("Deletion Successful"))
      .catch(toast.error("Nothing to Delete"));
  };

  return (
    <Button variant="contained" color="primary" onClick={deleteHandler}>
      Delete
    </Button>
  );
};

export default DeleteFile;
