import { useReducer } from "react";
import ContextProvider from "./Provider";

const defaultState = {
  currentUser: JSON.parse(localStorage.getItem("SocialUser")) || null,
  isFetching: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: action.currentUser,
        isFetching: action.isFetching,
      };
    case "FOLLOW":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          following: [...state.currentUser.following, action.id],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          following: state.currentUser.following.filter(
            (following) => following !== action.id
          ),
        },
      };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

const ContextReducer = (props) => {
  return (
    <ContextProvider.Provider value={useReducer(reducer, defaultState)}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ContextReducer;
