import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';

const HeroSection = ({ setActiveItem }: { setActiveItem: Dispatch<SetStateAction<string>> }) => {
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between h-auto md:h-[600px] w-full max-w-5xl mx-auto mt-10 p-6  rounded-2xl  backdrop-blur-md overflow-hidden">
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col items-start justify-center py-8 px-2 md:px-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          Welcome, Expert Consultant!
        </h1>
        <p className="text-lg md:text-2xl text-gray-800 mb-6 max-w-xl">
          Thank you for being a part of the International Students Help Center. Your expertise empowers students worldwide to achieve their dreams. Manage your meetings, seminars, and connect with students seeking guidance.
        </p>
        <button onClick={() => setActiveItem('Meeting Requests')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all duration-300 text-lg">
          View Meeting Requests
        </button>
      </div>
      {/* Right: Animated Logo */}
      <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
        <div
          className={`transition-opacity duration-1000 ease-in-out ${logoVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-extrabold text-blue-700 drop-shadow-lg tracking-wide mb-2">
              ISHC
            </span>
            <span className="text-lg md:text-2xl font-semibold text-blue-900 tracking-wider text-center">
              International Students Help Center
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 