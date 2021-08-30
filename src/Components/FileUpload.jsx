import React, { useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const FileUpload = () => {
  const classes = useStyles();
  const input = useRef();

  return (
    <div>
      <DropzoneArea
        showPreviews={true}
        dropzoneText="Drag and Drop and file or click here"
        showAlerts={true}
        inputRef={input}
        getFileAddedMessage
        maxFileSize={3000000}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: "row" } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
      />
    </div>
  );
};

export default FileUpload;
