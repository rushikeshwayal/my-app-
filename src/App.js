import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/nav';
import Home from './components/home';
import Footer from './components/footer';
import RegistrationForm from './components/Login_Registration/RegistrationForm';
import LoginForm from './components/Login_Registration/LoginForm';
import DepartmentNav from './components/Department/DepartmentNav';
import HealthcareInventoryForm from './components/Department/AddProductToDept';

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
            <Route path="/Department-home" element={<DepartmentNav />} />
            <Route path="/add-Product" element={<HealthcareInventoryForm />}  />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
