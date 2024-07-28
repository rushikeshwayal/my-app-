import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav";
import Home from "./components/home";
import Footer from "./components/footer";
import RegistrationForm from "./components/Login_Registration/RegistrationForm";
import LoginForm from "./components/Login_Registration/LoginForm";
import HealthcareInventoryForm from "./components/Department/AddProductToDept";
import DepartmentPage from "./components/Department/DepartmentPage"; // Import the new component
import DepartmentDetail from './components/Department/DepartmentDetail';
import DepartmentAlert from './components/Department/DepartmentAleart';
import WarehouseSpace from "./components/Department/WarehouseSpace";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  return (
    <Router>
      <div className="min-h-screen flex flex-col flex-1">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-1">
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/department-home" element={<DepartmentPage />} />
            <Route path="/add-product" element={<HealthcareInventoryForm />} />
            <Route path="/department-detail" element={<DepartmentDetail />} />
            <Route path="/department-alert" element={< DepartmentAlert />} />
            <Route path="/storage" element={< WarehouseSpace />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
