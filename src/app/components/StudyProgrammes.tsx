
'use client';

import Spline from '@splinetool/react-spline';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import RecommendedProgramCard from './RecommendedProgramCard';
import React from 'react';
import { call_deepseek } from '../(utils)/call_deepseek/route';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Demo questions array
const questions = [
  "What is your desired field of study?",
  "Which country would you prefer to study in?",
  "What is your preferred language of instruction?",
  "What is your budget range for tuition (in USD/year)?",
  "When do you plan to start your studies?"
];

// Add this demo data for study programmes
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
  // ... add deadlines for other programs
];

// Add new interface for program type
interface Program {
  title: string;
  deadline: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
  description: string;
}

// Move ResultsSection outside the main component
const ResultsSection = React.memo(({ 
  favorites, 
  answers,
  questions,
  onToggleFavorite 

}: { 
  answers: string[],
  questions: string[],
  favorites: Program[], 
  onToggleFavorite: (program: Program) => void 
}) => {
  const [ Programmes, setProgrammes ] = useState<Program[]>([]);
  const [ loading, setloading ] = useState(false);
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async() => {
      setloading(true)
      const res= await call_deepseek("answers",questions,answers)
      setProgrammes(res)
      setloading(false)
      console.log(res)
    };
    fetchData();

  },[])
 return (
  <div className="w-[100%] md:w-[100%] h-[70vh] animate-fadeIn relative mx-auto">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl pointer-events-none" />
    <div className="relative z-10 h-full pointer-events-auto overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4 sticky top-0 z-20 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-black">
          Recommended Study Programmes
        </h2>
        <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
          {Programmes.length} Programs
        </div>
      </div>
      <div className="h-[calc(100%-4rem)] overflow-y-auto px-1 sm:px-2 md:px-4 custom-scrollbar">
        {loading ? <LoadingSpinner/>:<div className="flex flex-col gap-4 md:gap-6 pb-6 min-w-[350px] mx-auto">
          {Programmes.map(program => (
            <RecommendedProgramCard
              key={program.title}
              {...program}
              isFavorite={favorites.some(fav => fav.title === program.title)}
              onFavoriteClick={() => onToggleFavorite(program)}
              onLearnMore={() => console.log(`Learn more about ${program.title}`)}
            />
          ))}
        </div>}
        
      </div>
    </div>
  </div>
)});

const StudyProgrammes = () => {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const fullText = "Welcome to International Students Help Center, I am your AI assistant to help you find your study destination";
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<Program[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setstarted] = useState(false);
  const startedRef = useRef(started);
  const [q_fetched, setq_fetched] = useState(false);
  const q_fetchedRef = useRef(q_fetched);

  const handleStart = () => {

    if(! startedRef.current && !q_fetchedRef.current){
      setLoading(true)
      setstarted(true)

    }
    if(q_fetchedRef.current){
       setIsAnimating(true);
    setTimeout(() => {
      setShowQuestion(true);
      setIsAnimating(false);
    }, 500);
    }
   
  };

  const handleNextQuestion = () => {
    if (inputValue.trim() === '') return;

    setIsAnimating(true);
    
    setTimeout(() => {
      // Save current answer
      setAnswers(prev => [...prev, inputValue]);
      setInputValue('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      } else {
        // Show results instead of console.log
        
        setShowResults(true);
        setIsAnimating(false);
      }
    }, 500);
  };

  const toggleFavorite = useCallback((program: Program) => {
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
  }, []);

  const handleLearnMore = useCallback((title: string) => {
    console.log(`Learn more about ${title}`);
  }, []);

  const renderProgramCard = useCallback((program: Program) => {
    const isFavorite = favorites.some(fav => fav.title === program.title);
    return (
      <div className="w-full" key={program.title}>
        <RecommendedProgramCard
          {...program}
          isFavorite={isFavorite}
        
          onFavoriteClick={() => toggleFavorite(program)}
          onLearnMore={() => handleLearnMore(program.title)}
        />
      </div>
    );
  }, [favorites, toggleFavorite, handleLearnMore]);

  useEffect(() => {
    // Add initial delay of 3 seconds
    const initialDelay = setTimeout(() => {
      setShowBlur(true);
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          // Show button after text animation completes
          setTimeout(() => {
            setShowButton(true);
          }, 500);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  // Optional: Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('studyProgramFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Optional: Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('studyProgramFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Add Toast component
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
  const [Qs,setQs]=useState<string[]>([])
  
  useEffect(() => {
    startedRef.current = started;
  }, [started]);
  useEffect(() => {
    q_fetchedRef.current = q_fetched;
  }, [q_fetched]);



  useEffect(() => {
    const fetchData = async() => {
      
        const res= await call_deepseek("questions",[],[])
        setQs(res)
        setq_fetched(true)
        console.log(started)
        if(startedRef.current){
          console.log("started")
          console.log(started)
          setIsAnimating(true);
        setTimeout(() => {
          setLoading(false)
          setShowQuestion(true);
          setIsAnimating(false);
        }, 500); 

      }
     
      
         
      
    };
    fetchData();
  },[])
  return (
    <div className="h-full w-full overflow-hidden">
      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className={`flex flex-col items-center space-y-4 relative
          transition-all duration-500 ease-in-out
          ${isAnimating ? 'scale-0' : 'scale-100'}`}>
          
          {/* Blurred Background Panel */}
          <div className={`absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl -m-6 pointer-events-none
            transition-all duration-500
            ${showBlur ? 'opacity-100' : 'opacity-0'}`}>
          </div>
          
          {/* Content */}
          <div className="relative flex flex-col items-center space-y-4 p-6">
            {loading? <LoadingSpinner/> : !showQuestion ? (
              <>
                <h1 className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-black px-4 max-w-2xl text-center 
                  tracking-wider leading-relaxed
                  font-montserrat
                  text-black
                  text-shadow-[2px_2px_0px_#000,4px_4px_8px_rgba(0,0,0,0.5)]
                  uppercase
                  letter-spacing-wide">
                  {text}
                </h1>
                
                <button 
                  onClick={handleStart}
                  disabled={!showButton}
                  className={`px-6 py-2.5 text-base font-semibold text-white 
                    bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950
                    rounded-full transform
                    transition-all duration-500 pointer-events-auto
                    opacity-0 translate-y-4
                    ${showButton ? 'opacity-100 translate-y-0 hover:shadow-lg hover:-translate-y-0.5' : ''}
                    ${!showButton ? 'cursor-default' : 'cursor-pointer'}`}>
                  Start
                </button>
              </>
            ) : showResults ? (
              <ResultsSection 
                questions={questions}
                answers={answers}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="space-y-4 w-full max-w-md animate-fadeIn">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black text-center">
                  {Qs[currentQuestionIndex]}
                </h2>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full px-4 py-2 rounded-lg border-2 border-blue-900 focus:outline-none focus:border-blue-700
                      bg-white/80 backdrop-blur-sm
                      pointer-events-auto"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleNextQuestion();
                      }
                    }}
                  />
                  <button 
                    onClick={handleNextQuestion}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2
                      text-blue-900 hover:text-blue-700 pointer-events-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spline 3D Background */}
      <div className="fixed inset-0 z-0 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full transform-gpu will-change-transform">
          <Spline
            scene="/spline/nexbot_robot_character_concept.spline"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Add Toast */}
      <Toast />
    </div>
  );
};

export default StudyProgrammes; 
