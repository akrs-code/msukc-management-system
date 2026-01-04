import React, { useState } from "react";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DragDropUpload from "../components/DragDropUpload";

const PostForm = () => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("visibility", visibility);
    formData.append("author", author);
    if (image) formData.append("image", image);

    const response = await fetch("/api/post/create", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message || "Something went wrong");
      setSuccess(null);
      setEmptyFields(json.emptyFields || []);
    } else {
      setTitle("");
      setContent("");
      setCategory("");
      setVisibility("public");
      setAuthor("");
      setImage(null);
      setError(null);
      setSuccess("Post created successfully!");
      setEmptyFields([]);
      dispatch({ type: "CREATE_POST", payload: json.post });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-md space-y-6"
      encType="multipart/form-data"
    >
      {/* Title */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
          Post Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full py-2 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 ${emptyFields.includes("title")
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-[#BB2A1D]"
            }`}
        />
      </div>
      {/* Title */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
          Author Name
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full py-2 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 ${emptyFields.includes("author")
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-[#BB2A1D]"
            }`}
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
          Post Content
        </label>
        <textarea
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full py-2 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 ${emptyFields.includes("content")
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-[#BB2A1D]"
            }`}
        />
      </div>

      {/* Category + Visibility */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category */}
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#BB2A1D]"
          >
            <option value="">-- Select Category --</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        {/* Visibility */}
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#BB2A1D]"
          >
            <option value="public">Public</option>
            <option value="members_only">Members Only</option>
          </select>
        </div>
      </div>

      {/* Upload */}
      <DragDropUpload
        label="Upload Image"
        onFileSelect={setImage}
        preview={image}
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#BB2A1D] hover:bg-[#922019] text-white font-semibold py-2 rounded-md transition-colors font-roboto"
      >
        Add Post
      </button>

      {/* Error & Success Messages */}
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
  );
};

export default PostForm;
