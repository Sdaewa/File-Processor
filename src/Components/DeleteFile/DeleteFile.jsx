import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

import { StateContext } from "../../Store/StateContext";

const DeleteFile = (props) => {
  const ctx = useContext(StateContext);
  const deleteHandler = () => {
    axios
      .post("https://processor-server.herokuapp.com/delete")
      .then((res) => {
        ctx.setIsDisabled(true);
        ctx.setFiles({});
        toast.success("Deletion successful");
      })
      .catch((e) => {
        ctx.setIsDisabled(true);
        toast.error("Nothing to delete");
      });
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        deleteHandler();
        ctx.setIsDisabledOnUp(false);
        props.onDelete();
      }}>
      Delete
    </Button>
  );
};

export default DeleteFile;
