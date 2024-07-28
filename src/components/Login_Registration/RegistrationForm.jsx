import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      department: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Registration successful:', result);
          navigate('/login');
        } else {
          const errorData = await response.json();
          setRegistrationError(errorData.message);
          console.error('Registration error:', errorData);
        }
      } catch (error) {
        console.error('Network error:', error);
        setRegistrationError('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="department">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select your department</option>
            <option value="Health">Health</option>
            <option value="Electrical">Electrical</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="IT">IT</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>

        {registrationError && <p className="text-red-500 text-sm mb-4">{registrationError}</p>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
