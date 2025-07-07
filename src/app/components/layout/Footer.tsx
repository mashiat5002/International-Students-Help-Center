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
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

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
    setIsSubscribed(true);
    setError('');
    setSubscriptionEmail(email);
    setIsRegisterOpen(true);
    setEmail('');
  };

  return (
    <>
    <footer className="bg-[#181C2A] text-gray-200 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & Social */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-950 p-2 rounded-lg">
              {/* Replace with your logo SVG if needed */}
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <span className="text-2xl font-bold">ISHC</span>
          </div>
          <p className="text-gray-400 text-xs">
            The International Students Help Center represents a comprehensive solution to the challenges faced by international students. By combining AI technology, expert consultation, and comprehensive resource management, we've created a platform that not only simplifies the study abroad process but also enhances the overall educational experience.
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
          <ul className="space-y-5 mt-7 text-gray-400">
            <li><a className='cursor-pointer ' onClick={() => setIsRegisterOpen(true)}>Register</a></li>
            <li><a className='cursor-pointer' onClick={() => setIsLoginOpen(true)}>Sign in</a></li>
            <li><a href="http://localhost:3000/scholarships">Scholarships</a></li>
          </ul>
        </div>
        <div>
          <ul className="space-y-5 mt-7 text-gray-400">
            <li><a href="http://localhost:3000/ai-assistant">AI Assistant</a></li>
            <li><a href="http://localhost:3000/experts">Find Experts</a></li>

            <li><a href="#">Join Experts Using Video Call</a></li>
           
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2"><FaPhone /> +88 01798680206</li>
            <li className="flex items-center gap-2"><FaEnvelope /> mashiath342@gmail.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 119 Osmani Medical Road Sylhet Bangladesh</li>
          </ul>
        </div>
      </div>
      {/* Subscription Box at the bottom */}
      <div className="max-w-2xl mx-auto mt-10 mb-6 ">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            className="px-4 py-2 rounded-lg bg-[#23263A] border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-gray-400 w-64 max-w-full"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-1 text-center">{error}</p>}
      </div>
      {/* Back to Top Button */}
      <div className="max-w-7xl mx-auto flex justify-end ">
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
    initialEmail={subscriptionEmail}
  />
</>
  );
};

export default Footer;
