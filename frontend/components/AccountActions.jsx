import React from "react";
import { useNavigate } from "react-router-dom";

const AccountActions = ({ user, inSidebar = false, closeMenus }) => {
    const navigate = useNavigate();
    const linkClasses =
        "px-3 py-2 text-sm font-montserrat font-semibold transition-colors duration-200 rounded-lg text-gray-700 lg:text-gray-700 text-left hover:text-[#BB2A1D] w-full";

    if (!user) return null;
    if (user?.role === "admin") return null;
    return (
        <div className={`flex flex-col gap-2 ${inSidebar ? "mt-4" : ""}`}>
            {user?.verificationStatus === "verified" ? (
                <button
                    onClick={() => {
                        navigate("/update-info");
                        closeMenus?.();
                    }}
                    className={linkClasses}
                >
                    Update Profile
                </button>
            ) : (
                <button
                    onClick={() => {
                        navigate("/verify");
                        closeMenus?.();
                    }}
                    className={linkClasses}
                >
                    Verify Account
                </button>
            )}
        </div>
    );
};

export default AccountActions;
