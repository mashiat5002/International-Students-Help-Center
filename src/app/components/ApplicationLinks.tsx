'use client';

import React, { useState, useEffect } from 'react';
import { call_fetch_application_links } from '../(utils)/call_fetch_application_links/route';
import LoadingSpinner from './common/LoadingSpinner';

interface ApplicationInfo {
  journeyId: string;
  title: string;
  institution: string;
  program: string;
  deadline: string;
  applicationUrl: string;
  emailAddresses: {
    admissions: string;
    department: string;
    international: string;
  };
  requirements: string[];
  documents: string[];
  tips: string[];
  additionalResources: {
    title: string;
    url: string;
    description: string;
  }[];
}

const ApplicationCard = React.memo(({ 
  application,
  isSelected,
  onClick 
}: { 
  application: ApplicationInfo;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-lg overflow-hidden border 
      transition-all duration-300 cursor-pointer
      ${isSelected 
        ? 'border-blue-500 shadow-blue-100 scale-[1.02]' 
        : 'border-blue-100 hover:border-blue-300'}`}
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">{application.title}</h3>
          <p className="text-sm text-gray-600">{application.institution}</p>
          <p className="text-sm text-gray-600">{application.program}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg text-sm
          ${new Date(application.deadline) < new Date() 
            ? 'bg-red-100 text-red-800' 
            : new Date(application.deadline).getTime() - new Date().getTime() <= 30 * 24 * 60 * 60 * 1000
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
          }`}
        >
          <span className="block text-xs font-medium">Deadline</span>
          <span>{application.deadline}</span>
        </div>
      </div>
    </div>
  </div>
));

const ApplicationDetails = React.memo(({ application }: { application: ApplicationInfo }) => (
  <div className="space-y-6">
    {/* Application URL */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Application Portal</h4>
      {application.applicationUrl ? (
        <a 
          href={application.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Visit Application Portal
        </a>
      ) : (
        <p className="text-sm text-gray-500 italic">Not Available</p>
      )}
    </div>

    {/* Contact Information */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Contact Information</h4>
      {application.emailAddresses && Object.values(application.emailAddresses).some(email => email) ? (
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Admissions Office:</p>
            {application.emailAddresses.admissions ? (
              <a href={`mailto:${application.emailAddresses.admissions}`} 
                className="text-blue-600 hover:text-blue-800 transition-colors">
                {application.emailAddresses.admissions}
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">Not Available</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Department Contact:</p>
            {application.emailAddresses.department ? (
              <a href={`mailto:${application.emailAddresses.department}`}
                className="text-blue-600 hover:text-blue-800 transition-colors">
                {application.emailAddresses.department}
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">Not Available</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">International Office:</p>
            {application.emailAddresses.international ? (
              <a href={`mailto:${application.emailAddresses.international}`}
                className="text-blue-600 hover:text-blue-800 transition-colors">
                {application.emailAddresses.international}
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">Not Available</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No Contact Information Available</p>
      )}
    </div>

    {/* Requirements and Documents */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Requirements</h4>
        {application.requirements && application.requirements.length > 0 ? (
          <ul className="space-y-2">
            {application.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {req}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">Not Available</p>
        )}
      </div>

      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Required Documents</h4>
        {application.documents && application.documents.length > 0 ? (
          <ul className="space-y-2">
            {application.documents.map((doc, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {doc}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">Not Available</p>
        )}
      </div>
    </div>

    {/* Application Tips */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Application Tips</h4>
      {application.tips && application.tips.length > 0 ? (
        <ul className="space-y-2">
          {application.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">Not Available</p>
      )}
    </div>

    

    {/* Additional Resources */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Additional Resources</h4>
      {application.additionalResources && application.additionalResources.length > 0 ? (
        <div className="space-y-4">
          {application.additionalResources.map((resource, index) => (
            <div key={index} className="border-b border-blue-100 last:border-0 pb-4 last:pb-0">
              <h5 className="font-medium text-blue-900 mb-1">{resource.title}</h5>
              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
              <a 
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">Not Available</p>
      )}
    </div>
  </div>
));

const ApplicationLinks = () => {
  const [applications, setApplications] = useState<ApplicationInfo[]>([]);
  const [isloading, setisloading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationInfo | null>(null);

  useEffect(() => {
    const call_fun = async () => {
      setisloading(true);
      const res=await call_fetch_application_links("empty");
      setisloading(false);
      console.log(res.data);
      setApplications(res.data);
    }
    call_fun();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Applications List */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-blue-900">Application Links</h2>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {isloading?<LoadingSpinner/>:applications.map(app => (
                <ApplicationCard
                  key={app.journeyId}
                  application={app}
                  isSelected={selectedApplication?.journeyId === app.journeyId}
                  onClick={() => setSelectedApplication(app)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="h-full">
            {selectedApplication ? (
              <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <ApplicationDetails application={selectedApplication} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select an application to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationLinks; 