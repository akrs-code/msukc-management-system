import React, { useEffect, useState, useRef } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import ProfileDropdown from "../components/ProfileDropdown";
import Sidebar from "../components/Sidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex">
          <Menu />
        </nav>

        {/* Desktop Profile Dropdown */}
        <div className="hidden lg:flex items-center relative" ref={dropdownRef}>
          <ProfileDropdown
            user={user}
            open={profileOpen}
            setOpen={setProfileOpen}
            handleLogout={handleLogout}
          />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-1 text-[#202020] rounded-md hover:text-[#202020] hover:bg-gray-200 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        user={user}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
