import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const DeleteFile = (props) => {
  console.log(props);
  const deleteHandler = () => {
    axios
      .post("http://localhost:8000/delete")
      .then((res) => {
        console.log(res);
        toast.success("Deletion successful");
      })
      .catch((e) => {
        toast.error("Nothing to delete");
      });
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        deleteHandler();
        props.onDelete();
      }}>
      Delete
    </Button>
  );
};

export default DeleteFile;
