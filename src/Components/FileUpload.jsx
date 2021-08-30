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
    width: "100",
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
    fileInputField.current.click();
  };

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
        <FormLabel className={classes.inputLabel}>{label}</FormLabel>
        <p>Drag and drop your files anywhere or</p>
        <Button type="button">
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </Button>
        <input
          className={classes.input}
          type="file"
          ref={fileInputField}
          title=""
          value=""
          {...otherProps}
        />
      </Container>
      <article>
        <span>To Upload</span>
        <section>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <section key={fileName}>
                <div>
                  {isImageFile && (
                    <image
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <div isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      {/* <RemoveFileIcon className="fas fa-trash-alt" /> */}
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
