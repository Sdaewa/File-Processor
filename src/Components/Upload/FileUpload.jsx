import React, { useRef, useContext, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../../Store/StateContext";

import useStyles from "./UploadStyles";

const KILO_BYTES_PER_BYTE = 1000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  handlerSubmit,
  onConvert,
  ...otherProps
}) => {
  const ctx = useContext(StateContext);
  const classes = useStyles();
  const fileInputField = useRef();
  const [isValid, setIsValid] = useState(true);

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.name.split(".")[1] === "pdf") {
        toast.error("File type is not accepted");
        return;
      }
      ctx.files[file.name] = file;
    }
    return { ...ctx.files };
  };

  const callUpdateFilesCb = (files) => {
    let filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    let updatedFiles = addNewFiles(newFiles);

    for (let file in updatedFiles) {
      if (file.split(".")[1] === "pdf") {
        setIsValid(false);
        updateFilesCb([]);
      }
      callUpdateFilesCb(updatedFiles);
    }
    if (Object.keys(ctx.files).length > 0) {
      ctx.setIsDisabledOnUp(true);
    }
  };

  const removeFile = (fileName) => {
    delete ctx.files[fileName];
    ctx.setFiles({ ...ctx.files });
    callUpdateFilesCb({ ...ctx.files });
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
          <p>Drag and drop your DOC/DOCX/PAGES files anywhere</p>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            disabled={ctx.isDisabledOnUp}>
            <i className="fas fa-file-upload" />
            <span> Upload Files</span>
          </Button>
          <input
            className={classes.input}
            type="file"
            ref={fileInputField}
            value=""
            disabled={ctx.isDisabledOnUp}
            onChange={handleNewFileUpload}
            {...otherProps}
          />
        </Container>
        <article className={classes.filePreviewContainer}>
          <span>To Convert</span>
          <section className={classes.previewList}>
            {!isValid
              ? ""
              : Object.keys(ctx.files).map((fileName, index) => {
                  let file = ctx.files[fileName];
                  return (
                    <section
                      key={fileName}
                      className={classes.previewContainer}>
                      <div>
                        <div className={classes.fileMetada}>
                          <span>{file.name}</span>
                          <aside>
                            <span>{convertBytesToKB(file.size)} kb </span>
                            <aside>
                              <span>{convertBytesToKB(file.size)} kb</span>
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => removeFile(fileName)}
                              />
                            </aside>
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
