import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: "auto",
  },
  dropZone: {
    padding: "50px 25px 25px",
  },
  box: {
    textAlign: "center",
    padding: "25px 20px",
  },
}));

export default useStyles;
