'use client';

import React, { useState, useEffect } from 'react';

interface Document {
  journeyTitle: string;
  stepTitle: string;
  fileName: string;
  uploadDate: string;
  institution: string;
  program: string;
  content: string; // base64 string
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
          Uploaded: {doc.uploadDate}
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
              const pdfWindow = window.open("");
              if (pdfWindow) {
                pdfWindow.document.write(
                  "<iframe width='100%' height='100%' src='" + doc.content + "'></iframe>"
                );
              }
            }}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200
              hover:bg-blue-100 transition-colors duration-300 text-sm font-medium"
          >
            View
          </button>
          <button 
            onClick={() => {
              const downloadLink = window.document.createElement('a');
              downloadLink.href = doc.content;
              downloadLink.download = doc.fileName;
              downloadLink.click();
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

  // Load sample documents
  useEffect(() => {
    // Sample base64 PDF content (this is just a placeholder - you should replace with actual PDF content)
    const samplePdfBase64 = 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

    const sampleDocuments: Document[] = [
      {
        journeyTitle: "Computer Science Application",
        stepTitle: "Statement of Purpose",
        fileName: "SOP_MIT_2024.pdf",
        uploadDate: "2024-03-15",
        institution: "Massachusetts Institute of Technology",
        program: "Master of Science in Computer Science",
        content: samplePdfBase64
      },
      {
        journeyTitle: "Data Science Application",
        stepTitle: "Research Proposal",
        fileName: "Research_Proposal_Stanford.pdf",
        uploadDate: "2024-03-14",
        institution: "Stanford University",
        program: "PhD in Data Science",
        content: samplePdfBase64
      },
      {
        journeyTitle: "Business Analytics Application",
        stepTitle: "Resume",
        fileName: "Resume_Harvard_MBA.pdf",
        uploadDate: "2024-03-13",
        institution: "Harvard Business School",
        program: "Master of Business Administration",
        content: samplePdfBase64
      },
      {
        journeyTitle: "AI Engineering Application",
        stepTitle: "Technical Portfolio",
        fileName: "Portfolio_Berkeley_AI.pdf",
        uploadDate: "2024-03-12",
        institution: "UC Berkeley",
        program: "Master of Engineering in AI",
        content: samplePdfBase64
      }
    ];

    // Store sample documents in localStorage
    localStorage.setItem('journeyDocuments', JSON.stringify(sampleDocuments));
    setDocuments(sampleDocuments);
  }, []);

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.journeyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.stepTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-[95%] md:w-[80%] h-[85vh] animate-fadeIn relative mx-auto mt-5">
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg h-full flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-black">
                Your Documents
              </h2>
              <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-full font-medium text-sm md:text-base">
                {documents.length} Documents
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
              {filteredDocuments.length > 0 ? (
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