'use client';

import React, { useState, useEffect } from 'react';
import { call_push_edited_profile } from '../(utils)/call_push_edited_profile/route';
import { call_fetch_student_profile_info } from '../(utils)/call_fetch_student_profile_info/route';
import LoadingSpinner from './common/LoadingSpinner';

interface UserProfile {
  full_name: string;
  email: string;
  institution?: string;
  country?: string;
  preferred_field_of_study?: string;
  preferred_level_of_study?: string;
  bio?: string;
  enable_email: boolean;
}

const Profile = ({ details }: { details: any }) => {
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    email: '',
    institution: '',
    country: '',
    preferred_field_of_study: '',
    preferred_level_of_study: '',
    bio: '',
    enable_email: true,
  });

  const [isloading, setIsloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsloading(true);
      try {
        const response = await call_fetch_student_profile_info();
        const userData = response.data[0];
        
        console.log('Raw userData from database:', userData);
        console.log('enable_email value from database:', userData.enable_email, typeof userData.enable_email);
        
        // Map the database data to our interface structure
        const mappedProfile: UserProfile = {
          full_name: userData.full_name || '',
          email: userData.email || '',
          institution: userData.institution || '',
          country: userData.country || '',
          preferred_field_of_study: userData.preferred_field_of_study || userData.field_of_study || '',
          preferred_level_of_study: userData.preferred_level_of_study || userData.preferred_level || '',
          bio: userData.bio || '',
          enable_email: userData.enable_email !== undefined ? 
            (userData.enable_email === 'true' || userData.enable_email === true) : true,
        };
        
        console.log('Mapped profile data:', mappedProfile);
        console.log('Final enable_email value:', mappedProfile.enable_email);
        
        setProfile(mappedProfile);
        setEditedProfile(mappedProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Fallback to details prop if available
        if (details) {
          const fallbackProfile: UserProfile = {
            full_name: details.full_name || '',
            email: details.email || '',
            institution: details.institution || '',
            country: details.country || '',
            preferred_field_of_study: details.preferred_field_of_study || details.field_of_study || '',
            preferred_level_of_study: details.preferred_level_of_study || details.preferred_level || '',
            bio: details.bio || '',
            enable_email: details.enable_email !== undefined ? 
              (details.enable_email === 'true' || details.enable_email === true) : true,
          };
          setProfile(fallbackProfile);
          setEditedProfile(fallbackProfile);
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchProfileData();
  }, [details]);

  const handleSave = async () => {
    try {
      setIsloading(true);
      const response = await call_push_edited_profile(editedProfile);
      console.log('Profile update response:', response);
      
      if (response.success) {
        setProfile(editedProfile);
        setIsEditing(false);
        // You could add a success toast here
      } else {
        console.error('Failed to update profile:', response.message);
        // You could add an error toast here
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // You could add an error toast here
    } finally {
      setIsloading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile); // Reset to original data
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full overflow-y-hidden">
      {isloading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full min-h-[calc(100vh-4rem)] animate-fadeIn p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-blue-900 mb-2">
                    {isEditing ? 'Edit Profile' : 'My Profile'}
                  </h1>
                  <p className="text-gray-600">
                    Manage your personal information and preferences
                  </p>
                </div>
                <div className="flex gap-2">
                  {isEditing && (
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg transition-colors bg-gray-500 hover:bg-gray-600 text-white flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    disabled={isloading}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                      ${isEditing 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'}
                      ${isloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isEditing ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.full_name}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          full_name: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.full_name || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        disabled
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                        placeholder="Email cannot be changed"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.email || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.institution || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          institution: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.institution || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.country || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          country: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.country || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Preferences */}
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Academic Preferences
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.preferred_field_of_study || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          preferred_field_of_study: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.preferred_field_of_study || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Level
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.preferred_level_of_study || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          preferred_level_of_study: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select level</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                      </select>
                    ) : (
                      <p className="text-gray-600">{profile.preferred_level_of_study || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedProfile.bio || ''}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          bio: e.target.value
                        })}
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.bio || 'No bio provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 md:col-span-2">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Notification Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-700">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => isEditing && setEditedProfile({
                        ...editedProfile,
                        enable_email: !editedProfile.enable_email
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${!isEditing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        ${editedProfile.enable_email ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${editedProfile.enable_email ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 