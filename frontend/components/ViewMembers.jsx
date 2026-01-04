import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ViewMembers = () => {
  const { user } = useAuthContext();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all verified members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/membership/all", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const data = await res.json();
        setMembers(
          (data || []).filter(
            (m) => m.verificationStatus === "verified" && m.role === "member"
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, [user]);

  // Handle input change inside modal
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember((prev) => ({
      ...prev,
      membershipForm: {
        ...prev.membershipForm,
        [name]: value,
      },
    }));
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `/api/membership/admin/update/${selectedMember._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(selectedMember.membershipForm),
        }
      );

      if (!res.ok) throw new Error("Failed to update member");
      const updated = await res.json();

      // Update table instantly
      setMembers((prev) =>
        prev.map((m) => (m._id === updated.user._id ? updated.user : m))
      );
      setSuccess("Member updated successfully!");
      setTimeout(() => setSelectedMember(null), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-auto bg-[#ffffff] p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#202020]">
          Our <span className="text-[#BB2A1D]">Members</span>
        </h1>
        <p className="text-[#181818] text-sm font-montserrat mt-2">
          Verified members of the organization
        </p>
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl bg-white overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left font-montserrat">
          <thead className="bg-[#BB2A1D] text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Belt Rank</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr
                key={member._id}
                onClick={() => setSelectedMember(member)}
                className="border border-[#FAFAFA] hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <img
                    src={`http://localhost:8000${member.membershipForm?.image}`}
                    alt={member.membershipForm?.fullName}
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {member.membershipForm?.fullName}
                </td>
                <td className="px-4 py-3">{member.membershipForm?.age}</td>
                <td className="px-4 py-3">{member.membershipForm?.mobile}</td>
                <td className="px-4 py-3">
                  {member.membershipForm?.emailAddress}
                </td>
                <td className="px-4 py-3">
                  {member.membershipForm?.batchName}
                </td>
                <td className="px-4 py-3">
                  {member.membershipForm?.beltRank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {selectedMember && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleUpdate}
            className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md space-y-6 relative font-montserrat overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-[#BB2A1D] text-xl font-bold"
            >
              ✖
            </button>

            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-800 font-cinzel">
              Edit Member Information
            </h3>
            <hr className="border-gray-300" />

            {/* Personal Information */}
            <h4 className="font-semibold text-gray-800">Personal Information</h4>
            <div>
              <label className="block mb-1 text-sm font-montserrat">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={selectedMember.membershipForm?.fullName || ""}
                onChange={handleModalChange}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={selectedMember.membershipForm?.dateOfBirth || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Age</label>
                <input
                  type="number"
                  name="age"
                  value={selectedMember.membershipForm?.age || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Gender</label>
                <select
                  name="gender"
                  value={selectedMember.membershipForm?.gender || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Civil Status</label>
                <select
                  name="status"
                  value={selectedMember.membershipForm?.status || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-montserrat">Home Address</label>
              <input
                type="text"
                name="homeAddress"
                value={selectedMember.membershipForm?.homeAddress || ""}
                onChange={handleModalChange}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Email</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={selectedMember.membershipForm?.emailAddress || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={selectedMember.membershipForm?.mobile || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>

            {/* Education */}
            <h4 className="font-semibold text-gray-800">
              Educational / Professional Background
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Grade / Year Level</label>
                <input
                  type="text"
                  name="gradeLevel"
                  value={selectedMember.membershipForm?.gradeLevel || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Course</label>
                <input
                  type="text"
                  name="course"
                  value={selectedMember.membershipForm?.course || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-montserrat">School</label>
              <input
                type="text"
                name="schoolName"
                value={selectedMember.membershipForm?.schoolName || ""}
                onChange={handleModalChange}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={selectedMember.membershipForm?.occupation || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Office / Company</label>
                <input
                  type="text"
                  name="officeCompany"
                  value={selectedMember.membershipForm?.officeCompany || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>

            {/* Membership */}
            <h4 className="font-semibold text-gray-800">Membership Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Membership ID</label>
                <input
                  type="text"
                  name="membershipId"
                  value={selectedMember.membershipForm?.membershipId || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Batch</label>
                <input
                  type="text"
                  name="batchName"
                  value={selectedMember.membershipForm?.batchName || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-montserrat">Belt Rank</label>
              <input
                type="text"
                name="beltRank"
                value={selectedMember.membershipForm?.beltRank || ""}
                onChange={handleModalChange}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              />
            </div>

            {/* Emergency */}
            <h4 className="font-semibold text-gray-800">
              Emergency Information
            </h4>
            <div>
              <label className="block mb-1 text-sm font-montserrat">Contact Person</label>
              <input
                type="text"
                name="emergencyContactPerson"
                value={selectedMember.membershipForm?.emergencyContactPerson || ""}
                onChange={handleModalChange}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-montserrat">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  value={selectedMember.membershipForm?.relationship || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-montserrat">Contact Number</label>
                <input
                  type="text"
                  name="emergencyContactNumber"
                  value={selectedMember.membershipForm?.emergencyContactNumber || ""}
                  onChange={handleModalChange}
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                />
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-center text-sm">
                {success}
              </div>
            )}

            {/* Actions */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#BB2A1D] hover:bg-[#922019] text-white font-semibold py-2 rounded-md transition-colors font-roboto disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewMembers;
