import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const FilePreview = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages({ numPages });
  };

  const goToPrevPage = () => setNumPages({ pageNumber: pageNumber - 1 });
  const goToNextPage = () => setNumPages({ pageNumber: pageNumber + 1 });

  // const { pageNumber, numPages } = this.state;

  return (
    <div>
      <nav>
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
      </nav>

      <div style={{ width: 600 }}>
        <Document file={props.onGet} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={600} />
        </Document>
      </div>
    </div>
  );
};

export default FilePreview;
