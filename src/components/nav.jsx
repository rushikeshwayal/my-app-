import React from 'react';

function Navbar() {
  return (
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="." aria-label="Brand">IMC</a>
    <div class="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
      <a class="font-medium text-blue-500 focus:outline-none" href="." aria-current="page">Home</a>
      <a class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href=".">About</a>
      <a class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href=".">Contact-Us</a>
      <a class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href=".">Login/Sign-up</a>
    </div>
  </nav>
</header>
  );
}

export default Navbar;
