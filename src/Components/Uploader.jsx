import React, { useState, useRef } from "react";

const Uploader = (props) => {
  const [file, setFile] = useState({});
  const fileInputField = useRef(null);

  return (
    <div>
      <input type="file" ref={fileInputField} />
    </div>
  );
};

export default Uploader;
