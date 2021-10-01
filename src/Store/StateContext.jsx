import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [thereIsFile, setThereIsFile] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <StateContext.Provider
      value={{ thereIsFile, setThereIsFile, isDisabled, setIsDisabled }}>
      {props.children}
    </StateContext.Provider>
  );
};
