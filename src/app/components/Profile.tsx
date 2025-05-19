'use client';

import React, { useState, useEffect } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  institution?: string;
  country?: string;
  fieldOfStudy?: string;
  preferredLevel?: string;
  bio?: string;
  notifications: {
    email: boolean;
    deadlines: boolean;
    newPrograms: boolean;
  };
}

const Profile = ({ details }: { details: any }) => {
  

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Mashiat',
    lastName: 'Islam',
    email: 'john.doe@example.com',
    institution: 'University of Technology',
    country: 'Germany',
    fieldOfStudy: 'Computer Science',
    preferredLevel: 'Masters',
    bio: 'Aspiring graduate student interested in AI and Machine Learning.',
    notifications: {
      email: true,
      deadlines: true,
      newPrograms: false,
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically save to backend/localStorage
  };

  return (
    <div className="w-full h-full overflow-y-hidden">
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
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                  ${isEditing 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          firstName: e.target.value
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{details.full_name}</p>
                    )}
                  </div>
                
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        email: e.target.value
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-600">{details.email}</p>
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
                      value={editedProfile.fieldOfStudy || ''}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        fieldOfStudy: e.target.value
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.fieldOfStudy || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Level
                  </label>
                  {isEditing ? (
                    <select
                      value={editedProfile.preferredLevel || ''}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        preferredLevel: e.target.value
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select level</option>
                      <option value="Bachelors">Bachelors</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                    </select>
                  ) : (
                    <p className="text-gray-600">{profile.preferredLevel || 'Not specified'}</p>
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
                      notifications: {
                        ...editedProfile.notifications,
                        email: !editedProfile.notifications.email
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${!isEditing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${editedProfile.notifications.email ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${editedProfile.notifications.email ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-700">Deadline Reminders</h3>
                    <p className="text-sm text-gray-500">Get notified about approaching deadlines</p>
                  </div>
                  <button
                    onClick={() => isEditing && setEditedProfile({
                      ...editedProfile,
                      notifications: {
                        ...editedProfile.notifications,
                        deadlines: !editedProfile.notifications.deadlines
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${!isEditing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${editedProfile.notifications.deadlines ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${editedProfile.notifications.deadlines ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-700">New Programs</h3>
                    <p className="text-sm text-gray-500">Get notified about new program matches</p>
                  </div>
                  <button
                    onClick={() => isEditing && setEditedProfile({
                      ...editedProfile,
                      notifications: {
                        ...editedProfile.notifications,
                        newPrograms: !editedProfile.notifications.newPrograms
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${!isEditing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${editedProfile.notifications.newPrograms ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${editedProfile.notifications.newPrograms ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 