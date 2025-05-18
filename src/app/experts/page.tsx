'use client';

import { useState } from 'react';
import { Users, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import RegisterCard from '@/app/components/auth/RegisterCard';
import LoginCard from '@/app/components/auth/LoginCard';
import BackButton from '@/app/components/layout/BackButton';
import Footer from '@/app/components/layout/Footer';

export default function ExpertsPage() {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with experienced professionals and industry experts who can guide you through your educational journey.',
    },
    {
      icon: MessageSquare,
      title: 'Personalized Support',
      description: 'Get one-on-one consultations and tailored advice based on your specific needs and goals.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with our flexible scheduling system.',
    },
    {
      icon: CheckCircle2,
      title: 'Verified Experts',
      description: 'All our experts are thoroughly vetted and certified in their respective fields.',
    },
  ];

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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Support</h1>
              <p className="text-xl">Get personalized guidance from industry experts to help you achieve your educational goals</p>
            </div>
            <button 
              onClick={handleRegisterClick}
              className={`bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isRegisterClicked ? 'scale-95 bg-purple-100' : 'hover:bg-gray-100'
              }`}
            >
              Register for Expert Support
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Expert Support?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Register</h3>
                  <p className="text-gray-600">Create your account and complete your profile to get started.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Browse Experts</h3>
                  <p className="text-gray-600">Explore our network of experts and find the perfect match for your needs.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Schedule Session</h3>
                  <p className="text-gray-600">Book a consultation at a time that works for you.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Support</h3>
                  <p className="text-gray-600">Connect with your expert and receive personalized guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Expert Support?</h2>
        <p className="text-xl text-gray-600 mb-8">Join our community and start your journey to success today</p>
        <button
          onClick={handleRegisterClick}
          className={`bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
            isRegisterClicked ? 'scale-95 bg-purple-700' : 'hover:bg-purple-700'
          }`}
        >
          Register Now
        </button>
      </div>
      <Footer />
    </div>
  );
}
