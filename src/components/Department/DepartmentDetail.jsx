import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function InventoryList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/healthcare');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Inventory List</h1>
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">Error: {error}</p>
      ) : items.length > 0 ? (
        <div className="w-full max-w-4xl space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.camera_photo}
                alt={item.item_name}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-6 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold mb-2">{item.item_name}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Expiry Date:</span> {new Date(item.expiry_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Manufacturing Date:</span> {new Date(item.manufacturing_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Manufacturer:</span> {item.manufacturer_name}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Authority Email:</span> {item.authority_email}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Department:</span> {item.department_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No items found.</p>
      )}
    </div>
    </div>
  );
}

export default InventoryList;
