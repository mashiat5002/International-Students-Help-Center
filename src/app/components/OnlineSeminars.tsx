'use client';

import React, { useState, useEffect } from 'react';

interface Seminar {
  id: string;
  title: string;
  institution: string;
  date: string;
  time: string;
  duration: string;
  speaker: {
    name: string;
    title: string;
    institution: string;
    bio?: string;
  };
  description: string;
  topics: string[];
  registrationUrl?: string;
  recordingUrl?: string;
  type: 'upcoming' | 'live' | 'recorded';
  maxParticipants?: number;
  currentParticipants?: number;
  requirements?: string[];
  materials?: {
    title: string;
    url: string;
  }[];
}

interface ScheduledMeeting {
  id: string;
  title: string;
  institution: string;
  date: string;
  time: string;
  duration: string;
  type: 'seminar' | 'meeting';
  status: 'upcoming' | 'completed' | 'cancelled';
  joinUrl?: string;
  speaker?: {
    name: string;
    title: string;
    institution: string;
  };
  registrationDate: string;
  reminderSet: boolean;
}

interface RegistrationFormData {
  name: string;
  email: string;
  institution?: string;
  comments?: string;
}

interface RegistrationModalProps {
  seminar: Seminar;
  onClose: () => void;
  onSubmit: (formData: RegistrationFormData) => void;
}

interface Registration {
  seminarId: string;
  name: string;
  email: string;
  institution?: string;
  comments?: string;
  registrationDate: string;
}

const SeminarCard = React.memo(({ 
  seminar,
  isSelected,
  onClick 
}: { 
  seminar: Seminar;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const getStatusColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'recorded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h3 className="text-lg font-bold text-blue-900 mb-1">{seminar.title}</h3>
            <p className="text-sm text-gray-600">{seminar.institution}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seminar.type)}`}>
            {seminar.type.charAt(0).toUpperCase() + seminar.type.slice(1)}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {seminar.date}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time:</span> {seminar.time}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {seminar.duration}
          </p>
        </div>
      </div>
    </div>
  );
});

const SeminarDetails = React.memo(({ 
  seminar, 
  onRegister 
}: { 
  seminar: Seminar;
  onRegister: (seminar: Seminar) => void;
}) => (
  <div className="space-y-6">
    {/* Header Section */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h2 className="text-xl font-bold text-blue-900 mb-2">{seminar.title}</h2>
      <p className="text-gray-600">{seminar.description}</p>
    </div>

    {/* Speaker Information */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Speaker</h4>
      <div className="space-y-2">
        <p className="font-medium text-blue-900">{seminar.speaker.name}</p>
        <p className="text-sm text-gray-600">{seminar.speaker.title}</p>
        <p className="text-sm text-gray-600">{seminar.speaker.institution}</p>
        {seminar.speaker.bio && (
          <p className="text-sm text-gray-600 mt-2">{seminar.speaker.bio}</p>
        )}
      </div>
    </div>

    {/* Topics */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Topics Covered</h4>
      {seminar.topics && seminar.topics.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {seminar.topics.map((topic, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">Not Available</p>
      )}
    </div>

    {/* Registration/Recording Section */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">
        {seminar.type === 'recorded' ? 'Recording' : 'Registration'}
      </h4>
      {seminar.type === 'recorded' ? (
        seminar.recordingUrl ? (
          <a 
            href={seminar.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Recording
          </a>
        ) : (
          <p className="text-sm text-gray-500 italic">Recording Not Available</p>
        )
      ) : (
        <div className="space-y-3">
          {seminar.registrationUrl ? (
            <>
              {seminar.maxParticipants && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Available Spots:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${((seminar.currentParticipants || 0) / seminar.maxParticipants) * 100}%` 
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {seminar.maxParticipants - (seminar.currentParticipants || 0)} spots remaining
                  </p>
                </div>
              )}
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  onRegister(seminar);
                }}
                href={seminar.registrationUrl}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500 italic">Registration Not Available</p>
          )}
        </div>
      )}
    </div>

    {/* Requirements */}
    {seminar.requirements && (
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Requirements</h4>
        {seminar.requirements.length > 0 ? (
          <ul className="space-y-2">
            {seminar.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {req}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No specific requirements</p>
        )}
      </div>
    )}

    {/* Materials */}
    {seminar.materials && (
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Materials</h4>
        {seminar.materials.length > 0 ? (
          <div className="space-y-3">
            {seminar.materials.map((material, index) => (
              <a
                key={index}
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {material.title}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No materials available</p>
        )}
      </div>
    )}
  </div>
));

const RegistrationModal = ({ seminar, onClose, onSubmit }: RegistrationModalProps) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    institution: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-900">Register for Seminar</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up z-50">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
};

const OnlineSeminars = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'recorded'>('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registeredSeminars, setRegisteredSeminars] = useState<Seminar[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Demo data
    const demoSeminars: Seminar[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning',
        institution: 'Stanford University',
        date: '2024-03-25',
        time: '14:00 GMT',
        duration: '2 hours',
        speaker: {
          name: 'Dr. Sarah Johnson',
          title: 'Professor of Computer Science',
          institution: 'Stanford University',
          bio: 'Leading researcher in machine learning with over 15 years of experience.'
        },
        description: 'A comprehensive introduction to machine learning fundamentals and applications.',
        topics: ['Neural Networks', 'Supervised Learning', 'Model Evaluation'],
        type: 'upcoming',
        registrationUrl: 'https://stanford.edu/ml-seminar',
        maxParticipants: 100,
        currentParticipants: 65,
        requirements: ['Basic Python knowledge', 'Understanding of linear algebra'],
        materials: [
          {
            title: 'Presentation Slides',
            url: 'https://stanford.edu/slides'
          },
          {
            title: 'Code Repository',
            url: 'https://github.com/ml-seminar'
          }
        ]
      },
      {
        id: '2',
        title: 'Data Science in Practice',
        institution: 'MIT',
        date: '2024-03-20',
        time: '18:00 GMT',
        duration: '1.5 hours',
        speaker: {
          name: 'Prof. Michael Chen',
          title: 'Associate Professor',
          institution: 'MIT'
        },
        description: 'Real-world applications of data science in industry and research.',
        topics: ['Data Analysis', 'Statistical Methods', 'Case Studies'],
        type: 'live',
        registrationUrl: 'https://mit.edu/ds-seminar',
        maxParticipants: 150,
        currentParticipants: 120
      },
      {
        id: '3',
        title: 'Advanced Deep Learning Techniques',
        institution: 'Carnegie Mellon University',
        date: '2024-02-15',
        time: '15:00 GMT',
        duration: '2.5 hours',
        speaker: {
          name: 'Dr. Alex Thompson',
          title: 'Research Director',
          institution: 'CMU'
        },
        description: 'Advanced concepts in deep learning and their implementations.',
        topics: ['Transformers', 'GANs', 'Reinforcement Learning'],
        type: 'recorded',
        recordingUrl: 'https://cmu.edu/recording'
      }
    ];

    setSeminars(demoSeminars);
  }, []);

  const filteredSeminars = seminars.filter(
    seminar => filter === 'all' || seminar.type === filter
  );

  const handleRegistration = (seminar: Seminar) => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormData) => {
    if (selectedSeminar && selectedSeminar.maxParticipants && selectedSeminar.currentParticipants !== undefined) {
      // Create new registration
      const newRegistration: Registration = {
        seminarId: selectedSeminar.id,
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        comments: formData.comments,
        registrationDate: new Date().toISOString()
      };

      // Update the seminars list with decreased spot count
      const updatedSeminars = seminars.map(sem => {
        if (sem.id === selectedSeminar.id) {
          const updatedSeminar = {
            ...sem,
            currentParticipants: (sem.currentParticipants || 0) + 1
          };
          // If this is the selected seminar, update the selectedSeminar state as well
          if (selectedSeminar.id === sem.id) {
            setSelectedSeminar(updatedSeminar);
          }
          return updatedSeminar;
        }
        return sem;
      });

      // Update all states at once
      setSeminars(updatedSeminars);
      setRegistrations(prev => [...prev, newRegistration]);
      setRegisteredSeminars(prev => [...prev, selectedSeminar]);
      setShowToast(true);
      setShowRegistrationModal(false);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Seminars List */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-900">Online Seminars</h2>
              <div className="flex gap-2">
                {(['all', 'upcoming', 'live', 'recorded'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                      ${filter === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {filteredSeminars.map(seminar => (
                <SeminarCard
                  key={seminar.id}
                  seminar={seminar}
                  isSelected={selectedSeminar?.id === seminar.id}
                  onClick={() => setSelectedSeminar(seminar)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Seminar Details */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="h-full">
            {selectedSeminar ? (
              <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <SeminarDetails 
                  seminar={selectedSeminar}
                  onRegister={handleRegistration}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select a seminar to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add the modal */}
      {showRegistrationModal && selectedSeminar && (
        <RegistrationModal
          seminar={selectedSeminar}
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={handleRegistrationSubmit}
        />
      )}

      {/* Add the toast */}
      {showToast && (
        <Toast 
          message="Successfully registered for the seminar!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default OnlineSeminars; 