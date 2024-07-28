import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
Chart.register(...registerables);


function InventoryAnalysis() {
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

  // Prepare data for the bar chart
  const chartData = {
    labels: items.map(item => item.item_name),
    datasets: [{
      label: 'Quantity',
      data: items.map(item => item.quantity),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  // Prepare data for the expiry chart
  const expiryData = {
    labels: items.map(item => item.item_name),
    datasets: [{
      label: 'Days Until Expiry',
      data: items.map(item => {
        const expiryDate = new Date(item.expiry_date);
        const today = new Date();
        const diffTime = expiryDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
      }),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }]
  };

  // Prepare data for the space pie chart
  const spaceData = {
    labels: items.map(item => item.item_name),
    datasets: [{
      label: 'Space Utilization',
      data: items.map(item => item.quantity), // Assuming quantity represents space usage
      backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      borderColor: ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
      borderWidth: 1,
    }]
  };

  // Compute total quantity and average quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const averageQuantity = items.length > 0 ? (totalQuantity / items.length).toFixed(2) : 0;

  // Compute the top 3 products by quantity
  const sortedItems = [...items].sort((a, b) => b.quantity - a.quantity);
  const topProducts = sortedItems.slice(0, 3);

  // Compute products nearing expiry (e.g., within the next 30 days)
  const alertProducts = items.filter(item => {
    const expiryDate = new Date(item.expiry_date);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) <= 30;
  });

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
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Inventory Analysis</h1>
      {loading ? (
        <p className="text-blue-500 text-lg">Loading data, please wait...</p>
      ) : error ? (
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
      ) : (
        <>
          {/* Bar Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg mb-8 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Product Quantities</h2>
            <div className="relative h-96"> {/* Adjust height here */}
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return `Quantity: ${tooltipItem.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 45,
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Expiry/Shelf Life Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg mb-8 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Days Until Expiry</h2>
            <div className="relative h-96">
              <Bar
                data={expiryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return `Days Until Expiry: ${tooltipItem.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 45,
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Space Pie Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg mb-8 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Space Utilization</h2>
            <div className="relative h-96">
              <Pie
                data={spaceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Analysis Section */}
          <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Total Quantity:</span> {totalQuantity}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Average Quantity per Product:</span> {averageQuantity}
            </p>
            <h3 className="text-xl font-semibold mb-2">Top 3 Products by Quantity</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {topProducts.map((product, index) => (
                <li key={index}>
                  {product.item_name}: {product.quantity} units
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-6">Alert Products (Expiring Soon)</h3>
            <ul className="list-disc pl-5 text-red-700">
              {alertProducts.length > 0 ? (
                alertProducts.map((product, index) => (
                  <li key={index}>
                    {product.item_name}: Expires in {Math.ceil((new Date(product.expiry_date) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </li>
                ))
              ) : (
                <p className="text-gray-700">No products expiring soon.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
    </div>
    

  );
}

export default InventoryAnalysis;
