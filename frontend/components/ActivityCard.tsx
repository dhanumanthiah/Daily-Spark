"use client";

import React, { useState, useEffect } from 'react';
import { ActivityData } from '../lib/mock-ai';

interface ActivityCardProps {
  activity: ActivityData;
  onRegenerate: () => void;
  onComplete: (activity: ActivityData) => void;
  onViewSummary: () => void;
  isLoading: boolean;
}

export default function ActivityCard({ activity, onRegenerate, onComplete, onViewSummary, isLoading }: ActivityCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset completion state when a new activity is loaded
  useEffect(() => {
    setIsCompleted(false);
  }, [activity.id]);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(activity);
    // Scroll slightly to show the success message
    setTimeout(() => {
      window.scrollBy({ top: 250, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl shadow-[#10B981]/5 border border-[#10B981]/10 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#F0FDF4] p-8 text-center relative border-b border-[#10B981]/10">
          <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300 cursor-default">
            {activity.emoji}
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#064E3B] mb-2 leading-tight">
            {activity.name}
          </h2>
          <p className="text-[#10B981] font-medium text-sm uppercase tracking-wider">
            {activity.duration}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Tagline */}
          <div className="text-center">
            <p className="text-lg text-[#064E3B]/80 italic font-serif">
              "{activity.tagline}"
            </p>
          </div>

          {/* Say This */}
          <div className="bg-[#10B981]/5 rounded-2xl p-5 border border-[#10B981]/10 relative">
            <div className="absolute -top-3 left-5 bg-white px-2 text-xs font-bold text-[#10B981] uppercase tracking-wider">
              Say This to Start
            </div>
            <p className="text-[#064E3B] font-medium leading-relaxed">
              "{activity.starter}"
            </p>
          </div>

          {/* What You'll Do */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#064E3B] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-sm">1</span>
              What You'll Do Together
            </h3>
            <p className="text-[#064E3B]/80 leading-relaxed pl-8">
              {activity.howTo}
            </p>
          </div>

          {/* Watch For */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#064E3B] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-sm">2</span>
              Watch For This Moment
            </h3>
            <p className="text-[#064E3B]/80 leading-relaxed pl-8">
              {activity.watchFor}
            </p>
          </div>

          {/* Builds */}
          <div className="pt-4 border-t border-[#10B981]/10">
            <p className="text-xs font-bold text-[#064E3B]/50 uppercase tracking-wider mb-3">
              This Builds
            </p>
            <div className="flex flex-wrap gap-2">
              {activity.builds.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-[#F0FDF4] border border-[#10B981]/20 rounded-full text-sm text-[#064E3B]/80 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Completion Section */}
      <div className="mt-6">
        {!isCompleted ? (
          <button
            onClick={handleComplete}
            className="w-full py-4 rounded-2xl font-serif text-xl font-bold transition-all min-h-[64px] flex items-center justify-center gap-3 bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30 hover:bg-[#059669] hover:-translate-y-1"
          >
            <span className="text-2xl">✅</span> We did this!
          </button>
        ) : (
          <div className="w-full p-6 rounded-3xl bg-gradient-to-br from-[#F0FDF4] to-white border-2 border-[#10B981] shadow-xl shadow-[#10B981]/20 text-center animate-in zoom-in confetti-pop">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-serif text-2xl font-bold text-[#064E3B] mb-2">
              Achievement Unlocked!
            </h3>
            <p className="text-[#064E3B]/80 mb-4">
              Amazing job! By doing this activity, you just helped build:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {activity.builds.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] font-bold rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <button
              onClick={onViewSummary}
              className="w-full py-3 rounded-xl font-bold transition-all bg-[#064E3B] text-white hover:bg-[#065F46] shadow-md"
            >
              📊 View Today's Summary
            </button>
          </div>
        )}
      </div>

      {/* Regenerate Button */}
      <button
        onClick={onRegenerate}
        disabled={isLoading}
        className="w-full mt-4 py-4 rounded-2xl font-serif text-lg font-bold transition-all min-h-[56px] flex items-center justify-center gap-2 bg-transparent text-[#064E3B]/60 hover:text-[#064E3B] hover:bg-white/50"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-[#10B981]/30 border-t-[#10B981] rounded-full animate-spin"></div>
            Generating new idea...
          </>
        ) : (
          "🔄 Give me a different activity"
        )}
      </button>
    </div>
  );
}

