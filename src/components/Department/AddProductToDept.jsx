import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode

function AddProductToDept() {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    location: "",
    expiryDate: "",
    manufacturingDate: "",
    manufacturerName: "",
    cameraPhoto: null,
  });

  const [geoLocation, setGeoLocation] = useState({ lat: null, lng: null });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null); // To store QR code data
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const startCamera = async (cameraType) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraType },
      });
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();

    const photoDataUrl = canvas.toDataURL("image/png");
    setFormData({
      ...formData,
      cameraPhoto: photoDataUrl,
    });

    // Update geolocation when photo is captured
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
        }
      );
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      item_name: formData.itemName,
      quantity: parseInt(formData.quantity, 10),
      location: formData.location,
      expiry_date: formData.expiryDate,
      manufacturing_date: formData.manufacturingDate,
      manufacturer_name: formData.manufacturerName,
      camera_photo: formData.cameraPhoto,
      latitude: geoLocation.lat,
      longitude: geoLocation.lng,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/add-product", payload);

      if (response.status === 201) {
        console.log("Product added successfully");
        setSubmissionStatus("success");

        // Generate QR code data URL
        setQrCodeData(`http://localhost:5000/api/healthcare/${response.data.id}`);

        // Reset form after successful submission
        setFormData({
          itemName: "",
          quantity: "",
          location: "",
          expiryDate: "",
          manufacturingDate: "",
          manufacturerName: "",
          cameraPhoto: null,
        });
        setGeoLocation({ lat: null, lng: null });
      } else {
        console.error("Error adding product:", response.data.message);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div>
      <div>
        <nav className="relative z-0 flex border rounded-xl divide-x divide-gray-200 overflow-hidden">
          <Link
            to="/Department-home"
            className="group relative min-w-0 flex-1 bg-white py-4 px-4 border-b-2 border-b-blue-600 text-gray-800 text-sm font-medium text-center overflow-hidden focus:z-10 focus:outline-none focus:text-blue-600"
            aria-current="page"
          >
            Home
          </Link>

          <Link
            to="/storage"
            className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600"
          >
            Storage
          </Link>

          <Link
            to="/add-product"
            className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600"
          >
            Add Product
          </Link>
              <Link
          
          className="group relative min-w-0 flex-1 bg-white py-4 px-4 border-b-2 border-b-blue-600 text-gray-800 text-sm font-medium text-center overflow-hidden focus:z-10 focus:outline-none focus:text-blue-600"
          aria-current="page"
        >
         Report 
        </Link>

          <Link
            to="/department-alert"
            className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-red-600 text-sm font-medium text-center overflow-hidden focus:z-10 focus:outline-none"
          >
            Alert
          </Link>
        </nav>
      </div>

      <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add Product to Department</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="itemName">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="manufacturerName">
              Name of Manufacturer
            </label>
            <input
              type="text"
              id="manufacturerName"
              name="manufacturerName"
              value={formData.manufacturerName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter name of manufacturer"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="manufacturingDate">
              Manufacturing Date
            </label>
            <input
              type="date"
              id="manufacturingDate"
              name="manufacturingDate"
              value={formData.manufacturingDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="cameraPhoto">
              Camera Photo
            </label>
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg"
                autoPlay
              ></video>
              <canvas
                ref={canvasRef}
                className="hidden"
              ></canvas>
              <button
                type="button"
                onClick={() => startCamera('environment')}
                className="absolute bottom-2 left-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Start Camera
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                className="absolute bottom-2 left-2 ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Capture Photo
              </button>
            </div>
            {formData.cameraPhoto && (
              <img
                src={formData.cameraPhoto}
                alt="Captured"
                className="mt-4 border border-gray-300 rounded-lg"
              />
            )}
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleGeoLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Get Geo-Location
            </button>
            <p className="text-gray-600 mt-2">
              Latitude: {geoLocation.lat}, Longitude: {geoLocation.lng}
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Product
          </button>
        </form>

        {submissionStatus === "success" && qrCodeData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">QR Code</h3>
            <QRCode value={qrCodeData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProductToDept;
