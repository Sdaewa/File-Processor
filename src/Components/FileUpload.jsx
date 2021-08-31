import React, { useRef, useState } from "react";
import { Container, Box, Grid, Button, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

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

      "${FileMetaData}": {
        display: "flex",
      },
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
    display: '${(props) => (props.isImageFile ? "none" : "flex")}',
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

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const classes = useStyles();
  const fileInputField = useRef();
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    console.log(fileInputField.current.click());
  };
  console.log(fileInputField);

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <Container className={classes.fileUploadContainer}>
        <p>Drag and drop your files anywhere or</p>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </Button>
        <input
          className={classes.input}
          type="file"
          ref={fileInputField}
          title=""
          value=""
          onChange={handleNewFileUpload}
          {...otherProps}
        />
      </Container>
      <article className={classes.filePreviewContainer}>
        <span>To Upload</span>
        <section className={classes.previewList}>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <section key={fileName} className={classes.previewContainer}>
                <div>
                  <img
                    className={classes.imgPreview}
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${index}`}
                  />
                  <div
                    className={classes.fileMetada}
                    isimagefile={isImageFile.toString()}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <i
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default FileUpload;
