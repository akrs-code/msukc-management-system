import { useState } from "react";
import { useMembership } from "../hooks/useMembership";
import DragDropUpload from "../components/DragDropUpload";

const MembershipForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    status: "Single",
    homeAddress: "",
    emailAddress: "",
    mobile: "",
    gradeLevel: "",
    course: "",
    schoolName: "",
    occupation: "",
    officeCompany: "",
    membershipId: "",
    batchName: "",
    beltRank: "",
    emergencyContactPerson: "",
    relationship: "",
    emergencyContactNumber: "",
    image: null,
  });

  const { submitForm, loading, error } = useMembership();
  const [success, setSuccess] = useState(null);

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

    const res = await submitForm(formData);
    if (res && res.message) {
      setSuccess(res.message);
      setForm({
        fullName: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        status: "Single",
        homeAddress: "",
        emailAddress: "",
        mobile: "",
        gradeLevel: "",
        course: "",
        schoolName: "",
        occupation: "",
        officeCompany: "",
        membershipId: "",
        batchName: "",
        beltRank: "",
        emergencyContactPerson: "",
        relationship: "",
        emergencyContactNumber: "",
        image: null,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-md space-y-6"
        encType="multipart/form-data"
      >
        {/* Heading */}
        <h3 className="text-2xl font-bold text-gray-800 text-center font-cinzel">
          Membership Application
        </h3>
        <p className="text-gray-600 text-sm text-center font-montserrat mb-6">
          Join the Mindanao State University Karate Club and be part of our legacy.
        </p>
        <hr className="border-gray-300" />

        {/* Upload */}
        <DragDropUpload
          label="Upload Profile Photo"
          onFileSelect={handleFileSelect}
          preview={form.image}
        />

        {/* Personal Info */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Civil Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
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
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Home Address
          </label>
          <input
            type="text"
            name="homeAddress"
            value={form.homeAddress}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter your number"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        {/* Education/Professional */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Grade/Year Level
            </label>
            <input
              type="text"
              name="gradeLevel"
              value={form.gradeLevel}
              onChange={handleChange}
              placeholder="e.g. 1st Year"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Course
            </label>
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Enter your course"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            School Name
          </label>
          <input
            type="text"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            placeholder="Enter your school"
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Occupation (if professional)
            </label>
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              placeholder="Enter your occupation"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Office / Company
            </label>
            <input
              type="text"
              name="officeCompany"
              value={form.officeCompany}
              onChange={handleChange}
              placeholder="Enter your office/company"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        {/* Membership Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Membership ID
            </label>
            <input
              type="text"
              name="membershipId"
              value={form.membershipId}
              onChange={handleChange}
              placeholder="Enter your membership ID"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Batch Name
            </label>
            <input
              type="text"
              name="batchName"
              value={form.batchName}
              onChange={handleChange}
              placeholder="Enter your batch name"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Belt Rank (Kyu/Dan)
          </label>
          <input
            type="text"
            name="beltRank"
            value={form.beltRank}
            onChange={handleChange}
            placeholder="Enter your rank"
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Emergency Contact Person
          </label>
          <input
            type="text"
            name="emergencyContactPerson"
            value={form.emergencyContactPerson}
            onChange={handleChange}
            placeholder="Enter contact person"
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Relationship
            </label>
            <input
              type="text"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              placeholder="e.g. Parent, Sibling"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Emergency Contact Number
            </label>
            <input
              type="text"
              name="emergencyContactNumber"
              value={form.emergencyContactNumber}
              onChange={handleChange}
              placeholder="Enter number"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#BB2A1D] hover:bg-[#922019] text-white font-semibold py-2 rounded-md transition-colors font-roboto disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Feedback */}
        {error && (
          <div className="text-red-500 text-center text-sm mt-2 font-montserrat">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-center text-sm mt-2 font-montserrat">
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default MembershipForm;
