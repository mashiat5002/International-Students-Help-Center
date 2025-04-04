'use client';

import React, { useState, useEffect } from 'react';
import RecommendedProgramCard from './RecommendedProgramCard';

interface Answer {
  questionId: string;
  answer: string | string[];
}

interface Inquiry {
  id: string;
  date: string;
  answers: Answer[];
  heading: string;
  programs?: any[]; // Using the same program type as in StudyProgrammes component
}

const InquiryCard = React.memo(({ 
  inquiry,
  isSelected,
  onClick 
}: { 
  inquiry: Inquiry;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-lg overflow-hidden border 
      transition-all duration-300 cursor-pointer
      ${isSelected 
        ? 'border-blue-500 shadow-blue-100 scale-[1.02]' 
        : 'border-gray-100 hover:border-blue-300'}`}
  >
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">{inquiry.heading}</h3>
          <p className="text-sm text-gray-600">Inquiry Date: {inquiry.date}</p>
        </div>
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
));

const InquiryDetails = React.memo(({ 
  inquiry,
  onShowResults 
}: { 
  inquiry: Inquiry;
  onShowResults: () => void;
}) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h2 className="text-xl font-bold text-blue-900 mb-2">{inquiry.heading}</h2>
      <p className="text-sm text-gray-600">Submitted on {inquiry.date}</p>
    </div>

    {/* Questions and Answers */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-4">Your Responses</h4>
      <div className="space-y-4">
        {inquiry.answers.map((answer, index) => (
          <div key={index} className="border-b border-blue-100 last:border-0 pb-4 last:pb-0">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Question {index + 1}
            </p>
            <p className="text-sm text-gray-600">
              {Array.isArray(answer.answer) 
                ? answer.answer.join(', ')
                : answer.answer}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Action Button */}
    <div>
      <button
        onClick={onShowResults}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
          transition-colors flex items-center justify-center gap-2"
      >
        View Suggested Programs
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
));

// Add this new component for the results view
const ResultsSection = React.memo(({ 
  onBack,
  favorites = [], 
  onToggleFavorite = (program: any) => {} 
}) => (
  <div className="w-[95%] md:w-[80%] h-[70vh] animate-fadeIn relative mx-auto">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl pointer-events-none" />
    <div className="relative z-10 h-full pointer-events-auto overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4 sticky top-0 z-20 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-lg 
              shadow-lg text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Recommended Study Programmes
          </h2>
        </div>
        <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
          {demoPrograms.length} Programs
        </div>
      </div>
      <div className="h-[calc(100%-4rem)] overflow-y-auto px-1 sm:px-2 md:px-4 custom-scrollbar">
        <div className="flex flex-col gap-4 md:gap-6 pb-6 max-w-[1200px] mx-auto">
          {demoPrograms.map(program => (
            <RecommendedProgramCard
              key={program.title}
              {...program}
              isFavorite={favorites.some(fav => fav.title === program.title)}
              onFavoriteClick={() => onToggleFavorite(program)}
              onLearnMore={() => console.log(`Learn more about ${program.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
));

// Add demo programs data (same as in StudyProgrammes)
const demoPrograms = [
  {
    title: "Computer Science",
    university: "Massachusetts Institute of Technology",
    country: "United States",
    duration: "2 years",
    tuition: "$53,450 per year",
    description: "A comprehensive program covering advanced computing concepts, algorithms, and software development.",
    deadline: "2024-12-15"
  },
  {
    title: "Data Science",
    university: "Stanford University",
    country: "United States",
    duration: "18 months",
    tuition: "$52,479 per year",
    description: "An intensive program focusing on big data analytics, machine learning, and statistical analysis.",
    deadline: "2024-04-30"
  },
  {
    title: "Artificial Intelligence",
    university: "University of Cambridge",
    country: "United Kingdom",
    duration: "1 year",
    tuition: "£38,000 per year",
    description: "Advanced study of AI principles, machine learning, and intelligent systems.",
    deadline: "2024-06-15"
  },
  {
    title: "Software Engineering",
    university: "ETH Zurich",
    country: "Switzerland",
    duration: "2 years",
    tuition: "CHF 1,500 per year",
    description: "Comprehensive software development and engineering principles program.",
    deadline: "2024-08-30"
  }
];

const PastInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Load inquiries from localStorage
    const storedInquiries = localStorage.getItem('pastInquiries');
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      // Demo data if no stored inquiries
      const demoInquiries: Inquiry[] = [
        {
          id: '1',
          date: '2024-03-01',
          heading: 'Computer Science Masters in Europe',
          answers: [
            { questionId: 'field', answer: 'Computer Science' },
            { questionId: 'level', answer: 'Masters' },
            { questionId: 'location', answer: ['Germany', 'Netherlands'] },
            { questionId: 'duration', answer: '2 years' },
            { questionId: 'language', answer: 'English' }
          ]
        },
        {
          id: '2',
          date: '2024-02-15',
          heading: 'Data Science Programs in USA',
          answers: [
            { questionId: 'field', answer: 'Data Science' },
            { questionId: 'level', answer: 'Masters' },
            { questionId: 'location', answer: ['United States'] },
            { questionId: 'duration', answer: '1.5 years' },
            { questionId: 'language', answer: 'English' }
          ]
        },
        {
          id: '3',
          date: '2024-02-01',
          heading: 'AI and Machine Learning in UK',
          answers: [
            { questionId: 'field', answer: 'Artificial Intelligence' },
            { questionId: 'level', answer: 'Masters' },
            { questionId: 'location', answer: ['United Kingdom'] },
            { questionId: 'duration', answer: '1 year' },
            { questionId: 'language', answer: 'English' }
          ]
        }
      ];
      setInquiries(demoInquiries);
    }
  }, []);

  const handleShowResults = () => {
    setShowResults(true);
    // Here you would typically trigger the same program search logic 
    // as in the StudyProgrammes component
  };

  const toggleFavorite = (program: any) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.title === program.title);
      const newFavorites = isAlreadyFavorite
        ? prev.filter(fav => fav.title !== program.title)
        : [...prev, program];
      
      setToastMessage(
        isAlreadyFavorite 
          ? `${program.title} removed from favorites`
          : `${program.title} added to favorites`
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
      return newFavorites;
    });
  };

  // Toast component
  const Toast = () => (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 
      transition-all duration-300 ${showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-lg
        flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span>{toastMessage}</span>
      </div>
    </div>
  );

  // If showing results, render the ResultsSection
  if (showResults && selectedInquiry) {
    return (
      <div className="w-full h-full">
        <ResultsSection 
          onBack={() => setShowResults(false)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <Toast />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Inquiries List */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-blue-900">Past Inquiries</h2>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map(inquiry => (
                  <InquiryCard
                    key={inquiry.id}
                    inquiry={inquiry}
                    isSelected={selectedInquiry?.id === inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>No past inquiries found</p>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="h-full">
            {selectedInquiry ? (
              <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <InquiryDetails 
                  inquiry={selectedInquiry}
                  onShowResults={handleShowResults}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default PastInquiries; 