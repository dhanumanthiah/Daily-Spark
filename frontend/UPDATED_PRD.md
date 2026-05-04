# Daily Spark - Product Requirements Document (Updated)

## Overview
A mobile-friendly web app called "Daily Spark" that helps parents generate personalized bonding activities for their children using AI. The app focuses on quick, actionable, and developmentally appropriate activities that require no prep.

## Core Features
- **No Accounts/Login:** Frictionless entry.
- **Local Storage Persistence:** All user data, activity history, and daily summaries are saved locally in the browser.
- **Smart Recommendations:** Returning users receive a personalized "Welcome Back" activity suggestion based on their previous day's inputs and completed activities.
- **Daily Summary Dashboard:** Tracks completed activities for the day and aggregates the developmental skills built.

## Form Inputs
- **Child's name** (text, required)
- **Child's age** (number 1–18, required)
- **Interests** (multi-select chips, max 4): Dinosaurs, Drawing, Legos, Music, Sports, Animals, Space, Cooking, Stories, Dancing, Puzzles, Brain Building.
  - *Includes a "Clear all" button when interests are selected.*
- **Time available** (single select): 5 mins, 15 mins, 30 mins
- **Child's mood today** (dropdown): Happy & Energetic, Quiet & Calm, Bored, A bit sad, Hyper
- **Any special needs?** (Yes/No toggle — if Yes, show a text field for details like autism, ADHD, sensory sensitivities)

## AI Output — Activity Card
The AI generates and displays a card with these fields:
- A large emoji
- Activity name (creative, 4–6 words)
- A warm one-sentence tagline
- Time duration (echo the parent's input)
- "Say This to Start" — exact words the parent says to invite the child into the activity (1–2 natural sentences)
- "What You'll Do Together" — simple 2–3 sentence description
- "Watch For This Moment" — one meaningful thing to notice
- "This Builds" — 3 developmental skill tags (e.g., creativity, emotional vocabulary, focus)

## Activity Interactions
- **Regenerate:** A "Give me a different activity" button that guarantees a *new* activity is shown (prevents immediate repeats).
- **Completion:** A "✅ We did this!" button that triggers a celebratory "Achievement Unlocked" animation, highlighting the specific skills built.
- **Summary Access:** After completing an activity, users can view their "Daily Summary".

## Daily Summary Dashboard
- Displays the total number of activities completed today.
- Aggregates and counts all developmental skills built across all completed activities (e.g., "Focus x2", "Gross Motor Skills").
- Shows a chronological log of the day's completed activities.
- Automatically resets at midnight for a fresh start the next day.

## Next-Day Recommendation Engine
- Detects when a user returns on a new day.
- Displays a "Welcome Back" banner above the form.
- Suggests a specific activity based on:
  - The skills they focused on the previous day.
  - The child's previously recorded mood.
  - A random selection from their saved interests to keep things fresh.
- Users can "Start Activity" immediately or "Plan My Own" to dismiss the banner.
- Dismissed banners can be restored via a "💡 Show Today's Suggestion" toggle.

## Design Style
- **Color Palette:** Fresh Emerald and Teal theme (Mint background `#F0FDF4`, Emerald accents `#10B981`, Deep Forest Green text `#064E3B`).
- **Typography:** Playfair Display (serif) for headings/buttons, Inter (sans-serif) for body text.
- **UI Elements:** Rounded cards with soft shadows, glassmorphism effects on special banners.
- **Mobile-first layout:** Large tap targets (minimum 44px) for all buttons and chips.
- **Animations:** Smooth fade-ins, slide-ups, and a custom confetti pop animation for achievements.

## Technical Constraints
- Frontend-only application (Next.js/React).
- No backend database — everything lives in browser `localStorage`.
- Mock AI service used to simulate generation delays and handle activity logic.

