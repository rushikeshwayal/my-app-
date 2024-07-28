// DepartmentNav.js
import React from 'react';
import { Link } from 'react-router-dom';

function DepartmentNav() {
  return (
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
  );
}

export default DepartmentNav;
