'use client';
import { GrUserExpert } from "react-icons/gr";
import { RiRobot2Line } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import { call_fetch_journey_db } from '../(utils)/call_fetch_journey_db/route';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import MeetingSchedulingForm from "./MeetingSchedulingForm";
import { call_push_document } from "../(utils)/call_push_document/route";
import Toast from "./common/Toast";
import prepare_and_view from "../(utils)/prepare_and_view/route";
interface data{
  data: Buffer
  type: string
}
interface Journey {
  _id: string;
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
    document?: data;
    doc_name?: string;
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
          Last updated: { new Date(journey.lastUpdated.toString()).toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})}
        </span>
      </div>
    </div>
  </div>
));





const JourneyProgress = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
    const [clicked, setclicked] = useState(-1);
    const [showToast, setShowToast] = useState(false);
    const [toastType, settoastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");
  const [loading, setloading] = useState(true);
  const [upload_loading, setupload_loading] = useState(false);
  const [showExpertTooltip, setShowExpertTooltip] = useState(false);
  const [showAiTooltip, setShowAiTooltip] = useState(false);
  const [isMeetingFormDisplayed, setisMeetingFormDisplayed] = useState(false);

  const [MeetingRequestDetails,setMeetingRequestDetails] =useState({
  expert_id: "",
  Institution: "",
  fieldOfStudy: "",
  ApplyingOn: "",
  meeting_topic: "",
 
})
  // Add function to update step status
  const handleUpdateStatus = (stepIndex: number, newStatus: 'completed' | 'in-progress' | 'not-started') => {
    if (!selectedJourney) return;

    const updatedJourneys = journeys.map(journey => {
      if (journey._id === selectedJourney._id) {
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
    setSelectedJourney(updatedJourneys.find(j => j._id === selectedJourney._id) || null);
  };

  // Add document update handler


  // Load demo data
  useEffect(() => {
    
    // Fetch data from the API
    const fetchData = async () => {
      setloading(true);
      const res=await call_fetch_journey_db("user_id");
      setloading(false);
      console.log(res)
      
      setJourneys(res.data);
    }
    fetchData();
  }, []);



  return (
    isMeetingFormDisplayed?<MeetingSchedulingForm MeetingRequestDetails={MeetingRequestDetails} setMeetingRequestDetails={setMeetingRequestDetails} setisMeetingFormDisplayed={setisMeetingFormDisplayed}/>:<div className=" h-full w-full overflow-hidden ">
      {/* Main container with two separate sections */}
      <div className="w-[95%] md:w-[90%] h-fit  lg:h-[85vh] animate-fadeIn relative mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journeys List Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          {/* Journeys Header */}
          <div className="flex justify-between items-center px-4 py-4 border-b bg-white/50 backdrop-blur-sm sticky top-0">
            <h2 className="text-xl md:text-2xl font-bold text-black">
              Your Journey Progress
            </h2>

            {loading ? null : (
              <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
                {journeys.length} Journeys
              </div>
            )}
          </div>

          {/* Scrollable Journeys List */}
          <div className=" h-fit lg:h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar p-4">
            <div className="flex flex-col gap-4">
              {loading ? (
                <LoadingSpinner />
              ) : journeys.length > 0 ? (
                journeys.map((journey) => (
                  <JourneyCard
                    key={journey._id}
                    journey={journey}
                    isSelected={selectedJourney?._id === journey._id}
                    onClick={() => setSelectedJourney(journey)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  <p className="text-lg">No journeys started yet.</p>
                  <p className="text-sm mt-2">
                    Start your first journey by selecting a program!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Tracker Container */}
        <div className="bg-white/20   backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          {selectedJourney ? (
            <div className="h-full flex flex-col">
              {/* Progress Tracker Header */}
              <div className="px-8 py-4 border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  {/* tooltip 1*/}
                  <div className="hidden h-20 w-28 md:w-36  z-50  absolute ">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                      <p className="mb-1">Note:</p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Get Expert Review
                      </p>
                      {/* Tooltip arrow */}
                      <div
                        className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                                    border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0"
                      ></div>
                    </div>
                  </div>
                  {/* tooltip 2*/}
                  <div className="hidden h-20 w-28 md:w-36  z-50  absolute mr-16 right-0">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                      <p className="mb-1">Note:</p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Get Ai Review
                      </p>
                      {/* Tooltip arrow */}
                      <div
                        className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                                    border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0"
                      ></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">
                    Progress Tracker
                  </h3>
                  <div className="relative">
                    <button onClick={()=>setisMeetingFormDisplayed(true)}
                      className="text-xl p-2 m-6 rounded-2xl border bottom-2 hover:border-blue-900 md:text-2xl font-bold text-black relative"
                      onMouseEnter={() => setShowExpertTooltip(true)}
                      onMouseLeave={() => setShowExpertTooltip(false)}
                    >
                      <GrUserExpert />
                      {showExpertTooltip && (
                        <div  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded shadow-lg whitespace-nowrap">
                          Get Expert Review
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className="text-xl p-2 m-6 rounded-2xl border bottom-2 hover:border-blue-900 md:text-2xl font-bold text-black relative"
                      onMouseEnter={() => setShowAiTooltip(true)}
                      onMouseLeave={() => setShowAiTooltip(false)}
                    >
                      <RiRobot2Line />
                      {showAiTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded shadow-lg whitespace-nowrap">
                          Get AI Review
                        </div>
                      )}
                    </button>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-lg text-sm
                    ${
                      new Date(selectedJourney.deadline) < new Date()
                        ? "bg-red-100 text-red-800"
                        : new Date(selectedJourney.deadline).getTime() -
                            new Date().getTime() <=
                          30 * 24 * 60 * 60 * 1000
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 ">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <span className="text-xs font-medium block">
                          Deadline
                        </span>
                        <span className="block">
                          {new Date(
                            selectedJourney.deadline.toString()
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 ">
                <div className="space-y-8">
                  {selectedJourney.steps.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Connector line */}
                      {index < selectedJourney.steps.length - 1 && (
                        <div
                          className="absolute left-[23px] top-[40px] w-[2px] h-[calc(100%+32px)] 
                          bg-gradient-to-b from-blue-200 to-gray-200"
                        />
                      )}

                      {/* Step */}
                      <div className="flex items-start gap-6 ">
                        {/* Status indicator button */}
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              index,
                              step.status === "not-started"
                                ? "in-progress"
                                : step.status === "in-progress"
                                ? "completed"
                                : "not-started"
                            )
                          }
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                            transition-all duration-300 cursor-pointer hover:scale-110
                            ${
                              step.status === "completed"
                                ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-200"
                                : step.status === "in-progress"
                                ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200"
                                : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-600 hover:from-blue-50 hover:to-blue-200"
                            }`}
                        >
                          {step.status === "completed" ? "✓" : index + 1}
                        </button>

                        {/* Step content and document upload */}
                        <div className="flex-1 space-y-4">
                          <div className="pt-2">
                            <h4 className="text-lg font-semibold text-blue-900 mb-2">
                              {step.title}
                            </h4>
                               <h4
                          className={`px-4 py-2 rounded-full text-sm font-medium mt-2
                          transition-all duration-300
                          ${
                            step.status === "completed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : step.status === "in-progress"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {step.status.charAt(0).toUpperCase() +
                            step.status.slice(1).replace("-", " ")}
                        </h4>



                        
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {step.description} 
                            </p>
                          </div>

                          {/* Document upload section */}
                          <div className="flex items-center gap-4">
                          {step.document && (
                              <div className="flex  items-center gap-2 text-sm text-gray-600">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span 
                                  className="text-sm cursor-pointer hover:text-blue-600 transition-colors duration-200" 
                                  onClick={() => {
                                    if (!step.document) return;
                                    prepare_and_view(step.document.data)
                                  }}
                                >
                                  {step.doc_name || 'Document'}
                                </span>
                              </div>
                            )}
                            <div className="relative group">
                              <label className="relative">
                               <input
                                  disabled={upload_loading}
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={async (e) => {
                                    
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      console.log(file)
                                      const formData = new FormData();
                                      formData.append("pdf", file);
                                      formData.append("journey_id", selectedJourney._id);
                                      formData.append("step_no", index.toString());
                                      
                                      try {
                                        setclicked(index);
                                        setupload_loading(true);
                                        const res= await call_push_document(formData);
                                        setupload_loading(false);




                                        if(res.message=="document pushed successfully"){   

                                          setToastMessage("Document uploaded successfully. Note That you can create expert meetings to get review on these documents.");
                                          settoastType("success");
                                          setShowToast(true);
                                          setTimeout(() => {setShowToast(false);}, 7000);
                                           // Convert file to Buffer
                                        const arrayBuffer = await file.arrayBuffer();
                                        const buffer = Buffer.from(arrayBuffer);
                                        
                                        // Update the journey state immediately with the new document name
                                        const updatedJourneys = journeys.map(journey => {
                                          if (journey._id === selectedJourney._id) {
                                            const updatedSteps = journey.steps.map((step, idx) => 
                                              idx === index ? {
                                                ...step,
                                                document: { data: buffer, type: file.type },
                                                doc_name: file.name
                                              } : step
                                            );
                                            return {
                                              ...journey,
                                              steps: updatedSteps
                                            };
                                          }
                                          return journey;
                                        });
                                        
                                        setJourneys(updatedJourneys);
                                        setSelectedJourney(updatedJourneys.find(j => j._id === selectedJourney._id) || null);
                                        
                                        
                                        }
                                        else{
                                          setToastMessage(res.message);
                                          settoastType("failed");
                                          setShowToast(true);
                                          setTimeout(() => {setShowToast(false);}, 3000);
                                        }
                                       
                                       
                                      } catch (error) {
                                        console.error('Error processing file:', error);
                                      }
                                    }
                                  }}
                                />
                                <div
                                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200
                                  hover:bg-blue-100 transition-colors duration-300 cursor-pointer text-sm"
                                >
                                  { (upload_loading && index===clicked)?"Processing..":step.document ? "Update PDF" : "Upload PDF"}
                                </div>
                              </label>

                              {/* Tooltip */}
                              <div
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                              >
                                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                                  <p className="mb-1">Note:</p>
                                  <p className="text-gray-300 text-xs leading-relaxed">
                                    Documents are stored locally and not
                                    submitted to the Institution. Experts can
                                    review these documents to provide
                                    verification and improvement tips.
                                  </p>
                                  {/* Tooltip arrow */}
                                  <div
                                    className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 
                                    border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0"
                                  ></div>
                                </div>
                              </div>
                            </div>

                            
                          </div>
                        </div>

                        {/* Status badge */}
                     
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
      
      {showToast&&<Toast
      type={toastType}
      message={toastMessage}
    />}
      
    </div>
  );
};

export default JourneyProgress; 
