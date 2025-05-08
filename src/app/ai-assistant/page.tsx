'use client';

import { useState } from 'react';
import { Bot, MessageSquare, Brain, Zap } from 'lucide-react';
import RegisterCard from '@/components/auth/RegisterCard';
import LoginCard from '@/components/auth/LoginCard';
import BackButton from '@/components/layout/BackButton';
import Footer from '@/components/layout/Footer';

export default function AIAssistantPage() {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const features = [
    {
      icon: Bot,
      title: '24/7 AI Assistant',
      description: 'Get instant help and guidance from our AI assistant anytime, anywhere.',
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Engage in human-like conversations with our advanced AI technology.',
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI that adapts to your learning style and provides personalized assistance.',
    },
    {
      icon: Zap,
      title: 'Quick Responses',
      description: 'Get immediate answers to your questions and concerns.',
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Learning Assistant</h1>
              <p className="text-xl">Your personal AI companion for educational success</p>
            </div>
            <button 
              onClick={handleRegisterClick}
              className={`bg-white text-green-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isRegisterClicked ? 'scale-95 bg-green-100' : 'hover:bg-gray-100'
              }`}
            >
              Register to Access AI
            </button>
          </div>
          
          {/* AI Assistant Preview */}
          <div className="max-w-2xl bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Bot className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold">AI Assistant</span>
            </div>
            <div className="space-y-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-white">How can I help you with your studies today?</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-white/20 p-4 rounded-lg max-w-[80%]">
                  <p className="text-white">I need help understanding calculus concepts...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">AI Assistant Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-green-600 mb-4" />
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
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Register</h3>
                  <p className="text-gray-600">Create your account to access the AI assistant.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start Chatting</h3>
                  <p className="text-gray-600">Begin your conversation with the AI assistant.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Help</h3>
                  <p className="text-gray-600">Receive instant assistance with your studies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Experience AI Learning?</h2>
        <p className="text-xl text-gray-600 mb-8">Join our community and enhance your learning journey with AI</p>
        <button
          onClick={handleRegisterClick}
          className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
            isRegisterClicked ? 'scale-95 bg-green-700' : 'hover:bg-green-700'
          }`}
        >
          Register Now
        </button>
      </div>
      <Footer />
    </div>
  );
}
