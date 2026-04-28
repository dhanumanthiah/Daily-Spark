"use client";

import React, { useState } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityCard from '../components/ActivityCard';
import { generateActivity, FormData, ActivityData } from '../lib/mock-ai';

export default function Home() {
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const handleGenerate = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setLastFormData(data);
    
    try {
      const result = await generateActivity(data);
      setActivity(result);
      // Scroll to top smoothly when result appears
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D97706] text-white text-3xl mb-4 shadow-lg shadow-[#D97706]/20 transform -rotate-6">
          ✨
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2013] mb-3">
          Daily Spark
        </h1>
        <p className="text-[#2D2013]/70 max-w-md mx-auto text-lg">
          Personalized bonding activities for you and your child, generated in seconds.
        </p>
      </header>

      {/* Error Message */}
      {error && (
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
        {activity && !isLoading && !error ? (
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
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className={activity && isLoading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
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

