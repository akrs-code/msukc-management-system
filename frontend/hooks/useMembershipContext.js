import { useContext } from "react";
import { MembershipContext } from "../context/useMembershipContext";

export const useMembershipContext = () => {
  const context = useContext(MembershipContext);

  if (!context) {
    throw new Error("useMembershipContext must be used inside a MembershipContextProvider");
  }

  return context;
};
