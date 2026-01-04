import React from "react";
import { X, UserCircle2 } from "lucide-react";
import Menu from "../components/Menu";
import AccountActions from "./AccountActions";

const Sidebar = ({ open, setOpen, user, handleLogout }) => {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform lg:hidden">
        <div className="flex items-center justify-between px-6 pt-4">
          <span className="font-semibold text-gray-800"></span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md hover:bg-gray-100 transition"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 py-6 border-b-2 border-b-gray-200">
          <UserCircle2 className="h-12 w-12 text-gray-700 mb-2" />
          <h1 className="text-lg font-semibold text-gray-700">
            Welcome, {user?.name?.split(" ")[0] || "Guest"}
          </h1>
          <p className="text-sm text-gray-500">
            {user?.email || "Not logged in"}
          </p>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <Menu />
          <AccountActions
            user={user}
            inSidebar
            closeMenus={() => setOpen(false)}
          />
        </div>

        {user && (
          <div className="px-4 py-4 border-t-2 border-t-gray-200">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm font-montserrat font-semibold text-[#BB2A1D] hover:bg-red-50 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
