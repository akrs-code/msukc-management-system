import { useContext } from "react";
import { PostContext } from "../context/usePostContext";

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw Error("usePostContext must be used inside a PostContextProvider");
  }

  return context;
};
