"use client";

import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-white p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-purple-500/20 blur-[120px]"></div>
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/20 blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-8"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Ready to Build
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          I'm Snapdev, your AI developer. Paste your PRD or describe your app idea, and I'll start building it right away!
        </p>
        <div className="flex gap-2 items-center text-sm text-purple-300 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          Waiting for requirements...
        </div>
      </div>
    </div>
  );
}
