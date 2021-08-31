import React, { useRef, useState } from "react";
import { Container, Button } from "@material-ui/core";

import useStyles from "./UploadStyles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

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

  // const handleUploadBtnClick = () => {
  //   fileInputField.current.click();
  // };

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
    console.log(files);
    if (maxSelectFile(e)) {
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

  const maxSelectFile = (e) => {
    let files = e.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      e.target.value = null;
      console.log(msg);
      return false;
    }
    return true;
  };

  return (
    <>
      <Container className={classes.fileUploadContainer}>
        <p>Drag and drop your files anywhere</p>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          // onClick={handleUploadBtnClick}
        >
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
    </>
  );
};

export default FileUpload;
