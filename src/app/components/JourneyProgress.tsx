'use client';

import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface Journey {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  currentStep: number;
  lastUpdated: string;
  institution: string;
  program: string;
  deadline: string;
  steps: {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'not-started';
    document?: string;
    documentName?: string;
    uploadDate?: string;
  }[];
}

const JourneyCard = React.memo(({ 
  journey, 
  isSelected, 
  onClick 
}: { 
  journey: Journey;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-lg overflow-hidden border 
      transition-all duration-300 cursor-pointer
      ${isSelected 
        ? 'border-blue-500 shadow-blue-100 scale-[1.02]' 
        : 'border-blue-100 hover:border-blue-300'}`}
  >
    <div className="p-6">
      <h3 className="text-lg font-bold text-blue-900 mb-2">{journey.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{journey.description}</p>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${(journey.currentStep / journey.totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-blue-600 font-medium">
          Step {journey.currentStep} of {journey.totalSteps}
        </span>
        <span className="text-gray-500">
          Last updated: {journey.lastUpdated}
        </span>
      </div>
    </div>
  </div>
));

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const ProgressTracker = React.memo(({ 
  journey,
  onUpdateStatus,
  onUpdateDocument 
}: { 
  journey: Journey;
  onUpdateStatus: (stepIndex: number, newStatus: 'completed' | 'in-progress' | 'not-started') => void;
  onUpdateDocument: (stepIndex: number, document: string, documentName: string) => void;
}) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 animate-fadeIn">
    <h3 className="text-xl font-bold text-blue-900 mb-8 border-b pb-4">
      Progress Tracker
    </h3>
    <div className="space-y-8">
      {journey.steps.map((step, index) => (
        <div key={index} className="relative">
          {/* Connector line */}
          {index < journey.steps.length - 1 && (
            <div className="absolute left-[23px] top-[40px] w-[2px] h-[calc(100%+32px)] 
              bg-gradient-to-b from-blue-200 to-gray-200" />
          )}
          
          {/* Step */}
          <div className="flex items-start gap-6">
            {/* Status indicator button */}
            <button
              onClick={() => {
                const nextStatus = 
                  step.status === 'not-started' ? 'in-progress' :
                  step.status === 'in-progress' ? 'completed' : 
                  'not-started';
                onUpdateStatus(index, nextStatus);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                transition-all duration-300 cursor-pointer hover:scale-110
                ${step.status === 'completed' 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-200' 
                  : step.status === 'in-progress'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gradient-to-br from-gray-100 to-gray-300 text-gray-600 hover:from-blue-50 hover:to-blue-200'}`}
            >
              {step.status === 'completed' ? '✓' : index + 1}
            </button>
            
            <div className="flex-1 space-y-4">
              {/* Step content */}
              <div className="pt-2">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Document upload section */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <label className="relative">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await convertToBase64(file);
                          onUpdateDocument(index, base64, file.name);
                        }
                      }}
                    />
                    <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200
                      hover:bg-blue-100 transition-colors duration-300 cursor-pointer text-sm">
                      {step.document ? 'Replace PDF' : 'Upload PDF'}
                    </div>
                  </label>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                      <p className="mb-1">Note:</p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Documents are stored locally and not submitted to the Institution. 
                        Experts can review these documents to provide verification and improvement tips.
                      </p>
                      {/* Tooltip arrow */}
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                        border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0">
                      </div>
                    </div>
                  </div>
                </div>

                {step.document && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>{step.documentName}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Status badge */}
            <div className={`px-4 py-2 rounded-full text-sm font-medium mt-2
              transition-all duration-300
              ${step.status === 'completed' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : step.status === 'in-progress'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
            >
              {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace('-', ' ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

const JourneyProgress = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Add function to update step status
  const handleUpdateStatus = (stepIndex: number, newStatus: 'completed' | 'in-progress' | 'not-started') => {
    if (!selectedJourney) return;

    const updatedJourneys = journeys.map(journey => {
      if (journey.id === selectedJourney.id) {
        const updatedSteps = journey.steps.map((step, idx) => 
          idx === stepIndex ? { ...step, status: newStatus } : step
        );
        
        // Calculate new currentStep
        const completedSteps = updatedSteps.filter(step => step.status === 'completed').length;
        
        return {
          ...journey,
          steps: updatedSteps,
          currentStep: completedSteps,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return journey;
    });

    setJourneys(updatedJourneys);
    setSelectedJourney(updatedJourneys.find(j => j.id === selectedJourney.id) || null);
  };

  // Add document update handler
  const handleUpdateDocument = (stepIndex: number, document: string, documentName: string) => {
    if (!selectedJourney) return;

    const updatedJourneys = journeys.map(journey => {
      if (journey.id === selectedJourney.id) {
        const updatedSteps = journey.steps.map((step, idx) => 
          idx === stepIndex ? {
            ...step,
            document,
            documentName,
            uploadDate: new Date().toISOString().split('T')[0]
          } : step
        );
        
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Create document entry for Documents component
        const documentEntry = {
          journeyTitle: journey.title,
          stepTitle: journey.steps[stepIndex].title,
          fileName: documentName,
          uploadDate: currentDate,
          institution: journey.institution,
          program: journey.program,
          content: document
        };

        // Get existing documents or initialize empty array
        const existingDocs = JSON.parse(localStorage.getItem('journeyDocuments') || '[]');
        
        // Remove any previous version of this document if it exists
        const filteredDocs = existingDocs.filter((doc: any) => 
          !(doc.journeyTitle === journey.title && 
            doc.stepTitle === journey.steps[stepIndex].title)
        );
        
        // Add new document
        const updatedDocs = [...filteredDocs, documentEntry];
        
        // Save to localStorage
        localStorage.setItem('journeyDocuments', JSON.stringify(updatedDocs));

        return {
          ...journey,
          steps: updatedSteps,
          lastUpdated: currentDate
        };
      }
      return journey;
    });

    setJourneys(updatedJourneys);
    setSelectedJourney(updatedJourneys.find(j => j.id === selectedJourney.id) || null);
    
    // Show tooltip
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10000);
  };

  // Load demo data
  useEffect(() => {
    const demoJourneys: Journey[] = [
      {
        id: '1',
        title: 'Computer Science Application',
        description: 'Application process for MIT Computer Science program',
        totalSteps: 5,
        currentStep: 3,
        lastUpdated: '2024-03-15',
        institution: 'Massachusetts Institute of Technology',
        program: 'Master of Science in Computer Science',
        deadline: '2024-04-15',
        steps: [
          {
            title: 'Document Preparation',
            description: 'Gather all required documents for application',
            status: 'completed'
          },
          {
            title: 'Application Form',
            description: 'Fill out the online application form',
            status: 'completed'
          },
          {
            title: 'Statement of Purpose',
            description: 'Write and review statement of purpose',
            status: 'in-progress'
          },
          {
            title: 'Recommendations',
            description: 'Obtain letters of recommendation',
            status: 'not-started'
          },
          {
            title: 'Interview',
            description: 'Complete the admission interview',
            status: 'not-started'
          }
        ]
      },
      {
        id: '2',
        title: 'Data Science at Stanford',
        description: 'Application journey for Stanford Data Science program',
        totalSteps: 4,
        currentStep: 2,
        lastUpdated: '2024-03-14',
        institution: 'Stanford University',
        program: 'Master of Science in Data Science',
        deadline: '2024-04-15',
        steps: [
          {
            title: 'Prerequisites Check',
            description: 'Verify all academic prerequisites are met',
            status: 'completed'
          },
          {
            title: 'GRE Preparation',
            description: 'Complete GRE exam with required scores',
            status: 'completed'
          },
          {
            title: 'Research Proposal',
            description: 'Develop and refine research proposal',
            status: 'in-progress'
          },
          {
            title: 'Faculty Contact',
            description: 'Connect with potential faculty advisors',
            status: 'not-started'
          }
        ]
      },
      {
        id: '3',
        title: 'Business Analytics at Harvard',
        description: 'MBA application process at Harvard Business School',
        totalSteps: 6,
        currentStep: 1,
        lastUpdated: '2024-03-13',
        institution: 'Harvard University',
        program: 'Master of Business Administration',
        deadline: '2024-04-15',
        steps: [
          {
            title: 'GMAT Exam',
            description: 'Prepare and take GMAT examination',
            status: 'completed'
          },
          {
            title: 'Resume Building',
            description: 'Update and refine professional resume',
            status: 'in-progress'
          },
          {
            title: 'Essays',
            description: 'Write required application essays',
            status: 'not-started'
          },
          {
            title: 'Recommendations',
            description: 'Secure professional recommendations',
            status: 'not-started'
          },
          {
            title: 'Interview Prep',
            description: 'Prepare for admission interview',
            status: 'not-started'
          },
          {
            title: 'Financial Documentation',
            description: 'Prepare financial statements and documents',
            status: 'not-started'
          }
        ]
      },
      {
        id: '4',
        title: 'AI Engineering at Berkeley',
        description: 'Application process for UC Berkeley AI program',
        totalSteps: 5,
        currentStep: 0,
        lastUpdated: '2024-03-12',
        institution: 'University of California, Berkeley',
        program: 'Master of Engineering in Artificial Intelligence',
        deadline: '2024-04-15',
        steps: [
          {
            title: 'Technical Portfolio',
            description: 'Compile AI/ML project portfolio',
            status: 'not-started'
          },
          {
            title: 'Statement of Intent',
            description: 'Write statement of research interests',
            status: 'not-started'
          },
          {
            title: 'Academic Records',
            description: 'Submit transcripts and test scores',
            status: 'not-started'
          },
          {
            title: 'References',
            description: 'Obtain academic references',
            status: 'not-started'
          },
          {
            title: 'Research Alignment',
            description: 'Identify potential research groups',
            status: 'not-started'
          }
        ]
      }
    ];
    
    setJourneys(demoJourneys);
  }, []);

  // Add Toast component inside JourneyProgress
  const Toast = () => (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 
      transition-all duration-300 ${showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-xl shadow-xl
        flex items-start space-x-3 max-w-md border border-blue-100">
        <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <p className="font-medium mb-1">Document Uploaded Successfully</p>
          <p className="text-sm text-gray-600">
            Note: This document is stored locally and not submitted to the Institution. It is not a part of the real application process. 
            Experts can review these documents to provide verification and improvement tips.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full overflow-hidden ">
      {/* Main container with two separate sections */}
      <div className="w-[95%] md:w-[80%] h-[85vh] animate-fadeIn relative mx-auto mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journeys List Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          {/* Journeys Header */}
          <div className="flex justify-between items-center px-4 py-4 border-b bg-white/50 backdrop-blur-sm sticky top-0">
            <h2 className="text-xl md:text-2xl font-bold text-black">
              Your Journey Progress
            </h2>
            <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
              {journeys.length} Journeys
            </div>
          </div>

          {/* Scrollable Journeys List */}
          <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar p-4">
            <div className="flex flex-col gap-4">
              {journeys.length > 0 ? (
                journeys.map(journey => (
                  <JourneyCard
                    key={journey.id}
                    journey={journey}
                    isSelected={selectedJourney?.id === journey.id}
                    onClick={() => setSelectedJourney(journey)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  <p className="text-lg">No journeys started yet.</p>
                  <p className="text-sm mt-2">Start your first journey by selecting a program!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Tracker Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          {selectedJourney ? (
            <div className="h-full flex flex-col">
              {/* Progress Tracker Header */}
              <div className="px-8 py-4 border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-blue-900">
                    Progress Tracker
                  </h3>
                  <div className={`px-3 py-1.5 rounded-lg text-sm
                    ${new Date(selectedJourney.deadline) < new Date() 
                      ? 'bg-red-100 text-red-800' 
                      : new Date(selectedJourney.deadline).getTime() - new Date().getTime() <= 30 * 24 * 60 * 60 * 1000
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <span className="text-xs font-medium block">Deadline</span>
                        <span className="block">{selectedJourney.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="space-y-8">
                  {selectedJourney.steps.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Connector line */}
                      {index < selectedJourney.steps.length - 1 && (
                        <div className="absolute left-[23px] top-[40px] w-[2px] h-[calc(100%+32px)] 
                          bg-gradient-to-b from-blue-200 to-gray-200" />
                      )}
                      
                      {/* Step */}
                      <div className="flex items-start gap-6">
                        {/* Status indicator button */}
                        <button
                          onClick={() => handleUpdateStatus(index, 
                            step.status === 'not-started' ? 'in-progress' :
                            step.status === 'in-progress' ? 'completed' : 
                            'not-started'
                          )}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                            transition-all duration-300 cursor-pointer hover:scale-110
                            ${step.status === 'completed' 
                              ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-200' 
                              : step.status === 'in-progress'
                              ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200'
                              : 'bg-gradient-to-br from-gray-100 to-gray-300 text-gray-600 hover:from-blue-50 hover:to-blue-200'}`}
                        >
                          {step.status === 'completed' ? '✓' : index + 1}
                        </button>
                        
                        {/* Step content and document upload */}
                        <div className="flex-1 space-y-4">
                          <div className="pt-2">
                            <h4 className="text-lg font-semibold text-blue-900 mb-2">{step.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                          </div>

                          {/* Document upload section */}
                          <div className="flex items-center gap-4">
                            <div className="relative group">
                              <label className="relative">
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const base64 = await convertToBase64(file);
                                      handleUpdateDocument(index, base64, file.name);
                                    }
                                  }}
                                />
                                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200
                                  hover:bg-blue-100 transition-colors duration-300 cursor-pointer text-sm">
                                  {step.document ? 'Replace PDF' : 'Upload PDF'}
                                </div>
                              </label>
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                                  <p className="mb-1">Note:</p>
                                  <p className="text-gray-300 text-xs leading-relaxed">
                                    Documents are stored locally and not submitted to the Institution. 
                                    Experts can review these documents to provide verification and improvement tips.
                                  </p>
                                  {/* Tooltip arrow */}
                                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                                    border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0">
                                  </div>
                                </div>
                              </div>
                            </div>

                            {step.document && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                <span>{step.documentName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Status badge */}
                        <div className={`px-4 py-2 rounded-full text-sm font-medium mt-2
                          transition-all duration-300
                          ${step.status === 'completed' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : step.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                        >
                          {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a journey to view progress</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Toast at the end */}
      <Toast />
    </div>
  );
};

export default JourneyProgress; 