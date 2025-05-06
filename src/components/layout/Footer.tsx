'use client';

import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaTiktok, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import LoginCard from '../auth/LoginCard';
import RegisterCard from '../auth/RegisterCard';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleShowLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Here you would typically make an API call to handle the subscription
    setIsSubscribed(true);
    setError('');
    setEmail('');
  };

  return (
    <>
    <footer className="bg-[#181C2A] text-gray-200 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & Social */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              {/* Replace with your logo SVG if needed */}
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <span className="text-2xl font-bold">LeadLinx</span>
          </div>
          <p className="text-gray-400">
            Streamline your administrative tasks, access critical patient data, and enhance collaboration among your healthcare team effortlessly.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaFacebookF /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaTwitter /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaYoutube /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaGoogle /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaTiktok /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaInstagram /></a>
            <a href="#" className="bg-[#23263A] hover:bg-indigo-600 p-2 rounded-full"><FaLinkedinIn /></a>
          </div>
        </div>
        {/* Pages Columns */}
        <div>
          <h4 className="font-semibold mb-3">Pages</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" onClick={() => setIsRegisterOpen(true)}>Register</a></li>
            <li><a href="#" onClick={() => setIsLoginOpen(true)}>Sign in</a></li>
            <li><a href="http://localhost:3000/scholarships">Scholarships</a></li>
            <li><a href="http://localhost:3000/experts">Find Experts</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Pages</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="http://localhost:3000/ai-assistant">AI Assistant</a></li>
            <li><a href="#">Lörem</a></li>
            <li><a href="#">Join Experts Using Video Call</a></li>
            <li><a href="#">Lörem</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2"><FaPhone /> (406)555-0120</li>
            <li className="flex items-center gap-2"><FaEnvelope /> mangcoding123@gmail.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 2972 Westheimer Rd. Santa Ana, Illinois 85486</li>
          </ul>
        </div>
      </div>
      {/* Back to Top Button */}
      <div className="max-w-7xl mx-auto flex justify-end mt-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
    <LoginCard 
    isOpen={isLoginOpen}
    onClose={() => setIsLoginOpen(false)}
    onShowRegister={() => {
      setIsLoginOpen(false);
      setIsRegisterOpen(true);
    }}
  />
  <RegisterCard 
    isOpen={isRegisterOpen}
    onClose={() => setIsRegisterOpen(false)}
    onShowLogin={handleShowLogin}
  />
</>
  );
};

export default Footer;
