'use client';

import React from 'react';

interface ProgramProps {
  title: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
  description: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  onLearnMore: () => void;
  onStartJourney?: () => void;
}

const RecommendedProgramCard = React.memo(({
  title,
  university,
  country,
  duration,
  tuition,
  description,
  isFavorite,
  onFavoriteClick,
  onLearnMore,
  onStartJourney = () => console.log('Start Journey clicked')
}: ProgramProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-blue-50 
      rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 
      border border-blue-100 group w-full">
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />

      {/* Favorite Button with new styling */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-10 pointer-events-auto bg-white/80 p-2 rounded-full
          shadow-lg backdrop-blur-sm hover:bg-white transition-all duration-300
          group-hover:scale-110"
      >
        <svg 
          className={`w-5 h-5 transition-colors duration-300 ${
            isFavorite 
              ? 'text-red-500 fill-red-500' 
              : 'text-gray-400 hover:text-red-500'
          }`}
          fill="none"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      </button>

      <div className="p-4 md:p-6">
        {/* Title and University Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <div className="w-full md:w-auto mb-3 md:mb-0">
            <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2">{title}</h3>
            <div className="flex items-center text-sm text-blue-700 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
              {university}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-blue-50/50 p-3 rounded-xl">
            <div className="text-xs text-blue-600 mb-1">Location</div>
            <div className="text-sm font-medium text-blue-900">{country}</div>
          </div>
          <div className="bg-blue-50/50 p-3 rounded-xl">
            <div className="text-xs text-blue-600 mb-1">Duration</div>
            <div className="text-sm font-medium text-blue-900">{duration}</div>
          </div>
          <div className="bg-blue-50/50 p-3 rounded-xl">
            <div className="text-xs text-blue-600 mb-1">Tuition Fee</div>
            <div className="text-sm font-medium text-blue-900">{tuition}</div>
          </div>
        </div>

        {/* Description and Button */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="text-sm text-gray-600 md:max-w-[60%]">{description}</p>
          <div className="mt-4 flex gap-4 ">
            <button
              onClick={() => onLearnMore()}
              className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-lg
                hover:bg-blue-800 transition-colors duration-300
                font-medium text-xs md:text-xs"
            >
              Learn More
            </button>
            <button
              onClick={() => onStartJourney()}
              className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-4 py-2 rounded-lg
                hover:from-blue-800 hover:to-blue-950 transition-all duration-300
                font-medium text-xs md:text-xs"
            >
              Start Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isFavorite === nextProps.isFavorite;
});

export default RecommendedProgramCard; 