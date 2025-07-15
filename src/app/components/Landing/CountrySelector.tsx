'use client';
import { call_fetch_logged_id_info } from '@/app/(utils)/call_fetch_logged_id_info/call_fetch_logged_id_info';
import { useState, useEffect } from 'react';
import LoginCard from '../auth/LoginCard';

// Extended country list
const allCountries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  // Added 20 more top countries for international students
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
];

function getRandomCountries(arr: typeof allCountries, n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function CountrySelector() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<typeof allCountries>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayedCountries, setDisplayedCountries] = useState<typeof allCountries>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Add state for login modal

  useEffect(() => {
    setDisplayedCountries(getRandomCountries(allCountries, 6));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredCountries = allCountries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredCountries);
  }, [searchTerm]);

  const handleCountrySelect = async (country: typeof allCountries[0]) => {
    setSearchTerm(country.name);
    setShowSuggestions(false);
    // You can add additional handling here when a country is selected
    
  };
const handleCountryClick = async (country_name: string) => {
  localStorage.setItem('selectedCountry', country_name);

  try {
    const user = await call_fetch_logged_id_info();

    if (user && user.email) {
      window.location.href = '/homepage';
    } else {
      // fallback in case the function resolves but no user is returned
      setIsLoginOpen(true);
    }
  } catch {
    // Don't log or show the error, just show login modal
    setIsLoginOpen(true);
  }
};


  const handleShuffle = () => {
    setDisplayedCountries(getRandomCountries(allCountries, 6));
  };

  return (
    <section className="py-16 bg-gray-50">
      {/* Login Modal */}
      <LoginCard 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Study Destination
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select a country to explore educational opportunities and scholarships
          </p>
        </div>

        <div className="mt-12">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    localStorage.setItem('selectedCountry', searchTerm.trim());
                    window.location.href = '/homepage';
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg 
                  className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  onClick={() => {
                    if (searchTerm.trim()) {
                      localStorage.setItem('selectedCountry', searchTerm.trim());
                      window.location.href = '/homepage';
                    }
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                  {suggestions.map((country) => (
                    <button
                      key={country.code}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {displayedCountries.length === 0 ? (
              <div className="col-span-6 text-center text-gray-400 py-8">Loading countries...</div>
            ) : (
              displayedCountries.map((country) => (
                <button
                  key={country.code}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-[#000033] hover:bg-[#000033] hover:text-white hover:shadow-lg transition-all"
                  onClick={() => {
                    handleCountryClick(country.name);
                  }}
                >
                  <span className="text-4xl">{country.flag}</span>
                  <span className="mt-2 text-sm font-medium">{country.name}</span>
                </button>
              ))
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-[#000033] text-white rounded-lg shadow hover:bg-[#0000]transition-colors font-semibold"
              onClick={handleShuffle}
            >
              Shuffle Countries
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}