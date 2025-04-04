'use client';
import { useState } from 'react';

interface LoginCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginCard({ isOpen, onClose }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log('Login attempted with:', { email, password });
    
    // For now, we'll just redirect to the homepage
    window.location.href = '/homepage';
    // Later this will be replaced with proper authentication
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center backdrop-blur-md"
         onClick={onClose}>
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-white/20"
           onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <button type="button" className="text-blue-400 hover:text-blue-300">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}