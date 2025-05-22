'use client';

import React, { useState, useEffect } from 'react';
import { call_fetch_scheduled_seminars } from '@/app/(utils)/call_fetch_scheduled_seminars/route';
import SelectedExpartCard from './SelectedExpartCard';

interface IScheduledSeminars {
  _id: string;
  expert_id: string;
  meeting_topic: string;
  Creation_time: string;
  Scheduled_time: string;
  max_Participants: string;
  registed_participants: string;
  duration: string;
}

const SeminarCard = React.memo(({ 
  seminar,
  isSelected,
  onClick 
}: { 
  seminar: IScheduledSeminars;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border 
        transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-blue-500 shadow-blue-100 scale-[1.02]' 
          : 'border-gray-100 hover:border-blue-300'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-1">{seminar.meeting_topic}</h3>
            <p className="text-sm text-gray-600">Scheduled: {new Date(seminar.Scheduled_time).toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {seminar.duration} minutes
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Max Participants:</span> {seminar.max_Participants}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Registered:</span> {seminar.registed_participants}
          </p>
        </div>
      </div>
    </div>
  );
});

const SeminarDetails = React.memo(({ 
  seminar
}: { 
  seminar: IScheduledSeminars;
}) => (
  <div className="space-y-6">
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h2 className="text-xl font-bold text-blue-900 mb-2">{seminar.meeting_topic}</h2>
      <p className="text-gray-600">Scheduled: {new Date(seminar.Scheduled_time).toLocaleString()}</p>
      <p className="text-gray-600">Duration: {seminar.duration} minutes</p>
      <p className="text-gray-600">Max Participants: {seminar.max_Participants}</p>
      <p className="text-gray-600">Registered: {seminar.registed_participants}</p>
      <p className="text-gray-400 text-xs mt-2">Created: {new Date(seminar.Creation_time).toLocaleString()}</p>
    </div>
  </div>
));

const OnlineSeminars = () => {
  const [seminars, setSeminars] = useState<IScheduledSeminars[]>([]);
  const [selectedSeminar, setSelectedSeminar] = useState<IScheduledSeminars | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSeminars = async () => {
      setIsLoading(true);
      const response = await call_fetch_scheduled_seminars();
      setSeminars(response.data || []);
      setIsLoading(false);
    };
    fetchSeminars();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Seminars List */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-900">Online Seminars</h2>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : seminars.length === 0 ? (
                <div className="text-center text-gray-500">No seminars available.</div>
              ) : seminars.map(seminar => (
                <SeminarCard
                  key={seminar._id}
                  seminar={seminar}
                  isSelected={selectedSeminar?._id === seminar._id}
                  onClick={() => setSelectedSeminar(seminar)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Seminar Details */}
        <div className="h-full">
          {selectedSeminar ? (
            <>
            <SelectedExpartCard/>
            <div className="h-full overflow-y-auto custom-scrollbar p-6">
              <SeminarDetails seminar={selectedSeminar} />
            </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a seminar to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineSeminars; 