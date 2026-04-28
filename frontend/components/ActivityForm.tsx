"use client";

import React, { useState, useEffect } from 'react';
import { FormData } from '../lib/mock-ai';

const INTEREST_OPTIONS = [
  "Dinosaurs", "Drawing", "Legos", "Music", "Sports", 
  "Animals", "Space", "Cooking", "Stories", "Dancing",
  "Puzzles", "Brain Building"
];

const TIME_OPTIONS = ["5 mins", "15 mins", "30 mins"];

const MOOD_OPTIONS = [
  "Happy & Energetic", "Quiet & Calm", "Bored", "A bit sad", "Hyper"
];

interface ActivityFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function ActivityForm({ onSubmit, isLoading }: ActivityFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    interests: [],
    time: '15 mins',
    mood: 'Happy & Energetic',
    hasSpecialNeeds: false,
    specialNeedsNote: ''
  });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('dailySpark_formData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved form data");
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('dailySpark_formData', JSON.stringify(formData));
    }
  }, [formData, isMounted]);

  const isFormValid = formData.name.trim() !== '' && formData.age.trim() !== '';

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      }
      if (prev.interests.length >= 4) {
        return prev; // Max 4 interests
      }
      return { ...prev, interests: [...prev.interests, interest] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#D97706]/10">
      
      {/* Name & Age */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-[#2D2013]/80">Child's Name *</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-[#D97706]/20 bg-[#FDF6EC]/50 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
            placeholder="e.g. Leo"
          />
        </div>
        <div className="w-24 space-y-2">
          <label htmlFor="age" className="block text-sm font-medium text-[#2D2013]/80">Age *</label>
          <input
            type="number"
            id="age"
            min="1"
            max="18"
            required
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-[#D97706]/20 bg-[#FDF6EC]/50 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all"
            placeholder="yrs"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#2D2013]/80">Interests (Pick up to 4)</label>
          <span className="text-xs text-[#2D2013]/50">{formData.interests.length}/4</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map(interest => {
            const isSelected = formData.interests.includes(interest);
            const isDisabled = !isSelected && formData.interests.length >= 4;
            return (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                  isSelected 
                    ? 'bg-[#D97706] text-white shadow-md shadow-[#D97706]/20' 
                    : 'bg-[#FDF6EC] text-[#2D2013]/70 border border-[#D97706]/20 hover:border-[#D97706]/50'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Available */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2D2013]/80">Time Available</label>
        <div className="flex gap-2">
          {TIME_OPTIONS.map(time => (
            <button
              key={time}
              type="button"
              onClick={() => setFormData({...formData, time})}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                formData.time === time
                  ? 'bg-[#D97706]/10 border-2 border-[#D97706] text-[#D97706]'
                  : 'bg-[#FDF6EC] border border-[#D97706]/20 text-[#2D2013]/70 hover:border-[#D97706]/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div className="space-y-2">
        <label htmlFor="mood" className="block text-sm font-medium text-[#2D2013]/80">Child's Mood Today</label>
        <select
          id="mood"
          value={formData.mood}
          onChange={(e) => setFormData({...formData, mood: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-[#D97706]/20 bg-[#FDF6EC]/50 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all appearance-none min-h-[44px]"
        >
          {MOOD_OPTIONS.map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>

      {/* Special Needs */}
      <div className="space-y-4 pt-2 border-t border-[#D97706]/10">
        <div className="flex items-center justify-between">
          <label htmlFor="specialNeeds" className="text-sm font-medium text-[#2D2013]/80">Any special needs?</label>
          <button
            type="button"
            role="switch"
            aria-checked={formData.hasSpecialNeeds}
            onClick={() => setFormData({...formData, hasSpecialNeeds: !formData.hasSpecialNeeds})}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors min-h-[44px] min-w-[44px] flex-shrink-0 ${
              formData.hasSpecialNeeds ? 'bg-[#D97706]' : 'bg-gray-200'
            }`}
          >
            <span className="sr-only">Toggle special needs</span>
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                formData.hasSpecialNeeds ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {formData.hasSpecialNeeds && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <textarea
              value={formData.specialNeedsNote}
              onChange={(e) => setFormData({...formData, specialNeedsNote: e.target.value})}
              placeholder="e.g. autism, ADHD, sensory sensitivities..."
              className="w-full px-4 py-3 rounded-xl border border-[#D97706]/20 bg-[#FDF6EC]/50 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition-all min-h-[100px] resize-none"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full py-4 rounded-2xl font-serif text-lg font-bold transition-all min-h-[56px] flex items-center justify-center gap-2 ${
          isFormValid && !isLoading
            ? 'bg-[#D97706] text-white shadow-lg shadow-[#D97706]/30 hover:bg-[#B45309] hover:-translate-y-0.5'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Generating...
          </>
        ) : (
          `✨ Generate Today's Activity ${formData.name ? `for ${formData.name}` : ''}`
        )}
      </button>
    </form>
  );
}

