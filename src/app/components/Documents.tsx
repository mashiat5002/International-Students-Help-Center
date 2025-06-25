'use client';

import React, { useState, useEffect } from 'react';
import { call_fetch_journey_db } from '../(utils)/call_fetch_journey_db/route';
import prepare_and_view from '../(utils)/prepare_and_view/route';
import prepare_and_download from '../(utils)/prepare_and_download/route';
import LoadingSpinner from './common/LoadingSpinner';
import timeFormatConverter from '../(utils)/time_format_converter/route';

interface Document {
  journeyTitle: string;
  stepTitle: string;
  fileName: string;
  uploadDate: string;
  institution: string;
  program: string;
  content: Buffer; 
}
interface data{
  data: Buffer
  type: string
}
interface Journey {
  _id: string;
  title: string;
  description: string;
  totalSteps: number;
  currentStep: number;
  lastUpdated: string;
  institution: string;
  program: string;
  deadline: string;
  steps: {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'not-started';
    document?: data;
    doc_name?: string;
    uploadDate?: string;
  }[];
}

const DocumentCard = React.memo(({ document: doc }: { document: Document }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:border-blue-300 transition-all duration-300">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">{doc.journeyTitle}</h3>
          <p className="text-sm text-gray-600">{doc.stepTitle}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">Institution: {doc.institution}</p>
            <p className="text-xs text-gray-500">Program: {doc.program}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500">
          Uploaded: {timeFormatConverter(doc.uploadDate)} 
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-700">{doc.fileName}</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (!doc.content) return;
              prepare_and_view(doc.content);
            }}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200
              hover:bg-blue-100 transition-colors duration-300 text-sm font-medium"
          >
            View
          </button>
          <button 
            onClick={() => {
              if (!doc.content) return;
              prepare_and_download(doc.content, doc.fileName || 'document.pdf');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
));

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setloading] = useState(false);

  // Load sample documents
  useEffect(() => {
    const call_fun=async ()=>{
      setloading(true);
      const res= await call_fetch_journey_db("user_id");
      setloading(false);
      const data= res.data;
      console.log(data);

      const filtered : Document[] = []
      data.map((item:Journey)=>{

        item.steps.map((step:any)=>{
         if(step.document){
          filtered.push({
            journeyTitle: item.title,
            stepTitle: step.title,
            fileName: step.doc_name,
            uploadDate: step.uploadDate,
            institution: item.institution,
            program: item.program,
            content: step.document.data 
          }) 
         }
       })
       
      })
      console.log(filtered )
      setDocuments(filtered);
    }
    call_fun(); 



  
  }, []);

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.journeyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.stepTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-[95%] md:w-[90%] h-[85vh] animate-fadeIn relative mx-auto mt-10">
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg h-full flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-black">
                Your Documents
              </h2>
              <div className={` ${documents.length>0?"":"hidden"} bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base`}>
                {documents.length>1?documents.length +" Documents" :documents.length>0?documents.length +" Document" : null}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  bg-white/80 backdrop-blur-sm"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6">
              {loading?<LoadingSpinner/>:filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map((doc, index) => (
                    <DocumentCard key={index} document={doc} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-600">
                  {searchTerm ? (
                    <p className="text-lg">No documents match your search.</p>
                  ) : (
                    <>
                      <p className="text-lg">No documents uploaded yet.</p>
                      <p className="text-sm mt-2">Upload documents in your journey steps to see them here.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 