'use client';

import React, { useState, useEffect, useCallback } from 'react';
import RecommendedProgramCard from './RecommendedProgramCard';
import Toast from '@/components/ui/Toast';

interface Program {
  title: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
  description: string;
  deadline: string;
  isFavorite: boolean;
}

// Move ResultsSection outside the main component
const FavoriteResultsSection = React.memo(({ 
  favorites, 
  onToggleFavorite 
}: { 
  favorites: Program[], 
  onToggleFavorite: (program: Program) => void 
}) => (
  <div className="w-[95%] md:w-[90%] h-[80vh] animate-fadeIn relative mx-auto mt-16">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl pointer-events-none" />
    <div className="relative z-10 h-full pointer-events-auto overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4 sticky top-0 z-20 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-black">
          Favorite Study Programmes
        </h2>
        <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
          {favorites.length} Programs
        </div>
      </div>
      <div className="h-[calc(100%-4rem)] overflow-y-auto px-1 sm:px-2 md:px-4 custom-scrollbar">
        <div className="flex flex-col gap-4 md:gap-6 pb-6 max-w-[1200px] mx-auto">
          {favorites.length > 0 ? (
            favorites.map(program => (
              <RecommendedProgramCard
                key={program.title}
                {...program}
                deadline={program.deadline}
                isFavorite={true}
                onFavoriteClick={() => onToggleFavorite(program)}
                onLearnMore={() => console.log(`Learn more about ${program.title}`)}
                onStartJourney={() => console.log(`Start journey for ${program.title}`)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p className="text-lg">No favorite programs yet.</p>
              <p className="text-sm mt-2">Add programs to your favorites to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
));

const FavoriteProgrammes = () => {
  const [favorites, setFavorites] = useState<Program[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('studyProgramFavorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Ensure all favorites have a deadline
        const favoritesWithDeadlines = parsedFavorites.map((fav: Program) => ({
          ...fav,
          deadline: fav.deadline || '2024-12-31' // Provide a default deadline if none exists
        }));
        setFavorites(favoritesWithDeadlines);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = useCallback((program: Program) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.title !== program.title);
      settoastType("failure")
      setToastMessage(`${program.title} removed from favorites`);
      setShowToast(true);
      
      setTimeout(() => setShowToast(false), 10000);
      
      // Update localStorage with deadline included
      localStorage.setItem('studyProgramFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);


 

  return (
    <div className="h-full w-full overflow-hidden ">
      

      {/* Content */}
      <FavoriteResultsSection 
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Add Toast */}
      {showToast&&<Toast
        type={toastType}
        message={toastMessage}
      />}
    </div>
  );
};

export default FavoriteProgrammes; 