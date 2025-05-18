'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoginCard from '@/app/components/auth/LoginCard';
import RegisterCard from '@/app/components/auth/RegisterCard';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Find Experts', href: '/experts' },
    { name: 'AI Assistant', href: '/ai-assistant' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleShowLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#000033]' : 'bg-transparent'
      } `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
                <span className="text-blue-400">I</span>SHC
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white/90 hover:text-white relative group px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive(link.href) ? 'text-white' : ''
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-300`}></span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                Register
              </button>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-white px-6 py-2.5 rounded-lg font-medium
                  border-2 border-white bg-transparent
                  transform hover:scale-105 transition-all duration-300
                  hover:bg-white hover:text-[#000033]"
              >
                Sign In
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white/90 hover:text-white px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive(link.href) 
                      ? 'text-white bg-white/10' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginCard 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onShowRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterCard 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onShowLogin={handleShowLogin}
      />
    </>
  );
}