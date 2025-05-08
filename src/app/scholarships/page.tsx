'use client';

import { useState } from 'react';
import { Search, Filter, Award } from 'lucide-react';
import RegisterCard from '@/components/auth/RegisterCard';
import LoginCard from '@/components/auth/LoginCard';
import BackButton from '@/components/layout/BackButton';
import Footer from '@/components/layout/Footer';

interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
}

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Academic Excellence Scholarship',
    provider: 'University Foundation',
    amount: '$10,000',
    deadline: '2024-06-30',
    description: 'Awarded to students demonstrating outstanding academic achievement and leadership potential.',
    eligibility: ['Minimum GPA 3.8', 'Full-time student', 'Leadership experience'],
  },
  {
    id: '2',
    title: 'Community Service Scholarship',
    provider: 'Community Foundation',
    amount: '$5,000',
    deadline: '2024-05-15',
    description: 'Recognizes students who have made significant contributions to their community through volunteer work.',
    eligibility: ['Minimum GPA 3.0', '100+ volunteer hours', 'Community impact'],
  },
  {
    id: '2',
    title: 'Community Service Scholarship',
    provider: 'Community Foundation',
    amount: '$5,000',
    deadline: '2024-05-15',
    description: 'Recognizes students who have made significant contributions to their community through volunteer work.',
    eligibility: ['Minimum GPA 3.0', '100+ volunteer hours', 'Community impact'],
  },
  {
    id: '2',
    title: 'Community Service Scholarship',
    provider: 'Community Foundation',
    amount: '$5,000',
    deadline: '2024-05-15',
    description: 'Recognizes students who have made significant contributions to their community through volunteer work.',
    eligibility: ['Minimum GPA 3.0', '100+ volunteer hours', 'Community impact'],
  },
  // Add more mock scholarships as needed
];

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(mockScholarships);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockScholarships.filter(scholarship =>
      scholarship.title.toLowerCase().includes(query.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(query.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredScholarships(filtered);
  };

  const handleRegisterClick = () => {
    setIsRegisterClicked(true);
    setShowRegisterCard(true);
  };

  const handleClose = () => {
    setShowRegisterCard(false);
    setShowLoginCard(false);
    setIsRegisterClicked(false);
  };

  const handleShowLogin = () => {
    setShowRegisterCard(false);
    setShowLoginCard(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* Register Card Modal */}
      <RegisterCard 
        isOpen={showRegisterCard} 
        onClose={handleClose}
        onShowLogin={handleShowLogin}
      />

      {/* Login Card Modal */}
      <LoginCard 
        isOpen={showLoginCard} 
        onClose={handleClose}
        onShowRegister={() => {
          setShowLoginCard(false);
          setShowRegisterCard(true);
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Scholarship</h1>
              <p className="text-xl">Discover opportunities to fund your education journey</p>
            </div>
            <button 
              onClick={handleRegisterClick}
              className={`bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isRegisterClicked ? 'scale-95 bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              Register to Learn More
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scholarships..."
                className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 flex items-center space-x-4">
         
          <span className="text-gray-600">{filteredScholarships.length} scholarships found</span>
        </div>

        {/* Scholarship Listings */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">{scholarship.title}</h2>
                </div>
                <p className="text-gray-600 mb-2">Provider: {scholarship.provider}</p>
                <p className="text-green-600 font-semibold mb-4">Amount: {scholarship.amount}</p>
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Eligibility:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {scholarship.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Deadline: {scholarship.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
