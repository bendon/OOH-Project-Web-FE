import React, { useEffect, useState } from 'react'
import { uploadFiles } from '../data/lib';

export default function ImageUploader({ onImageNameChange, file = null | undefined }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [imageDetails, setImageDetails] = useState({
      name: "",
      size: "",
      type: "",
      width: 0,
      height: 0,
    });

    const handleFileChange = async (e) => {
      setUploadedImage(false);
      setUploadStatus(true);
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

        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadFiles(formData);
        if (res.status === 200) {
          onImageNameChange(res.data);
          setUploadedImage(true);
          setUploadStatus(false);
        } else {
          setUploadedImage(false);
          setUploadStatus(false);
        }// Passing image name to parent
        } else {
          setUploadedImage(false);
          setUploadStatus(false);
        setImagePreview(null);
        onImageNameChange(null);
        }
    };

    useEffect(()=> {
      if(file !== null && file !== undefined)
      {
        
        setImagePreview(`https://scout.edgetech.co.ke/api/v1/auth/file/${file.fileUrl}`)
        setImageDetails({
          name: file.Name,
          size: (file.fileSize / 1024).toFixed(2) + " KB",
          type: file.fileExtension,
          width: "",
          height: "img.height",
        });
      }

    },[file])
  return (
    <>
    <div className="  rounded-2xl p-2 w-full max-w-md">
   
    {imagePreview ? (
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          className=" rounded-lg shadow mb-3"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      ) : <div style={{height: "300px", backgroundColor:  '#ccc', borderRadius: 20, marginBottom:10}}></div>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full form-control text-sm text-gray-500 mb-4"
      />
       { uploadedImage && <p className='alert alert-success p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}>File uploaded success fully</p>}
      { uploadStatus && <div className='alert alert-info p-2 d-flex align-items-center border-0' style={{fontSize: '12px', borderRadius: 0}}><div className="spinner-border text-white me-3" style={{fontSize: '10px', width: '1rem', height: '1rem'}} role="status"><span className="visually-hidden">Loading...</span></div>please wait ... uploading</div>}
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
