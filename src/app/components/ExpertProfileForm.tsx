import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { call_fetch_expert_logged_id_info } from '../(utils)/call_fetch_expert_logged_id_info/call_fetch_expert_logged_id_info';
import { call_update_expert_profile_info } from '../(utils)/call_update_expert_profile_info/call_update_expert_profile_info';
import Toast from './common/Toast';

const initialState = {
  email: '',
  full_name: '',
  about: '',
  img: '',
  social_media_link: '',
  profession: '',
  institution: '',
  country: ''
 
};
type details={
      email: string;
    full_name: string;
    about: string;
    img: string;
    social_media_link1: string;
    social_media_link2: string;
    social_media_link3: string;
    profession: string;
    institution: string;
    country: string;
    joined: string;
    rating: string;
    

}
const ExpertProfileForm = ({ details,setDetails }: { details: any,setDetails:Dispatch<SetStateAction<details>> }) => {
  const [isloading, setisloading] = useState(false);
  const [form, setForm] = useState(initialState);
  
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({...details,[e.target.name]: e.target.value});
    setForm({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setisloading(true)
    console.log(form);
    const res= await call_update_expert_profile_info(form)
    setisloading(false)
    console.log(res)
     if (res=="successfully updated details") {
        
        settoastType("success")
        setToastMessage(res);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
      } else {
      
      settoastType("failed")
      setToastMessage(res);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
        console.error('OTP sending failed');
      }
  };
useEffect(()=>{
  setForm(details)
},[])
  
  return (
    <>
    <div className="min-h-fit   rounded-2xl flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-pink-200 rounded-2xl shadow-xl w-full max-w-2xl p-8 border border-gray-200 flex flex-col gap-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-2">Profile Info</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
               
                value={form.full_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={details.full_name}
                required
              />
            </div>
           
           
            <div>
              <label className="block text-xs font-medium mb-1">Profession</label>
              <input
                type="text"
                name="profession"
                value={form.profession}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={details.profession}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Institution</label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Institution"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={details.country}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 custom-scrollbar">About (Max Length 100 characters) </label>
              <textarea
               maxLength={100}
                name="about"
                value={form.about}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                placeholder={details.about} 
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Profile Image URL</label>
              <input
                type="text"
                name="img"
                value={form.img}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={details.img}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Social Media Links</label>
              <input
                type="text"
                name="social_media_link"
                value={form.social_media_link}
                onChange={handleChange}
                className="w-full border mb-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={details.social_media_link}
              />
              <input
                type="text"
                name="social_media_link"
                value={form.social_media_link}
                onChange={handleChange}
                className="w-full border mb-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Social Media Link"
              />
              <input
                type="text"
                name="social_media_link"
                value={form.social_media_link}
                onChange={handleChange}
                className="w-full border mb-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Social Media Link"
              />
            </div>
            
          
            
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-blue-700 transition"
        >
          {isloading?"Processing..":"Update"}
        </button>
      </form>
    </div>
    {showToast&&<Toast
      type={toastType}
      message={toastMessage}
    />}
    </>
  );
};

export default ExpertProfileForm; 