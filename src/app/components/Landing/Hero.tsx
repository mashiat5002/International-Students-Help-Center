'use client';
import { useState, useEffect } from 'react';

import ExpertRegisterCard from '../auth/ExpertRegisterCard';
import ExpertLoginCard from '../auth/ExpertLoginCard';
import { call_fetch_slider_images } from '@/app/(utils)/call_fetch_slider_images/call_fetch_slider_images';

type ImageTable = {
  img: String,
  img_name: String,
  __v: Number,
  _id: String,
}

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [images, setImages] = useState<ImageTable[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        images.length === 0
          ? 0
          : prevIndex === images.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fun = async () => {
      setLoadingImage(true);
      try {
        // Fetch images from the server
      const res = await call_fetch_slider_images();

      setLoadingImage(false);
      setImages(res.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoadingImage(false);
      }
    };


    fun();
  }, []);

  const handleRegisterClick = () => {
    setIsButtonClicked(true);
    setShowRegisterCard(true);
  };

  const handleLoginClick = () => {
    setIsButtonClicked(true);
    setShowLoginCard(true);
  };

  const handleClose = () => {
    setShowRegisterCard(false);
    setShowLoginCard(false);
    setIsButtonClicked(false);
  };

  const handleShowLogin = () => {
    setShowRegisterCard(false);
    setShowLoginCard(true);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Register Card Modal */}
      <ExpertRegisterCard 
        isOpen={showRegisterCard} 
        onClose={handleClose}
        onShowLogin={handleShowLogin}
      />

      {/* Login Card Modal */}
      <ExpertLoginCard 
        isOpen={showLoginCard} 
        onClose={handleClose}
        onShowRegister={() => {
          setShowLoginCard(false);
          setShowRegisterCard(true);
        }}
      />

      {/* Background Images */}
      {(images.length > 0 ? images : [{ img: '/students.jpg' }]).map((image, index) => (
        <div
          key={ index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${image.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000033]/70" /> {/* Semi-transparent navy blue overlay */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            International Students Help Center
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Your gateway to international education. Find scholarships, connect with experts, 
            and get AI-powered guidance for studying abroad.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <button 
              onClick={handleRegisterClick}
              className={`bg-white text-[#000033] px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                isButtonClicked && showRegisterCard ? 'scale-95 bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              Register as Expert
            </button>
            <button 
              onClick={handleLoginClick}
              className={`border-2 border-white text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                isButtonClicked && showLoginCard ? 'scale-95 bg-white/20' : 'hover:bg-white hover:text-[#000033]'
              }`}
            >
              Sign In as Expert
            </button>
          </div>
        </div>
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {(loadingImage ?[] :images  ).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}