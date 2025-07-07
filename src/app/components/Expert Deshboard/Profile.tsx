'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ExpertProfileForm from '../ExpertProfileForm';
import LoadingSpinner from '../common/LoadingSpinner';
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

const Profile = ({ details,setDetails, loading_profile_info }: { details: any ,setDetails:Dispatch<SetStateAction<details>>, loading_profile_info: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  

  if (isEditing) {
    return (
      <div className="max-w-3xl mt-2 mx-auto">
        <button
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition"
          onClick={() => setIsEditing(false)}
        >
          &#8592;
        </button>
        <ExpertProfileForm details={details} setDetails={setDetails}/>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mt-16 mx-auto bg-pink-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
      {/* Left Side */}
      {loading_profile_info?<div className='h-full w-full'><LoadingSpinner/></div>:<div className="flex-1 w-full">
       
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-3xl font-bold text-black">{details.full_name}</h2>
          <span className="inline-flex items-center justify-center w-7 h-7 bg-white rounded-full border border-gray-300">
            {/* Verified badge icon */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e0e0e0"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
        <div className="text-gray-700 font-medium mb-4">{details.email}</div>
        <div className="text-gray-800 mb-4">
        {details.about && <span>✓ <strong>About:</strong> {details.institution}</span>}

         
        </div>
        <div className="mb-4">
          <div className="font-semibold text-black mb-2">Profession</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-black text-base">
            {details.institution && <span>✓ <strong>Institution:</strong> {details.institution}</span>}
            {details.profession && <span>✓ <strong>Profession:</strong> {details.profession}</span>}
            {details.country && <span>✓ <strong>Country:</strong> {details.country}</span>}
            {/* OZG is not a field, but if you want to show it only if present: */}
            {details.OZG && <span>✓ <strong>OZG:</strong> {details.OZG}</span>}
            {details.joined && <span>✓ <strong>Joined:</strong> {details.joined}</span>}
            {details.rating && <span>✓ <strong>Rating:</strong> {details.rating}</span>}
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex flex-col gap-2 mb-4">
          
          {details.social_media_link1 && (
            <div className='flex gap-2'>
              <p>Social Media 1:</p>
              {details.social_media_link1 === 'Not Provided' ? (
                <p>{details.social_media_link1}</p>
              ) : (
                <a href={details.social_media_link1} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">  {details.social_media_link1}</a>
              )}
            </div>
          )}
          {details.social_media_link2 && (
            <div className='flex gap-2'>
              <p>Social Media 2:</p>
              {details.social_media_link2 === 'Not Provided' ? (
                <p>{details.social_media_link2}</p>
              ) : (
                <a href={details.social_media_link2} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">  {details.social_media_link2}</a>
              )}
            </div>
          )}
          {details.social_media_link3 && (
            <div className='flex gap-2'>
              <p>Social Media 3:</p>
              {details.social_media_link3 === 'Not Provided' ? (
                <p>{details.social_media_link3}</p>
              ) : (
                <a href={details.social_media_link3} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">  {details.social_media_link3}</a>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>}
      {/* Right Side - Profile Image */}
      <div className="flex-shrink-0">
        {details.img && (
          <img
            src={details.img}
            alt={details.full_name || 'Profile Image'}
            className="w-40 h-40 rounded-full object-cover border-4 border-pink-300 shadow-md"
          />
        )}
      </div>
    </div>
  );
};

export default Profile;             