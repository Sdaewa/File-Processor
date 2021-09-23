import React, { useRef, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./UploadStyles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  handlerSubmit,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const classes = useStyles();
  const fileInputField = useRef();
  const [files, setFiles] = useState({});

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

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const checkMimeType = (e) => {
    let files = e.target.files;
    let err = []; // create empty array
    const types = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "application/msword",
    ];
    for (let i = 0; i < files.length; i++) {
      if (types.every((type) => files[i].type !== type)) {
        err[i] = files[i].type + " is not a supported format\n";
        // assign message to array
      }
    }
    for (let x = 0; x < err.length; x++) {
      // loop create toast massage
      e.target.value = null;
      toast.error(err[x]);
    }
    return true;
  };

  const maxSelectFile = (e) => {
    let files = e.target.files;
    if (files.length > 3) {
      const msg = "Only 3 image can be uploaded at a time";
      e.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };

  const checkFileSize = (e) => {
    let files = e.target.files;
    let size = 2000000;
    let err = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].size > size) {
        err[i] = files[i].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var x = 0; x < err.length; x++) {
      toast.error(err[x]);
      e.target.value = null;
    }
    return true;
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    console.log(files);
    if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  return (
    <>
      <div className="form-group">
        <ToastContainer
          position={"top-center"}
          autoClose={3000}
          hideProgressBar
        />
        <Container className={classes.fileUploadContainer}>
          <p>Drag and drop your files anywhere</p>
          <Button variant="outlined" color="primary" type="button">
            <i className="fas fa-file-upload" />
            <span> Upload Files</span>
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
                      alt=""
                    />
                    <div
                      className={classes.fileMetada}
                      isimagefile={isImageFile.toString()}>
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb </span>
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
      </div>
    </>
  );
};

export default FileUpload;
