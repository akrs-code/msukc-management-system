import React, { useEffect, useState } from "react";
import { useMembership } from "../../hooks/useMembership";
import { useAuthContext } from "../../hooks/useAuthContext";

const VerifyMembers = () => {
  const { user } = useAuthContext();
  const { verifyMember, loading, error } = useMembership();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/membership/pending", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const data = await res.json();
        setMembers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch pending members:", err);
      }
    };

    if (user?.token) {
      fetchMembers();
    }
  }, [user]);

  const handleVerify = async (id, status) => {
    try {
      await verifyMember(id, status);
      setMembers((prev) => prev.filter((m) => m._id !== id));
      setIsModalOpen(false);
      setSelectedMember(null);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#181818] p-4">
        <div className="w-full max-w-md bg-white p-10 shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800  mb-4">Access Denied</h3>
            <p className="text-gray-600 text-sm font-montserrat">
              Admin privileges required to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className=" text-3xl md:text-4xl font-bold font-cinzel text-[#202020]">
            Pending <span className="text-[#BB2A1D]">Members</span>
          </h1>
          <p className="text-[#121212] text-sm font-montserrat mt-2">
            Review and verify new member applications
          </p>
        </div>

        {loading && (
          <div className="bg-white  shadow-md p-6 mb-6">
            <p className="text-center text-gray-600 font-montserrat">Processing verification...</p>
          </div>
        )}

        {error && (
          <div className="bg-white  shadow-md p-6 mb-6">
            <p className="text-center text-red-500 font-montserrat">Error: {error}</p>
          </div>
        )}

        {members.length === 0 ? (
          <div className="bg-white shadow-md p-10 text-center">
            <h3 className="text-lg font-bold text-gray-800 font-montserrat mb-2">No Pending Applications</h3>
            <p className="text-gray-600 text-sm font-montserrat">All membership applications have been processed.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left font-montserrat">
                <thead className="bg-[#BB2A1D] text-white text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Mobile Number</th>
                    <th className="px-4 py-3">Belt Rank</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                      <td className="pl-6 pr-20 py-4">
                        <div className="flex items-center space-x-4">
                          {member.membershipForm?.image && (
                            <img
                              className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                              src={`http://localhost:8000${member.membershipForm?.image}`}
                              alt="Profile"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-800 font-montserrat">
                              {member.membershipForm?.fullName || member.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600 font-montserrat">
                              {member.membershipForm?.batchName || "No batch"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-montserrat">{member.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-montserrat">{member.membershipForm?.mobile || "N/A"}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800 font-montserrat">{member.membershipForm?.beltRank || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-montserrat">{formatDate(member.membershipForm?.submittedAt)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openModal(member)}
                          className="bg-[#BB2A1D] hover:bg-[#922019] text-white py-2 px-4 text-sm rounded-md font-roboto transition-colors"
                        >
                          Review Application
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isModalOpen && selectedMember && (
          <div className="fixed inset-0 bg-gray-50 bg-opacity-100 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-4 w-11/12 max-w-4xl">
              <div className="bg-white rounded-2xl shadow-md p-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 ">Application Review</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl font-montserrat">×</button>
                </div>
                <hr className="border-gray-300 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#BB1A1D] border-b border-gray-400 pb-2">Personal Information</h4>
                    <div className="space-y-3">
                      <p className="font-montserrat text-sm">Full Name: {selectedMember.membershipForm?.fullName || "Not provided"}</p>
                      <p className="font-montserrat text-sm">Email: {selectedMember.email}</p>
                      <p className="font-montserrat text-sm">Mobile: {selectedMember.membershipForm?.mobile || "Not provided"}</p>
                      <p className="font-montserrat text-sm">Date of Birth: {formatDate(selectedMember.membershipForm?.dateOfBirth)}</p>
                      <p className="font-montserrat text-sm">Age: {selectedMember.membershipForm?.age || "Not provided"}</p>
                      <p className="font-montserrat text-sm">Gender: {selectedMember.membershipForm?.gender || "Not provided"}</p>
                      <p className="font-montserrat text-sm">Status: {selectedMember.membershipForm?.status || "Not provided"}</p>
                      <p className="font-montserrat text-sm">Home Address: {selectedMember.membershipForm?.homeAddress || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#BB1A1D]  border-b border-gray-400 pb-2">Academic / Professional</h4>
                    <div className="space-y-3">
                      <p className="text-sm font-montserrat"> Level: {selectedMember.membershipForm?.gradeLevel || "Not provided"}</p>
                      <p className="text-sm font-montserrat">Course: {selectedMember.membershipForm?.course || "Not provided"}</p>
                      <p className="text-sm font-montserrat">School: {selectedMember.membershipForm?.schoolName || "Not provided"}</p>
                      <p className="text-sm font-montserrat">Occupation: {selectedMember.membershipForm?.occupation || "Not provided"}</p>
                      <p className="text-sm font-montserrat">Office/Company: {selectedMember.membershipForm?.officeCompany || "Not provided"}</p>
                      <p className="text-sm font-montserrat">Batch: {selectedMember.membershipForm?.batchName || "Not provided"}</p>
                      <p className="text-sm font-montserrat">Belt Rank: {selectedMember.membershipForm?.beltRank || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 mt-4">
                  <h4 className="text-lg font-bold text-[#BB1A1D]  border-b border-gray-400 pb-2 mb-4">Emergency Information</h4>
                  <p className="text-sm font-montserrat">Contact Person: {selectedMember.membershipForm?.emergencyContactPerson || "Not provided"}</p>
                  <p className="text-sm font-montserrat">Relationship: {selectedMember.membershipForm?.relationship || "Not provided"}</p>
                  <p className="text-sm font-montserrat">Contact Number: {selectedMember.membershipForm?.emergencyContactNumber || "Not provided"}</p>
                </div>

                {selectedMember.membershipForm?.image && (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-[#BB1A1D]  border-b border-gray-400 pb-2 mb-4">Profile Photo</h4>
                    <img src={`http://localhost:8000${selectedMember.membershipForm?.image}`} alt="Profile" className="h-56 w-56 rounded-2xl object-cover border-2 border-gray-200 shadow-md" />
                  </div>
                )}
                 </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600 font-montserrat"><strong>Application Status:</strong> {selectedMember.verificationStatus}</p>
                  <p className="text-sm text-gray-600 mt-1 font-montserrat"><strong>Submitted:</strong> {formatDate(selectedMember.membershipForm?.submittedAt)}</p>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <button onClick={closeModal} className="w-full py-2 px-6 border border-gray-300 rounded-md text-gray-600 text-sm font-montserrat hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={() => handleVerify(selectedMember._id, "rejected")} className="w-full py-2 px-6 bg-[#BB2A1D] hover:bg-[#BB2A1D]/80 text-white text-sm rounded-md font-roboto transition-colors disabled:opacity-50" disabled={loading}>{loading ? "Processing..." : "Application Rejected"}</button>
                  <button onClick={() => handleVerify(selectedMember._id, "verified")} className="w-full py-2 px-6 bg-[#1DBB2A] hover:bg-[#1DBB2A]/80 text-white text-sm rounded-md font-roboto transition-colors disabled:opacity-50" disabled={loading}>{loading ? "Processing..." : "Application Approved"}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyMembers;
