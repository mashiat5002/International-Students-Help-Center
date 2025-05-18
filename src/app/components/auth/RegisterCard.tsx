'use client';
import { call_activate_user_db } from '@/app/(utils)/call_activate_user_db/route';
import { call_update_varification_key_db } from '@/app/(utils)/call_update_varification_key_db/route';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Toast from '../common/Toast';
import { call_register } from '@/app/(utils)/call_register/route';

interface RegisterCardProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLogin: () => void;
  initialEmail?: string;
}

export default function RegisterCard({ isOpen, onClose, onShowLogin, initialEmail }: RegisterCardProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: initialEmail || '',
    password: '',
    confirmPassword: '',
   
  });
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
  
    });
    setOtp('');
    setShowOtpForm(false);
    setIsVerifying(false);
    setShowResendSuccess(false);
    setIsResending(false);
    setIsRegistering(false);

  };

  useEffect(() => {
    if (initialEmail) {
      setFormData((prev) => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

 

  if (!isOpen) return null;

  const handleResendOtp = async () => {
    
    setIsResending(true);
    try {
      const response = await call_update_varification_key_db(formData.email);
      // if(response.res.modifiedCount)
      // console.log("response.res.modifiedCount")
      if (response.res.modifiedCount === 1) {
        
        settoastType("success")
        setToastMessage('New OTP has been sent to :' + formData.email);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      } else {
      
      settoastType("failed")
      setToastMessage("OTP sending failed");
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
        console.error('OTP sending failed');
      }
    } catch (error) {
      
      settoastType("failed")
      setToastMessage('Error during otp sending:'+ error);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsResending(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent ) => {
    e.preventDefault();
    // Handle registration logic here
    if (formData.password !== formData.confirmPassword) {
      
      settoastType("failure")
      setToastMessage("Passwords do not match");
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      return;
    }
    // setIsRegistering(true);
    try {
      const response = await call_register(formData.fullName,formData.email,formData.password);
     const res= await response.json()

       if (res.res=="Name is required") {
        settoastType("failed")
        setToastMessage(res.res);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        
      } 
       else if (res.res=="Invalid Password") {
        
       
        settoastType("failed")
        setToastMessage(res.reason);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        
      } 
       else if (res.res=="Invalid email input") {
        
       
        settoastType("failed")
        setToastMessage(res.res);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        
      } 
      else if (res.res=="Awaiting to validate you email!!") {
        
       
        settoastType("success")
        setToastMessage("OTP sent to you email");
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        setShowOtpForm(true)
        setIsRegistering(true);
      } else {
       
        settoastType("failed")
      setToastMessage(res.res);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
        
      }
    } catch (error) {
    
      settoastType("failed")
      setToastMessage('Error during registration:'+ error);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      console.log(otp, formData.email);
      const response = await call_activate_user_db(formData.email, otp);

      if (response.res=="activated") {
       
        settoastType("success")
        setToastMessage('Registration Successful!');
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        setTimeout(() => {
          resetForm();
          onClose();
        }, 2000);
      } else {
        const email= formData.email
        const message= "Invalid OTP. A new OTP sent to:"+email
        
        settoastType("failed")
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      }
    } catch (error) {
      
      settoastType("failed")
      setToastMessage('Error during OTP verification:'+error);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <>
    <div className="fixed inset-0  bg-black bg-opacity-80 z-50 flex items-center justify-center backdrop-blur-md"
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
            {showOtpForm ? 'Verify Your Email' : 'Register as Student'}
          </h2>
          <p className="text-gray-300">
            {showOtpForm 
              ? 'Enter the OTP sent to your email'
              : 'Join our community today'
            }
          </p>
        </div>

       

        {!showOtpForm ? (
          <>
            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={()=>{
                document.cookie = `registering_as=student`;
                signIn('google',{
     state: JSON.stringify({ isExpert: "formData.isExpert" }),
  })}}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg 
                       hover:bg-black hover:text-white hover:right-2 hover:outline-blue-500 focus:outline-white focus:ring-2 
                       focus:ring-gray-500 focus:ring-offset-2 transition-all
                       flex items-center justify-center space-x-2 mb-3 "
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
              <span>Sign up with Google</span>
            </button>

            <div className="relative flex items-center justify-center mb-0">
              <div className="border-t border-gray-300/30 w-full"></div>
              <span className="bg-white/10 px-4 text-gray-300 text-sm">or</span>
              <div className="border-t border-gray-300/30 w-full"></div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div >
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

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
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>

             

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegistering ? 'Creating Account...' : 'Create Account as Student'}
              </button>

              <div className="text-center text-sm text-gray-300">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => {
                    onClose();
                    onShowLogin();
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                required
                maxLength={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="text-center text-sm text-gray-300">
              
              {isResending ? '' : 'Didn\'t receive the OTP ? '}
              <button 
                type="button" 
                className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleResendOtp}
                disabled={isResending}
              >
                {isResending ? 'Sending...' : 'Resend'}
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