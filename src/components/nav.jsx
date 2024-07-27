import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <Link className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" to="/" aria-label="Brand">
          IMC
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {!isLoggedIn ? (
            <>
              <Link className="font-medium text-blue-500 focus:outline-none" to="/">
                Home
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/about">
                About
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/contact">
                Contact-Us
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/register">
                Register
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              {/* <Link className="font-medium text-blue-500 focus:outline-none" to="./Department-home">
                Home
              </Link> */}
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/about">
                About
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/contact">
                Contact-Us
              </Link>
              <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/Department-home">
                Profile
              </Link>
              <button
                className="font-medium text-red-500 hover:text-red-600 focus:outline-none"
                onClick={() => {
                  setIsLoggedIn(false);
                  // Optionally, handle additional logout logic here
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      
    </header>
  );
}

export default Navbar;
