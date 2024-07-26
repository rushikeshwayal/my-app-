import React from 'react';

function Home() {
  return (
    <div>
    <section class="bg-blue-500 text-white py-16">
        <div class="container mx-auto flex flex-col items-center justify-center text-center">
            <h2 class="text-4xl font-extrabold mb-4">Manage Your Inventory Efficiently</h2>
            <p class="text-lg mb-8">Our app provides you with the best tools to keep track of your inventory and streamline your operations.</p>
            <a href="." class="bg-white text-blue-500 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-200">Get Started</a>
        </div>
    </section>

   
    <section class="py-16">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold mb-4">Real-Time Tracking</h3>
                    <p>Track your inventory in real-time with our easy-to-use dashboard and stay updated with the latest changes.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold mb-4">Detailed Reports</h3>
                    <p>Generate comprehensive reports to analyze your inventory data and make informed decisions.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold mb-4">Automated Alerts</h3>
                    <p>Receive automated alerts for low stock levels and other critical inventory updates to avoid shortages.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 Inventory App. All rights reserved.</p>
            <div class="mt-4">
                <a href="." class="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
                <a href="." class="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
            </div>
        </div>
    </footer>
    </div>
  );
}

export default Home;
