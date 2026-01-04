import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMembership } from "../hooks/useMembership";
import DragDropUpload from "../components/DragDropUpload";
import Header from "./Header";

const UpdateInfo = () => {
  const { user } = useAuthContext();
  const { updateInfo, loading, error } = useMembership();

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    status: "",
    gradeLevel: "",
    course: "",
    occupation: "",
    schoolName: "",
    officeCompany: "",
    homeAddress: "",
    emailAddress: "",
    mobile: "",
    batchName: "",
    beltRank: "",
    emergencyContactPerson: "",
    relationship: "",
    emergencyContactNumber: "",
    image: null,
  });

  const [originalData, setOriginalData] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user?.membershipForm) {
      const data = {
        fullName: user.membershipForm.fullName || "",
        dateOfBirth: user.membershipForm.dateOfBirth || "",
        age: user.membershipForm.age || "",
        gender: user.membershipForm.gender || "",
        status: user.membershipForm.status || "",
        gradeLevel: user.membershipForm.gradeLevel || "",
        course: user.membershipForm.course || "",
        occupation: user.membershipForm.occupation || "",
        schoolName: user.membershipForm.schoolName || "",
        officeCompany: user.membershipForm.officeCompany || "",
        homeAddress: user.membershipForm.homeAddress || "",
        emailAddress: user.membershipForm.emailAddress || "",
        mobile: user.membershipForm.mobile || "",
        batchName: user.membershipForm.batchName || "",
        beltRank: user.membershipForm.beltRank || "",
        emergencyContactPerson: user.membershipForm.emergencyContactPerson || "",
        relationship: user.membershipForm.relationship || "",
        emergencyContactNumber: user.membershipForm.emergencyContactNumber || "",
        image: null,
      };
      setForm(data);
      setOriginalData(data);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileSelect = (file) => {
    setForm({ ...form, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    const res = await updateInfo(formData);
    if (res && res.message) {
      setSuccess(res.message);
    }
  };

  const handleCancel = () => {
    if (originalData) setForm(originalData);
  };

  const imageUrl = form.image
    ? URL.createObjectURL(form.image)
    : user?.membershipForm?.image
    ? `http://localhost:8000${user.membershipForm.image}`
    : null;

  return (
    <>
      <Header />
      <div className="text-center mb-10 mt-12">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#202020]">
          Update <span className="text-[#BB2A1D]">Profile</span>
        </h1>
        <p className="text-[#121212] text-sm font-montserrat mt-2">
          Keep your membership details accurate and up to date
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md space-y-8"
        encType="multipart/form-data"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Update Personal Information
        </h3>

        {/* Upload */}
        <DragDropUpload
          label="Update Profile Photo"
          onFileSelect={handleFileSelect}
          preview={imageUrl}
        />

        {/* Personal Information */}
        <h4 className="font-semibold text-gray-800">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <InputField label="Date of Birth" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
          <InputField label="Age" name="age" value={form.age} onChange={handleChange} />
          <InputField label="Gender" name="gender" value={form.gender} onChange={handleChange} />
          <InputField label="Status (Single/Married)" name="status" value={form.status} onChange={handleChange} />
          <InputField label="Home Address" name="homeAddress" value={form.homeAddress} onChange={handleChange} />
          <InputField label="Email Address" type="email" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
          <InputField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
        </div>

        {/* Education & Work */}
        <h4 className="font-semibold text-gray-800">Education & Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Grade / Year Level" name="gradeLevel" value={form.gradeLevel} onChange={handleChange} />
          <InputField label="Course" name="course" value={form.course} onChange={handleChange} />
          <InputField label="School Name" name="schoolName" value={form.schoolName} onChange={handleChange} />
          <InputField label="Occupation" name="occupation" value={form.occupation} onChange={handleChange} />
          <InputField label="Office / Company" name="officeCompany" value={form.officeCompany} onChange={handleChange} />
        </div>

        {/* Membership Details */}
        <h4 className="font-semibold text-gray-800">Membership Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Batch Name" name="batchName" value={form.batchName} onChange={handleChange} />
          <InputField label="Belt Rank (Kyu/Dan)" name="beltRank" value={form.beltRank} onChange={handleChange} />
        </div>

        {/* Emergency Contact */}
        <h4 className="font-semibold text-gray-800">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Contact Person" name="emergencyContactPerson" value={form.emergencyContactPerson} onChange={handleChange} />
          <InputField label="Relationship" name="relationship" value={form.relationship} onChange={handleChange} />
          <InputField label="Contact Number" name="emergencyContactNumber" value={form.emergencyContactNumber} onChange={handleChange} />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#BB2A1D] hover:bg-[#922019] text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>

        {/* Feedback */}
        {error && <p className="text-red-500 text-center text-sm mt-2 font-montserrat">{error}</p>}
        {success && <p className="text-green-600 text-center text-sm mt-2 font-montserrat">{success}</p>}
      </form>
    </>
  );
};

// Reusable InputField Component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D]"
    />
  </div>
);

export default UpdateInfo;
