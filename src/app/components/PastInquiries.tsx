'use client';

import React, { useState, useEffect, useRef } from 'react';
import ResultsSection from './ResultSection';
import timeFormatConverter from '../(utils)/time_format_converter/route';

interface Inquiry {
  id: string;
  date: string;
  questions: string[];
  answers: string[];
  heading: string;
  // programs?: any[];
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
          <p className="text-sm text-gray-600">Inquiry Time: {timeFormatConverter(inquiry.date)}</p>
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
  onShowResults,
  onUpdateAnswer
}: { 
  inquiry: Inquiry;
  onShowResults: () => void;
  onUpdateAnswer: (index: number, newAnswer: string) => void;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setEditingIndex(null);
      }
    };

    if (editingIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingIndex]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(inquiry.answers[index]);
  };

  const handleSave = (index: number) => {
    onUpdateAnswer(index, editValue);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h2 className="text-xl font-bold text-blue-900 mb-2">{inquiry.heading}</h2>
        <p className="text-sm text-gray-600">Submitted on {timeFormatConverter(inquiry.date)}</p>
      </div>

      {/* Questions and Answers */}
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Your Responses</h4>
        <div className="space-y-4">
          {inquiry.questions.map((question, index) => (
            <div key={index} className="border-b border-blue-100 last:border-0 pb-4 last:pb-0">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {question}
              </p>
              {editingIndex === index ? (
                <div ref={editRef} className="flex gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {inquiry.answers[index]}
                  </p>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              )}
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
  );
});



const PastInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [clicked_inquiry_idx, setclicked_inquiry_idx] = useState(-1);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [Qs, setQs] = useState<string[]>([]);

    useEffect(() => {
      if (favorites.length > 0) {
        localStorage.setItem('studyProgramFavorites', JSON.stringify(favorites));
      }
    }, [favorites]);
  useEffect(() => {
    // Load inquiries from localStorage
    const storedInquiries = localStorage.getItem('pastInquiries');
    
    if (storedInquiries) {
      console.log(JSON.parse(storedInquiries));
      setInquiries(JSON.parse(storedInquiries));
    } else {
    
      setInquiries([]);
    }
  }, []);




  
  const handleUpdateAnswer = (index: number, newAnswer: string) => {
    if (!selectedInquiry) return;

    const updatedInquiry = {
      ...selectedInquiry,
      answers: selectedInquiry.answers.map((answer, i) =>
        i === index ? newAnswer : answer
      )
    };

    setSelectedInquiry(updatedInquiry);
    setInquiries(prev =>
      prev.map(inquiry =>
        inquiry.id === selectedInquiry.id ? updatedInquiry : inquiry
      )
    );

    // Update localStorage
    localStorage.setItem('pastInquiries', JSON.stringify(inquiries));
  };

  const handleShowResults = () => {
    setShowResults(true);
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

  if (showResults && selectedInquiry) {
    return (
      <div className="w-[95%] md:w-[90%] h-[80vh] animate-fadeIn relative mx-auto mt-16">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl pointer-events-none" />
    <div className="relative z-10 h-full pointer-events-auto overflow-hidden">
      {spinner?<div  className="flex justify-between items-center mb-6 px-4 sticky top-0 z-20 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-black">
          Processing Suggestions...
        </h2>
        
      </div>:null}
      <div className={`h-[calc(100%-4rem)]  px-1 sm:px-2 md:px-4 overflow-hidden `}>
        <div className="flex flex-col gap-4 md:gap-6 pb-6 max-w-[1200px] mx-auto overflow-hidden">

        <ResultsSection 
          setSpinner={setSpinner}
          questions={selectedInquiry.questions}
          answers={selectedInquiry.answers}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          />

          </div>
          </div>
          </div>
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
            {inquiries.length > 0 ?  (
              <div className="space-y-4">
                {inquiries.map((inquiry,idx) => (
                  <InquiryCard
                    key={idx}
                    inquiry={inquiry}
                    isSelected={clicked_inquiry_idx === idx}
                    onClick={() =>{setclicked_inquiry_idx(idx); setSelectedInquiry(inquiry)}}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full  flex items-center justify-center text-gray-500">
                <p className='p-8 text-center'>No past inquiries found <br /> If you're supposed to see any, try checking in the browser you used previously.</p>
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
                  onUpdateAnswer={handleUpdateAnswer}
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