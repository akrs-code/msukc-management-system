import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProtectedRoute from "../components/ProtectedRoutes";
import VerifyMember from "../components/VerifyMember";
import UpdateInfo from "../components/UpdateInfo";
import Approvals from "../components/Approvals";
import Members from "../components/Members";
import Content from "../components/Content";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyMember/>} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/members" element={<Members />} />
        <Route path="/content" element={<Content />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacts" element={<Contact />} />

        {/* Landing page for users and members */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user", "member"]}>
              <Landing />
            </ProtectedRoute>
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
