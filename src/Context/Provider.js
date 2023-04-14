import { createContext } from "react";

const ContextProvider = createContext({
  currentUser: null,
  isFetching: false,
});

export default ContextProvider;
