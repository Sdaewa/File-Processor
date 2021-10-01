import { createContext } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  <StateContext.Provider>{props.children}</StateContext.Provider>;
};
