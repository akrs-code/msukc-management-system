import React from "react";
import { UserCircle2 } from "lucide-react";
import AccountActions from "../components/AccountActions";

const ProfileDropdown = ({ user, open, setOpen, handleLogout }) => {
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-2 rounded-full hover:bg-gray-200 transition"
      >
        <UserCircle2 className="w-6 h-6 hover:text-[#202020] text-[#202020]" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-72 bg-[#FAFAFA] rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col items-center py-6 bg-gray-50 border border-b-2 border-gray-200">
            <UserCircle2 className="h-12 w-12 text-gray-700 mb-2" />
            <h1 className="text-lg font-semibold text-gray-800">
              Welcome, {user?.name?.split(" ")[0] || "Guest"}
            </h1>
            <p className="text-sm text-gray-500">
              {user?.email || "Not logged in"}
            </p>
          </div>

          <div className="px-4 py-3">
            <AccountActions
              user={user}
              closeMenus={() => setOpen(false)}
            />
          </div>

          {user && (
            <div className="px-4 py-3 border-t-2 border-t-gray-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm font-montserrat font-semibold text-[#BB2A1D] hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
