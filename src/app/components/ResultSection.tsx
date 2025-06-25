import React, { useEffect, useState } from "react";
import { call_deepseek } from "../(utils)/call_deepseek/route";
import SplineLoader from "./common/SplineLoader";
import RecommendedProgramCard from "./RecommendedProgramCard";

interface Program {
  title: string;
  deadline: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
  description: string;
}
const ResultsSection = React.memo(({ 
  favorites, 
  answers,
  questions,
  onToggleFavorite,
  setSpinner 

}: { 
  setSpinner: (spinner: boolean) => void;
  answers: string[],
  questions: string[],
  favorites: Program[], 
  onToggleFavorite: (program: Program) => void 
}) => {
  const [ Programmes, setProgrammes ] = useState<Program[]>([]);
  const [ loading, setloading ] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      // setSpinner(true); // Start spinner
  
      try {
        const res = await call_deepseek("answers", questions, answers);
        setSpinner(false); // Stop spinner
        const past_inquiries= JSON.parse(localStorage.getItem("pastInquiries") || "[]");


        const newInquiry=
          {
            date: new Date().toISOString(),
            heading:questions[1], // Assuming the first question is the main topic
            questions: questions,
            answers: answers
          }
        past_inquiries.push(newInquiry);
        localStorage.setItem("pastInquiries", JSON.stringify(past_inquiries));


        
        setProgrammes(res);
        console.log(res);
      } catch (err) {
        console.error("Failed to fetch programs", err);
      } finally {
        setloading(false);
      
      }
    };
    fetchData();

  },[])
 return (
  <>
  {loading?<SplineLoader/>:<div className="w-[100%] md:w-[100%] h-[70vh] animate-fadeIn relative mx-auto ">
    <div className="absolute inset-0  backdrop-blur-md bg-white/20 rounded-xl pointer-events-none" />
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
        <div className="flex flex-col gap-4 md:gap-6 pb-6 min-w-[350px] mx-auto">
          {Programmes.map(program => (
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
  </div>}
  </>
)});

export default ResultsSection;