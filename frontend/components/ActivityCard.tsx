"use client";

import React from 'react';
import { ActivityData } from '../lib/mock-ai';

interface ActivityCardProps {
  activity: ActivityData;
  onRegenerate: () => void;
  isLoading: boolean;
}

export default function ActivityCard({ activity, onRegenerate, isLoading }: ActivityCardProps) {
  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl shadow-[#D97706]/5 border border-[#D97706]/10 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#FDF6EC] p-8 text-center relative border-b border-[#D97706]/10">
          <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300 cursor-default">
            {activity.emoji}
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#2D2013] mb-2 leading-tight">
            {activity.name}
          </h2>
          <p className="text-[#D97706] font-medium text-sm uppercase tracking-wider">
            {activity.duration}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Tagline */}
          <div className="text-center">
            <p className="text-lg text-[#2D2013]/80 italic font-serif">
              "{activity.tagline}"
            </p>
          </div>

          {/* Say This */}
          <div className="bg-[#D97706]/5 rounded-2xl p-5 border border-[#D97706]/10 relative">
            <div className="absolute -top-3 left-5 bg-white px-2 text-xs font-bold text-[#D97706] uppercase tracking-wider">
              Say This to Start
            </div>
            <p className="text-[#2D2013] font-medium leading-relaxed">
              "{activity.starter}"
            </p>
          </div>

          {/* What You'll Do */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D2013] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center text-sm">1</span>
              What You'll Do Together
            </h3>
            <p className="text-[#2D2013]/80 leading-relaxed pl-8">
              {activity.howTo}
            </p>
          </div>

          {/* Watch For */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D2013] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center text-sm">2</span>
              Watch For This Moment
            </h3>
            <p className="text-[#2D2013]/80 leading-relaxed pl-8">
              {activity.watchFor}
            </p>
          </div>

          {/* Builds */}
          <div className="pt-4 border-t border-[#D97706]/10">
            <p className="text-xs font-bold text-[#2D2013]/50 uppercase tracking-wider mb-3">
              This Builds
            </p>
            <div className="flex flex-wrap gap-2">
              {activity.builds.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-[#FDF6EC] border border-[#D97706]/20 rounded-full text-sm text-[#2D2013]/80 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Regenerate Button */}
      <button
        onClick={onRegenerate}
        disabled={isLoading}
        className="w-full mt-6 py-4 rounded-2xl font-serif text-lg font-bold transition-all min-h-[56px] flex items-center justify-center gap-2 bg-white text-[#2D2013] border-2 border-[#D97706]/20 hover:border-[#D97706] hover:bg-[#FDF6EC] shadow-sm"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin"></div>
            Generating new idea...
          </>
        ) : (
          "🔄 Give me a different activity"
        )}
      </button>
    </div>
  );
}

