import React from "react";

const FileDownload = (props) => {
  const download = () => {
    fetch("http://localhost:8000/convert").then((response) => {
      response.blob().then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "newDocument.pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  return (
    <div id="container">
      <h1>Download File</h1>

      <button onClick={download}>Download</button>
    </div>
  );
};

export default FileDownload;
