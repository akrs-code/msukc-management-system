import React, { useState } from "react";
import Header from "../components/Header";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("All fields are required.");
      return;
    }

    const templateParams = {
      title: "Contact Form Submission",
      name: form.name,
      email: form.email,
      subject: form.subject,
      time: new Date().toLocaleString(),
      message: form.message,
    };

    emailjs
      .send(
        "service_w69ieeh", // ⚡ your EmailJS service ID
        "template_ymofm0b", // ⚡ your EmailJS template ID
        templateParams,
        "a9gDxUW1RUQf7JcIz" // ⚡ your public key
      )
      .then(() => {
        setSuccess("Your message has been sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Email send error:", error);
        setError("Failed to send message. Please try again later.");
      });
  };

  return (
    <div>
      <Header />
      {/* Header */}
      <div className="text-center mb-2 mt-12">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-[#202020]">
          Contact <span className="text-[#BB2A1D]">Us</span>
        </h1>
        <p className="text-[#181818] text-sm font-montserrat mt-2">
          Have a question or feedback? Send us a message and we’ll get back to
          you.
        </p>
      </div>

      <div className="py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-md space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D]"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#BB2A1D] hover:bg-[#922019] text-white font-semibold py-2 rounded-md transition-colors font-roboto"
          >
            Send Message
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
    </div>
  );
};

export default Contact;
