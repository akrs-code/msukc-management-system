import React, { useState, useCallback } from "react";

const DragDropUpload = ({ onFileSelect, preview, label }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                onFileSelect(file);
            }
        },
        [onFileSelect]
    );

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">
                {label}
            </label>

            <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-200
          ${dragActive
                        ? "border-[#BB2A1D] bg-red-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                {preview ? (
                    <img
                        src={preview instanceof File ? URL.createObjectURL(preview) : preview}
                        alt="preview"
                        className="object-cover max-h-56 rounded-xl shadow-md border border-gray-200"
                    />
                ) : (
                    <div className="text-center font-montserrat">
                        <p className="text-gray-700 font-semibold mb-1">
                            Drag & Drop your image here
                        </p>
                        <p className="text-sm text-gray-500">
                            or <span className="text-[#BB2A1D] font-semibold">click</span> to upload
                        </p>
                    </div>
                )}


                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) =>
                        e.target.files[0] && onFileSelect(e.target.files[0])
                    }
                />
            </div>
        </div>
    );
};

export default DragDropUpload;
