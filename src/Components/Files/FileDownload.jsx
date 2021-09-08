import React from "react";

const FileDownload = (props) => {
  console.log(props);
  const downloadEmployeeData = () => {
    fetch("http://localhost:8000/convert").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "employees.pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  return (
    <div id="container">
      <h1>Download File</h1>

      <button onClick={downloadEmployeeData}>Download</button>
    </div>
  );
};

export default FileDownload;
