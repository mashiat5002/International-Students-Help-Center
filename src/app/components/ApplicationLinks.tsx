'use client';

import React, { useState, useEffect } from 'react';

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
  roadmap: {
    step: string;
    description: string;
    timeline: string;
  }[];
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

    {/* Application Roadmap */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Application Roadmap</h4>
      {application.roadmap && application.roadmap.length > 0 ? (
        <div className="space-y-4">
          {application.roadmap.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <div>
                <h5 className="font-medium text-blue-900">{step.step}</h5>
                <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                <span className="text-xs text-blue-600 font-medium">{step.timeline}</span>
              </div>
            </div>
          ))}
        </div>
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
  const [selectedApplication, setSelectedApplication] = useState<ApplicationInfo | null>(null);

  useEffect(() => {
    const demoApplications: ApplicationInfo[] = [
      {
        journeyId: '1',
        title: 'Computer Science Application',
        institution: 'Massachusetts Institute of Technology',
        program: 'Master of Science in Computer Science',
        deadline: '2024-04-15',
        applicationUrl: 'https://gradadmissions.mit.edu/apply',
        emailAddresses: {
          admissions: 'admissions@mit.edu',
          department: 'csgrad@mit.edu',
          international: ''
        },
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          'Minimum GPA of 3.5',
          'GRE General Test scores',
          'TOEFL/IELTS scores for international students',
          'Three letters of recommendation'
        ],
        documents: [
          'Official transcripts',
          'Statement of Purpose',
          'Resume/CV',
          'GRE score report',
          'TOEFL/IELTS score report',
          'Letters of recommendation',
          'Portfolio (if applicable)'
        ],
        tips: [
          'Start your application early to meet all deadlines',
          'Focus on research experience in your statement of purpose',
          'Choose recommenders who know your academic work well',
          'Highlight specific faculty members you\'d like to work with',
          'Be specific about your research interests and goals'
        ],
        roadmap: [
          {
            step: 'Prepare Documentation',
            description: 'Gather all required documents and start drafting your statement of purpose',
            timeline: '3-4 months before deadline'
          },
          {
            step: 'Take Required Tests',
            description: 'Register and prepare for GRE and TOEFL/IELTS if needed',
            timeline: '2-3 months before deadline'
          },
          {
            step: 'Request Recommendations',
            description: 'Contact potential recommenders and provide them necessary information',
            timeline: '6-8 weeks before deadline'
          },
          {
            step: 'Submit Application',
            description: 'Complete and submit the online application with all required documents',
            timeline: '2-3 weeks before deadline'
          }
        ],
        additionalResources: [
          {
            title: 'Department Website',
            url: 'https://www.csail.mit.edu/',
            description: 'Explore research areas and faculty profiles'
          },
          {
            title: 'Funding Opportunities',
            url: 'https://gradadmissions.mit.edu/costs-funding',
            description: 'Information about scholarships and assistantships'
          },
          {
            title: 'Student Life',
            url: 'https://student.mit.edu/',
            description: 'Learn about campus life and student resources'
          }
        ]
      },
      {
        journeyId: '2',
        title: 'Data Science Program',
        institution: 'Stanford University',
        program: 'Master in Data Science',
        deadline: '2024-03-30',
        applicationUrl: 'https://gradadmissions.stanford.edu',
        emailAddresses: {
          admissions: 'gradadmissions@stanford.edu',
          department: 'datascience@stanford.edu',
          international: 'intloffice@stanford.edu'
        },
        requirements: [
          'Bachelor\'s degree in quantitative field',
          'Strong mathematical background',
          'Programming experience in Python/R',
          'GRE scores (optional for 2024)',
          'TOEFL/IELTS for international students'
        ],
        documents: [
          'Official transcripts',
          'Statement of Purpose',
          'Three letters of recommendation',
          'CV/Resume',
          'Programming portfolio (optional)',
          'Research statement'
        ],
        tips: [
          'Emphasize data analysis projects',
          'Highlight any research publications',
          'Include links to GitHub repositories',
          'Describe any industry experience',
          'Mention specific research interests'
        ],
        roadmap: [
          {
            step: 'Initial Application',
            description: 'Complete online application form and pay fees',
            timeline: '4 months before deadline'
          },
          {
            step: 'Document Preparation',
            description: 'Prepare and upload all required documents',
            timeline: '3 months before deadline'
          },
          {
            step: 'Recommendations',
            description: 'Ensure all recommendation letters are submitted',
            timeline: '1 month before deadline'
          }
        ],
        additionalResources: [
          {
            title: 'Program Overview',
            url: 'https://statistics.stanford.edu/data-science-masters',
            description: 'Detailed program information and curriculum'
          },
          {
            title: 'Financial Aid',
            url: 'https://financialaid.stanford.edu',
            description: 'Scholarship and funding opportunities'
          }
        ]
      },
      {
        journeyId: '3',
        title: 'AI & Machine Learning',
        institution: 'Carnegie Mellon University',
        program: 'Master of Artificial Intelligence',
        deadline: '2024-05-01',
        applicationUrl: 'https://apply.cmu.edu',
        emailAddresses: {
          admissions: 'ml-admissions@cmu.edu',
          department: 'ai-department@cmu.edu',
          international: 'iso@cmu.edu'
        },
        requirements: [
          'Strong CS/Math background',
          'Machine learning experience',
          'Research experience preferred',
          'GRE required',
          'Coding proficiency in PyTorch/TensorFlow'
        ],
        documents: [
          'Academic transcripts',
          'Research proposal',
          'Coding samples',
          'Publications list',
          'GRE scores',
          'Three academic references'
        ],
        tips: [
          'Detail ML projects extensively',
          'Include GitHub/project links',
          'Highlight research contributions',
          'Specify preferred research groups',
          'Demonstrate mathematical aptitude'
        ],
        roadmap: [
          {
            step: 'Portfolio Preparation',
            description: 'Organize coding projects and research papers',
            timeline: '5 months before deadline'
          },
          {
            step: 'Research Proposal',
            description: 'Write and refine research statement',
            timeline: '3 months before deadline'
          },
          {
            step: 'Application Review',
            description: 'Final check of all materials',
            timeline: '2 weeks before deadline'
          }
        ],
        additionalResources: [
          {
            title: 'ML Department',
            url: 'https://ml.cmu.edu',
            description: 'Research areas and faculty profiles'
          },
          {
            title: 'Student Projects',
            url: 'https://ml.cmu.edu/projects',
            description: 'Past student work and publications'
          }
        ]
      },
      {
        journeyId: '4',
        title: 'Robotics Engineering',
        institution: 'University of California, Berkeley',
        program: 'MS in Robotics',
        deadline: '2024-06-15',
        applicationUrl: 'https://grad.berkeley.edu/apply',
        emailAddresses: {
          admissions: 'robotics-admissions@berkeley.edu',
          department: 'robotics@berkeley.edu',
          international: 'international@berkeley.edu'
        },
        requirements: [
          'Engineering background',
          'Control systems knowledge',
          'Programming skills',
          'Mathematics proficiency',
          'Hardware experience preferred'
        ],
        documents: [
          'Academic records',
          'Technical project portfolio',
          'Statement of purpose',
          'Two letters of recommendation',
          'GRE scores',
          'Technical writing sample'
        ],
        tips: [
          'Showcase hands-on projects',
          'Emphasize teamwork experience',
          'Detail technical challenges solved',
          'Include CAD/simulation work',
          'Highlight industry collaborations'
        ],
        roadmap: [
          {
            step: 'Technical Portfolio',
            description: 'Compile project documentation and results',
            timeline: '4 months before deadline'
          },
          {
            step: 'Application Essays',
            description: 'Write and revise statements',
            timeline: '2 months before deadline'
          },
          {
            step: 'Final Submission',
            description: 'Submit all materials and follow up',
            timeline: '1 week before deadline'
          }
        ],
        additionalResources: [
          {
            title: 'Robotics Lab',
            url: 'https://robotics.berkeley.edu',
            description: 'Research labs and ongoing projects'
          },
          {
            title: 'Industry Partners',
            url: 'https://berkeley.edu/industry-connect',
            description: 'Industry collaboration opportunities'
          }
        ]
      }
    ];

    setApplications(demoApplications);
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
              {applications.map(app => (
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