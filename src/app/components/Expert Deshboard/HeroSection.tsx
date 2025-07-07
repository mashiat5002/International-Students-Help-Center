import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[100dvh] md:w-screen md:h-screen flex items-center justify-between px-4 md:px-32 py-10 bg-gradient-to-tr from-[#6d4aff] via-[#1a144b] to-[#1111] rounded-3xl md:rounded-3xl overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col justify-center z-10 max-w-xl">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md border border-white/20">
            <span className="bg-white text-[#3a2176] rounded-full px-2 py-0.5 text-xs font-semibold mr-2">New</span>
            Introducing our new most advanced Web3 hosting
          </span>
        </div>
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Consult<br />
          International <br />
          Students On ISHC
        </h1>
        {/* Description */}
        <p className="text-white/80 text-lg mb-8 max-w-md">
          Nebula Core is a leading provider of cutting-edge decentralized solutions, powering the next generation of NFT, GameFi, and Metaverse projects.
        </p>
        {/* Button */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#3a2176] rounded-full font-medium shadow-lg hover:bg-white/90 transition">
            Schedule demo
            <span className="inline-flex items-center justify-center w-6 h-6 bg-[#3a2176] text-white rounded-full">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>
        </div>
      </div>
      {/* Right Content (3D Cubes Placeholder) */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end w-1/2 z-0 pointer-events-none">
        {/* Replace this with your 3D cubes image or animation */}
        <img src="https://assets-global.website-files.com/63f5b6e6e7b6e6e7b6e6e7b6/63f5b6e6e7b6e6e7b6e6e7b6_3d-cubes.png" alt="3D Cubes" className="w-[80%] h-auto object-contain drop-shadow-2xl" />
      </div>
      {/* Down Arrow Button */}
      <div className="absolute bottom-8 right-12 z-20">
        <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/10 transition">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 6v12m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 