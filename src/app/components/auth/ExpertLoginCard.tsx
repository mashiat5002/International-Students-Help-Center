'use client';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Toast from '../common/Toast';
import { call_update_expert_password } from '@/app/(utils)/call_update_expert_password/route';
import { call_expert_login_authentication } from '@/app/(utils)/call_expert_login_authentication/route';
import { call_expert_update_varification_key_db } from '@/app/(utils)/call_expert_update_varification_key_db/route';
import { call_is_expert_email_existing } from '../../../../lib/auth/is_email_existing';

interface LoginCardProps {
  isOpen: boolean;
  onClose: () => void;
  onShowRegister?: () => void;
}

export default function ExpertLoginCard({ isOpen, onClose, onShowRegister }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  
   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await call_expert_login_authentication(email, password);
      if (response.status === "Login Successful") {
        console.log('Login successful');
       
        settoastType("success")
      setToastMessage(`Login successful`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);
        
      }, 3000);
        setTimeout(() => {
          
          onClose();
          window.location.href = '/expert-dashboard';
          
        }, 1000);
      } 
       else {
        settoastType("failure")
      setToastMessage(response.status);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      }
    } catch (error) {
     
      settoastType("success")
      setToastMessage(`An error occurred during login`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      
      settoastType("failure")
      setToastMessage(`Please enter your email address first`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      return;
    }
    setIsVerifying(true);
    try {
      const res = await call_update_expert_password(email, confirmNewPassword, otp);
      console.log("res", res);
      if (res === "Password Updated") {
        settoastType("success")
      setToastMessage(`Password Updated`);
      setTimeout(() => {
          
          onClose();
        }, 2000);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      } else {
        
      settoastType("failure")
      setToastMessage(`Failed to update password`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      }
    } catch (error) {
     
      
      settoastType("failure")
      setToastMessage(`An error occurred while updating password`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      
      settoastType("failure")
      setToastMessage(`Passwords do not match`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      return;
    }
    setIsResetting(true);
    try {
      // First show OTP form after password is entered
      setShowForgotPassword(false);
      setShowOtpForm(true);
      // Send OTP to email
      const res = await call_expert_update_varification_key_db(email);
      
      if (res.res2.msg=="successfully sent email") {
        const message= "OTP sent to "+email
      settoastType("success")
      setToastMessage(`successfully sent email`+message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);

      } else {
        
        settoastType("failed")
      setToastMessage("Failed to send OTP");
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      settoastType("failure")
      setToastMessage(`Error sending OTP`);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsResetting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-white mb-2">
            {showOtpForm ? 'Verify OTP' : showForgotPassword ? 'Reset Password' : 'Sign In as Expert'}
          </h2>
          <p className="text-gray-300">
            {showOtpForm 
              ? 'Enter the OTP sent to your email'
              : showForgotPassword 
                ? 'Enter your new password'
                : 'Welcome back to your account'
            }
          </p>
        </div>

       

        {!showForgotPassword && !showOtpForm ? (
          <>
            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={() => {signIn('google'),
                 document.cookie = `registering_as=expert`;
              }}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg 
                       hover:bg-black hover:text-white hover:right-2 hover:outline-blue-500 focus:outline-white focus:ring-2 
                       focus:ring-gray-500 focus:ring-offset-2 transition-all
                       flex items-center justify-center space-x-2 mb-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="relative flex items-center justify-center mb-0">
              <div className="border-t border-gray-300/30 w-full"></div>
              <span className="bg-white/10 px-4 text-gray-300 text-sm">or</span>
              <div className="border-t border-gray-300/30 w-full"></div>
            </div>

            {/* Login Form */}
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="flex justify-between text-sm text-gray-300">
                <button 
                  type="button" 
                  className="text-blue-400 hover:text-blue-300"
                  onClick={async () => {
                    if (!email) {
                     
                      settoastType("failed")
                      setToastMessage('Please enter your email address first');
                      setShowToast(true);
                      setTimeout(() => {setShowToast(false);}, 3000);
                      return;
                    }
                    const res= await call_is_expert_email_existing(email)
                    if(res.status=="You are not registered. Please register with your email first."){
                      settoastType("failed")
                      setToastMessage('You are not registered. Please register with your email first.');
                      setShowToast(true);
                      setTimeout(() => {setShowToast(false);}, 3000);
                      return
                    }
                    
                    setShowForgotPassword(true);
                  }}
                >
                  Forgot password?
                </button>
                <div>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      onClose();
                      onShowRegister?.();
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : showOtpForm ? (
          /* OTP Verification Form */
          <form onSubmit={(e)=>{e.preventDefault()}} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>

            <button
              onClick={handleForgotPassword}
              disabled={isVerifying}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="text-center text-sm text-gray-300">
              <button 
                type="button" 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => {
                  setShowOtpForm(false);
                  setOtp('');
                }}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* New Password Form */
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isResetting}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResetting ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center text-sm text-gray-300">
              <button 
                type="button" 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => {
                  setShowForgotPassword(false);
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    {showToast&&<Toast
        type={toastType}
        message={toastMessage}
      />}
    </>
  );
}