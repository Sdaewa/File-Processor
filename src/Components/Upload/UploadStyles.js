import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  fileUploadContainer: {
    position: "relative",
    margin: "25px 0 15px",
    border: " 2px dotted lightgray",
    padding: "35px 20px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    fontSize: "18px",
    display: "block",
    width: "inherit",
    border: "none",
    textTransform: "none",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    opacity: "0",
  },

  inputLabel: {
    top: -"21px",
    fontSize: "13px",
    color: "black",
    left: "0",
    position: "absolute",
  },
  filePreviewContainer: {
    marginTop: "50px",
    marginBottom: "50px",

    span: {
      fontSize: "14px",
    },
  },
  previewList: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",

    "@media only screen and (max-width: 400px)": {
      flexDirection: "column",
    },
  },
  previewContainer: {
    padding: "0.25rem",
    width: "20%",
    height: "120px",
    borderRadius: "6px",
    boxSizing: " border-box",

    "&:hover": {
      opacity: " 0.55",

      // "${FileMetaData}": {
      //   display: "flex",
      // },
    },

    "& > div:first-of-type": {
      height: "100%",
      position: "relative",
    },

    "@media only screen and (max-width: 750px)": {
      width: "25%",
    },

    " @media only screen and (max-width: 500px)": {
      width: "50%",
    },

    "@media only screen and (max-width: 400px)": {
      width: "100%",
      padding: "0 0 0.4em",
    },
  },
  imgPreview: {
    borderRadius: "6px",
    width: "100%",
    height: " 100%",
  },
  fileMetada: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    padding: "10px",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "rgba(5, 5, 5, 0.55)",

    aside: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

export default useStyles;
