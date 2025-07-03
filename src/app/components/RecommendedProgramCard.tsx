'use client';

import React, { useState } from 'react';
import { call_deepseek_for_roadmap } from '../(utils)/call_deepseek_for_roadmap/call_deepseek_for_roadmap';
import Toast from '@/app/components/common/Toast';
import { call_deepseek_for_application_links } from '../(utils)/call_deepseek_for_application_links/call_deepseek_for_application_links';

interface ProgramProps {
  title: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
  description: string;
  deadline: string;
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
  deadline,
  isFavorite,
  onFavoriteClick,
  onLearnMore,
 
}: ProgramProps) => {
  const [loading,setloading]=React.useState(false)
  
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick();
  };

  const isDeadlinePassed = () => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  const isDeadlineApproaching = () => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };
  const onStartJourney=async()=>{
       setloading(true)
     
      const res= await call_deepseek_for_roadmap("journey",university, title, deadline)
     console.log(res)
      if(res.message=="Journey saved successfully"){
      
        settoastType("success")
        setToastMessage('Journey saved successfully');
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      } else if(res.message=="Internal Server Error") {
        
        settoastType("failed")
        setToastMessage('Failed to process');
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      }

      const res2= await call_deepseek_for_application_links("Application_Links",university, title, deadline)

      if(res2.message=="Application_Links saved successfully"){

        settoastType("success")
        setToastMessage('Application_Links saved successfully');
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      } else if(res2.message=="Internal Server Error") {

        settoastType("failed")
        setToastMessage('Failed to process');
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      }
      setloading(false)
    

  }
  return (
    <>
      {/*  */}
      <div className="relative mb-10 overflow-hidden bg-gradient-to-br from-white via-white to-blue-50 
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

          {/* Add Deadline Section */}
          <div className={`mb-4 px-3 py-2 rounded-lg inline-block
            ${isDeadlinePassed() 
              ? 'bg-red-100 text-red-800' 
              : isDeadlineApproaching()
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
            }`}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <span className="text-xs font-medium">
                  {isDeadlinePassed() 
                    ? 'Deadline Passed' 
                    : isDeadlineApproaching()
                    ? 'Deadline Approaching'
                    : 'Application Deadline'}
                </span>
                <p className="text-xs">{deadline}</p>
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

          {/* Description and Buttons */}
          <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <p className="text-sm text-gray-600 md:max-w-[60%]">{description}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => onLearnMore()}
                className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-lg
                  hover:bg-blue-800 transition-colors duration-300
                  font-medium text-xs md:text-xs"
              >
                Learn More
              </button>
              
              {/* Start Journey Button with Tooltip */}
              <div className="flex-1 relative group/tooltip">
                <button
                  onClick={() => onStartJourney()}
                  disabled={loading || isDeadlinePassed()}
                  className={`w-full px-4 py-2 rounded-lg font-medium text-xs md:text-xs flex items-center justify-center gap-2
                    transition-all duration-300
                    ${isDeadlinePassed()
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white hover:from-blue-800 hover:to-blue-950'
                    }`}
                >
                  
                  {loading ? 'Processing Action...' : 'Start Journey'}
                </button>
                
                {/* Tooltip */}
                {isDeadlinePassed() && (
                  <div className="absolute bottom-full left-[20%] -translate-x-1/2 mb-2 w-64 
                    opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="z-100 mr-5 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
                      <p>Deadline has passed. Please check for updated sessions in Find Study Programmes section.</p>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                        border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0">
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast&&<Toast
        type={toastType}
        message={toastMessage}
      />}
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.isFavorite === nextProps.isFavorite;
});

export default RecommendedProgramCard; 