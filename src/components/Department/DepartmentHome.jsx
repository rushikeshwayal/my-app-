import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
function DepartmentHome() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(' http://localhost:5000/api/healthcare '); // Use relative path if proxy is set
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
      
    }

    fetchData();
  }, []);

  return (
    <div className="p-6">
     <Link to="/department-detail"> <h1 className="text-3xl font-bold mb-6">Department Home</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={item.camera_photo}
                alt={item.item_name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.item_name}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Expiry Date: {new Date(item.expiry_date).toLocaleDateString()}</p>
              <p className="text-gray-600">Manufacturer: {item.manufacturer_name}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
      </Link>
    </div>
  );
}

export default DepartmentHome;
