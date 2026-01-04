import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"; // adjust path if needed

const Menu = () => {
  const { user } = useAuthContext();

  const linkClasses =
    "px-3 py-2 text-sm font-montserrat font-semibold transition-colors duration-300 rounded-lg";

  // Regular user menu
  const userMenu = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contacts", label: "Contacts" },
  ];

  // Admin menu (renamed to feel more professional)
  const adminMenu = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/approvals", label: "Approvals" }, // could also be "Approvals"
    { to: "/members", label: "Members" }, // instead of Profiles
    { to: "/content", label: "Content" }, // "Posts" -> "Content" feels more general
  ];

  // Choose which menu to render
  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4">
      {menu.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive
                ? "text-[#BB2A1D] bg-gray-100 lg:bg-transparent"
                : "text-gray-700 lg:text-[#202020] hover:text-[#BB2A1D]"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
