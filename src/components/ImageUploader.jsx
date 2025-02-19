import React, { useState } from 'react'

export default function ImageUploader({ onImageNameChange }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageDetails, setImageDetails] = useState({
      name: "",
      size: "",
      type: "",
      width: 0,
      height: 0,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          setImagePreview(imageUrl);

        const img = new Image();
        img.onload = () => {
          setImageDetails({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            type: file.type,
            width: img.width,
            height: img.height,
          });
        };
        img.src = imageUrl;

        onImageNameChange(file.name); // Passing image name to parent
        } else {
        setImagePreview(null);
        onImageNameChange("");
        }
    };
  return (
    <>
    <div className="  rounded-2xl p-6 w-full max-w-md">
    {imagePreview && (
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          className=" rounded-lg shadow mb-3"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full form-control text-sm text-gray-500 mb-4"
      />

      {imagePreview && (
        <div className="bg-gray-100 rounded-lg p-4">
        <h5 className="font-semibold text-lg mb-2">📄 Image Details:</h5>
        <ul className="text-gray-700 text-sm">
          <li>
            <strong>File Name:</strong> {imageDetails.name}
          </li>
          <li>
            <strong>File Size:</strong> {imageDetails.size}
          </li>
          <li>
            <strong>File Type:</strong> {imageDetails.type}
          </li>
          <li>
            <strong>Dimensions:</strong> {imageDetails.width} ×{" "}
            {imageDetails.height} px
          </li>
        </ul>
      </div>
      )}
      
    </div>
    </>
  )
}
