"use client";

import React, { useState, useEffect } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityCard from '../components/ActivityCard';
import DailySummary from '../components/DailySummary';
import { generateActivity, FormData, ActivityData } from '../lib/mock-ai';

type ViewState = 'form' | 'activity' | 'summary';

export default function Home() {
  const [view, setView] = useState<ViewState>('form');
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);
  
  const [seenActivities, setSeenActivities] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<ActivityData[]>([]);

  // Load history and completed activities from localStorage on mount
  useEffect(() => {
    // Load seen activities
    const savedSeen = localStorage.getItem('dailySpark_seenActivities');
    if (savedSeen) {
      try {
        setSeenActivities(JSON.parse(savedSeen));
      } catch (e) {
        console.error("Failed to parse seen activities");
      }
    }

    // Load completed activities for TODAY
    const savedCompleted = localStorage.getItem('dailySpark_completedActivities');
    if (savedCompleted) {
      try {
        const parsed = JSON.parse(savedCompleted);
        const today = new Date().toDateString();
        
        // Only load if the date matches today, otherwise it's a new day!
        if (parsed.date === today) {
          setCompletedActivities(parsed.activities);
        } else {
          // Clear old data
          localStorage.removeItem('dailySpark_completedActivities');
        }
      } catch (e) {
        console.error("Failed to parse completed activities");
      }
    }
  }, []);

  const handleGenerate = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setLastFormData(data);
    setView('activity');
    
    try {
      const result = await generateActivity(data, seenActivities);
      
      const newSeen = [...seenActivities, result.id];
      setSeenActivities(newSeen);
      localStorage.setItem('dailySpark_seenActivities', JSON.stringify(newSeen));

      setActivity(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      handleGenerate(lastFormData);
    }
  };

  const handleReset = () => {
    setActivity(null);
    setError(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteActivity = (completedActivity: ActivityData) => {
    // Prevent adding the exact same activity instance twice
    if (!completedActivities.find(a => a.name === completedActivity.name)) {
      const newCompleted = [...completedActivities, completedActivity];
      setCompletedActivities(newCompleted);
      
      // Save to localStorage with today's date
      localStorage.setItem('dailySpark_completedActivities', JSON.stringify({
        date: new Date().toDateString(),
        activities: newCompleted
      }));
    }
  };

  const handleViewSummary = () => {
    setView('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="text-center mb-10 relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D97706] text-white text-3xl mb-4 shadow-lg shadow-[#D97706]/20 transform -rotate-6">
          ✨
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2013] mb-3">
          Daily Spark
        </h1>
        <p className="text-[#2D2013]/70 max-w-md mx-auto text-lg">
          Personalized bonding activities for you and your child, generated in seconds.
        </p>

        {/* Global Summary Button (only show if there are completed activities and we aren't already on the summary page) */}
        {completedActivities.length > 0 && view !== 'summary' && (
          <button 
            onClick={handleViewSummary}
            className="absolute top-0 right-0 sm:right-4 bg-white border border-[#D97706]/20 text-[#D97706] px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-[#FDF6EC] transition-colors flex items-center gap-2"
          >
            <span>📊</span> 
            <span className="hidden sm:inline">Today's Summary</span>
            <span className="bg-[#D97706] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {completedActivities.length}
            </span>
          </button>
        )}
      </header>

      {/* Error Message */}
      {error && view === 'activity' && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <span className="text-xl">⚠️</span>
          <div className="flex-1">
            <p className="font-medium">{error}</p>
            <button 
              onClick={handleRegenerate}
              className="mt-2 text-sm font-bold underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        {view === 'summary' && (
          <DailySummary 
            completedActivities={completedActivities} 
            onBack={handleReset} 
          />
        )}

        {view === 'activity' && activity && !error && (
          <div className="space-y-6">
            <button 
              onClick={handleReset}
              className="max-w-md mx-auto flex items-center gap-2 text-[#D97706] font-medium hover:text-[#B45309] transition-colors mb-4"
            >
              ← Back to form
            </button>
            <ActivityCard 
              activity={activity} 
              onRegenerate={handleRegenerate}
              onComplete={handleCompleteActivity}
              onViewSummary={handleViewSummary}
              isLoading={isLoading}
            />
          </div>
        )}

        {view === 'form' && (
          <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
            <ActivityForm 
              onSubmit={handleGenerate} 
              isLoading={isLoading} 
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-[#2D2013]/40 text-sm pb-8">
        <p>Designed for connection. No login required.</p>
      </footer>

    </main>
  );
}

