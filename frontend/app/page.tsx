"use client";

import React, { useState, useEffect } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityCard from '../components/ActivityCard';
import DailySummary from '../components/DailySummary';
import { generateActivity, getRecommendation, FormData, ActivityData } from '../lib/mock-ai';

type ViewState = 'form' | 'activity' | 'summary';

export default function Home() {
  const [view, setView] = useState<ViewState>('form');
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);
  
  const [seenActivities, setSeenActivities] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<ActivityData[]>([]);
  
  // Recommendation State
  const [recommendation, setRecommendation] = useState<{activity: ActivityData, reason: string} | null>(null);
  const [isRecommendationDismissed, setIsRecommendationDismissed] = useState(false);

  // Load history, completed activities, and generate recommendation on mount
  useEffect(() => {
    const today = new Date().toDateString();
    let loadedSeen: string[] = [];
    let previousCompleted: ActivityData[] = [];

    // 1. Load seen activities
    const savedSeen = localStorage.getItem('dailySpark_seenActivities');
    if (savedSeen) {
      try {
        loadedSeen = JSON.parse(savedSeen);
        setSeenActivities(loadedSeen);
      } catch (e) {
        console.error("Failed to parse seen activities");
      }
    }

    // 2. Load completed activities
    const savedCompleted = localStorage.getItem('dailySpark_completedActivities');
    if (savedCompleted) {
      try {
        const parsed = JSON.parse(savedCompleted);
        if (parsed.date === today) {
          // It's still today, load them into the current session
          setCompletedActivities(parsed.activities);
        } else {
          // It's a new day! Save them as previous completed for the recommendation engine
          previousCompleted = parsed.activities;
        }
      } catch (e) {
        console.error("Failed to parse completed activities");
      }
    }

    // 3. Load form data and generate recommendation if returning user
    const savedForm = localStorage.getItem('dailySpark_formData');
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        setLastFormData(parsedForm);

        // Check if it was dismissed today
        const dismissedDate = localStorage.getItem('dailySpark_recommendationDismissed');
        if (dismissedDate === today) {
          setIsRecommendationDismissed(true);
        }

        // Always generate the recommendation so we have it available if they want to see it again
        getRecommendation(parsedForm, previousCompleted, loadedSeen).then(rec => {
          setRecommendation(rec);
        });
        
      } catch (e) {
        console.error("Failed to parse saved form data");
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
    if (!completedActivities.find(a => a.name === completedActivity.name)) {
      const newCompleted = [...completedActivities, completedActivity];
      setCompletedActivities(newCompleted);
      
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

  // Recommendation Handlers
  const handleAcceptRecommendation = () => {
    if (!recommendation) return;
    
    // Add to seen history
    const newSeen = [...seenActivities, recommendation.activity.id];
    setSeenActivities(newSeen);
    localStorage.setItem('dailySpark_seenActivities', JSON.stringify(newSeen));

    // Set as current activity
    setActivity(recommendation.activity);
    setView('activity');
    
    // Dismiss so it doesn't show as a big banner again today
    localStorage.setItem('dailySpark_recommendationDismissed', new Date().toDateString());
    setIsRecommendationDismissed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismissRecommendation = () => {
    localStorage.setItem('dailySpark_recommendationDismissed', new Date().toDateString());
    setIsRecommendationDismissed(true);
  };

  const handleRestoreRecommendation = () => {
    localStorage.removeItem('dailySpark_recommendationDismissed');
    setIsRecommendationDismissed(false);
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="text-center mb-10 relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#10B981] text-white text-3xl mb-4 shadow-lg shadow-[#10B981]/20 transform -rotate-6">
          ✨
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#064E3B] mb-3">
          Daily Spark
        </h1>
        <p className="text-[#064E3B]/70 max-w-md mx-auto text-lg">
          Personalized bonding activities for you and your child, generated in seconds.
        </p>

        {/* Global Summary Button */}
        {completedActivities.length > 0 && view !== 'summary' && (
          <button 
            onClick={handleViewSummary}
            className="absolute top-0 right-0 sm:right-4 bg-white border border-[#10B981]/20 text-[#10B981] px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-[#F0FDF4] transition-colors flex items-center gap-2"
          >
            <span>📊</span> 
            <span className="hidden sm:inline">Today's Summary</span>
            <span className="bg-[#10B981] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
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
              className="max-w-md mx-auto flex items-center gap-2 text-[#10B981] font-medium hover:text-[#059669] transition-colors mb-4"
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
            
            {/* Next-Day Recommendation Banner */}
            {recommendation && !isRecommendationDismissed && (
              <div className="max-w-md mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#064E3B]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">👋</span>
                      <h2 className="font-serif text-xl font-bold text-[#F0FDF4]">Welcome back!</h2>
                    </div>
                    
                    <p className="text-[#F0FDF4]/80 text-sm mb-6 leading-relaxed">
                      {recommendation.reason}
                    </p>

                    <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/10 backdrop-blur-sm flex items-center gap-4">
                      <div className="text-4xl shrink-0">{recommendation.activity.emoji}</div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight mb-1">{recommendation.activity.name}</h3>
                        <p className="text-white/60 text-sm">{recommendation.activity.duration}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAcceptRecommendation}
                        className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-[#10B981]/20"
                      >
                        Start Activity
                      </button>
                      <button
                        onClick={handleDismissRecommendation}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors"
                      >
                        Plan My Own
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Restore Recommendation Button */}
            {recommendation && isRecommendationDismissed && (
              <div className="max-w-md mx-auto mb-6 flex justify-center animate-in fade-in">
                <button
                  onClick={handleRestoreRecommendation}
                  className="bg-[#F0FDF4] border border-[#10B981]/20 text-[#10B981] px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-[#10B981]/10 transition-colors flex items-center gap-2"
                >
                  💡 Show Today's Suggestion
                </button>
              </div>
            )}

            <ActivityForm 
              onSubmit={handleGenerate} 
              isLoading={isLoading} 
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-[#064E3B]/40 text-sm pb-8">
        <p>Designed for connection. No login required.</p>
      </footer>

    </main>
  );
}

