// src/components/HealthcareInventoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

function HealthcareInventoryForm() {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    location: '',
    frontCameraPhoto: null,
    backCameraPhoto: null,
  });

  const [qrCode, setQrCode] = useState('');
  const [geoLocation, setGeoLocation] = useState({ lat: null, lng: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoCapture = async (cameraType) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraType },
      });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      stream.getTracks().forEach((track) => track.stop());

      const photoDataUrl = canvas.toDataURL('image/png');
      setFormData({
        ...formData,
        [cameraType === 'user' ? 'frontCameraPhoto' : 'backCameraPhoto']: photoDataUrl,
      });
    } catch (error) {
      console.error('Error capturing photo:', error);
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
          console.error('Error obtaining geolocation:', error);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the backend for QR code generation
    try {
      const response = await axios.post('http://localhost:5000/api/generate-qr', {
        ...formData,
        geoLocation,
      });

      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Healthcare Inventory Form</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-gray-700 mb-2">Capture Photos</label>
          <button
            type="button"
            onClick={() => handlePhotoCapture('user')}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mr-2"
          >
            Capture Front Camera
          </button>
          <button
            type="button"
            onClick={() => handlePhotoCapture('environment')}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Capture Back Camera
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Geolocation</label>
          <button
            type="button"
            onClick={handleGeoLocation}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Get Current Location
          </button>
          {geoLocation.lat && geoLocation.lng && (
            <p className="mt-2 text-gray-600">
              Latitude: {geoLocation.lat}, Longitude: {geoLocation.lng}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Submit
        </button>
      </form>

      {qrCode && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">QR Code:</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default HealthcareInventoryForm;
