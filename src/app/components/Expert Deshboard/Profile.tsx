import React from 'react';

const skills = [
  'Digitale Personalakte',
  'Strategie',
  'Datenmanagement',
  'OZG',
];

const Profile = () => {
  return (
    <div className="max-w-3xl mt-16 mx-auto bg-pink-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
      {/* Left Side */}
      <div className="flex-1 w-full">
        <button className="mb-4 bg-white/60 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition">
          &#8592;
        </button>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-3xl font-bold text-black">Frank Turner</h2>
          <span className="inline-flex items-center justify-center w-7 h-7 bg-white rounded-full border border-gray-300">
            {/* Verified badge icon */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e0e0e0"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
        <div className="text-gray-700 font-medium mb-4">Stadt Ratingen</div>
        <div className="text-gray-800 mb-4">
          Ich bin seit 4 Jahren als Digitalisierungsbeauftragter (CDO) verwaltungsübergreifend für die Koordination aller Digitalisierungs- und Smart-City Themen der Stadt Ratingen zuständig.
        </div>
        <div className="mb-4">
          <div className="font-semibold text-black mb-2">Kompetenzen</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-black text-base">
            <span>✓ Digitale Personalakte</span>
            <span>✓ Datenmanagement</span>
            <span>✓ Strategie</span>
            <span>✓ OZG</span>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-full font-semibold shadow hover:bg-gray-900 transition">Nachricht schreiben</button>
      </div>
      {/* Right Side - Profile Image */}
      <div className="flex-shrink-0">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Frank Turner"
          className="w-40 h-40 rounded-full object-cover border-4 border-pink-300 shadow-md"
        />
      </div>
    </div>
  );
};

export default Profile; 