"use client";

import React from 'react';
import { ActivityData } from '../lib/mock-ai';

interface DailySummaryProps {
  completedActivities: ActivityData[];
  onBack: () => void;
}

export default function DailySummary({ completedActivities, onBack }: DailySummaryProps) {
  // Aggregate all skills built today
  const allSkills = completedActivities.flatMap(activity => activity.builds);
  
  // Count occurrences of each skill
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort skills by count (highest first)
  const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Header Card */}
      <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-8 text-center text-white shadow-xl shadow-[#10B981]/30 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-9xl opacity-10">🏆</div>
        <div className="absolute -bottom-10 -left-10 text-9xl opacity-10">✨</div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="font-serif text-3xl font-bold mb-2">Today's Impact</h2>
          <p className="text-white/80 text-lg">
            You completed {completedActivities.length} {completedActivities.length === 1 ? 'activity' : 'activities'} today!
          </p>
        </div>
      </div>

      {/* Skills Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#10B981]/10">
        <h3 className="font-serif text-xl font-bold text-[#064E3B] mb-4 flex items-center gap-2">
          <span>🧠</span> Skills You Built Today
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {sortedSkills.map(([skill, count]) => (
            <div 
              key={skill}
              className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] border border-[#10B981]/20 rounded-full"
            >
              <span className="text-[#064E3B] font-medium">{skill}</span>
              {count > 1 && (
                <span className="bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  x{count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#10B981]/10">
        <h3 className="font-serif text-xl font-bold text-[#064E3B] mb-4 flex items-center gap-2">
          <span>📝</span> Activity Log
        </h3>
        
        <div className="space-y-4">
          {completedActivities.map((activity, index) => (
            <div key={`${activity.id}-${index}`} className="flex items-start gap-4 p-4 rounded-2xl bg-[#F0FDF4]/50 border border-[#10B981]/10">
              <div className="text-3xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                {activity.emoji}
              </div>
              <div>
                <h4 className="font-bold text-[#064E3B]">{activity.name}</h4>
                <p className="text-sm text-[#064E3B]/60">{activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full py-4 rounded-2xl font-serif text-lg font-bold transition-all min-h-[56px] flex items-center justify-center gap-2 bg-white text-[#064E3B] border-2 border-[#10B981]/20 hover:border-[#10B981] hover:bg-[#F0FDF4] shadow-sm"
      >
        ← Plan Another Activity
      </button>

    </div>
  );
}

