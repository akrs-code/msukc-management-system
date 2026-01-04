import { useState } from "react";
import { useMembershipContext } from "../hooks/useMembershipContext";
import { useAuthContext } from "../hooks/useAuthContext"; 

export const useMembership = () => {
  const { dispatch } = useMembershipContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fixed submitForm to handle FormData properly
  const submitForm = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Check if formData is already FormData (for file uploads) or needs to be converted
      const isFormData = formData instanceof FormData;
      
      const res = await fetch("/api/membership/submit", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          // ❌ Don't set Content-Type for FormData - let browser handle it
          ...(isFormData ? {} : { "Content-Type": "application/json" })
        },
        body: isFormData ? formData : JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit form");

      dispatch({ type: "SUBMIT_FORM", payload: data.user });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Personal Info (supports file upload with FormData)
  const updateInfo = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/membership/update", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          // ❌ Do not set Content-Type manually (let browser handle it)
        },
        body: formData, // Must be FormData (not JSON)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update info");

      dispatch({ type: "UPDATE_INFO", payload: data.user });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Admin-only member verification
  const verifyMember = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      // Double-check admin role client-side for UX
      if (user?.role !== "admin") {
        throw new Error("Access denied: Admin privileges required");
      }

      const res = await fetch(`/api/membership/verify/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ verificationStatus: status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    submitForm, 
    updateInfo, 
    verifyMember,
    loading, 
    error 
  };
};