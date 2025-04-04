'use client';
import { useState, useEffect } from 'react';

const backgroundImages = [
  '/students.jpg',  // You'll need to add these images to your public folder
  '/students_2.jpg',
  '/students_3.jpg',
  '/students_4.jpg',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${image})`,
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
            <button className="bg-white text-[#000033] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-[#000033] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {backgroundImages.map((_, index) => (
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