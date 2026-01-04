import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "../context/useAuthContext.jsx";
import { PostContextProvider } from "../context/usePostContext.jsx";
import { MembershipContextProvider } from "../context/useMembershipContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <MembershipContextProvider>
          <App />
        </MembershipContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
