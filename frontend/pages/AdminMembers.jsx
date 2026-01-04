// src/pages/AdminMembers.jsx
import { useEffect } from "react";
import { useAdminMembership } from "../hooks/useAdminMembership";
import { useMembership } from "../hooks/useMembership";

const AdminMembers = () => {
  const { fetchMembers, verifyUser } = useAdminMembership();
  const { users } = useMembership();

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Manage Members</h2>
      {users.length === 0 ? (
        <p>No members yet.</p>
      ) : (
        users.map((u) => (
          <div key={u._id} className="border p-4 mb-3 rounded shadow">
            <p><strong>{u.membershipForm?.fullName}</strong> ({u.email})</p>
            <p>Status: {u.verificationStatus}</p>
            <div className="mt-2">
              <button
                onClick={() => verifyUser(u._id, "verified")}
                className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
              >
                Verify
              </button>
              <button
                onClick={() => verifyUser(u._id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMembers;
