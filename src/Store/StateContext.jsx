import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [thereIsFile, setThereIsFile] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [files, setFiles] = useState({});

  return (
    <StateContext.Provider
      value={{
        thereIsFile,
        setThereIsFile,
        isDisabled,
        setIsDisabled,
        files,
        setFiles,
      }}>
      {props.children}
    </StateContext.Provider>
  );
};
