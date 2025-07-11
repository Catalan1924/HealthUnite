// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from './AppointmentList';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-10xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">HealthUnite</Link>
        <div className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Logout</Link>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700">Home</Link>
          <Link to="/about" className="block py-2 text-gray-700">MedicalHistory</Link>
          <Link to="/contact" className="block py-2 text-gray-700">AppointmentList</Link>
          <Link to="/login" className="block py-2 text-blue-600 font-semibold">Logout</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
