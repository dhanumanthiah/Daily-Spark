# ✨ Daily Spark

**AI-powered daily bonding activity generator for parents and children**
> *Remove the "what should I do with my child today?" paralysis — one personalized activity, delivered in under 90 seconds.*

🚀 **Live Demo → https://dailyspark-frontend.onrender.com**

---

## 🧠 What It Is

Daily Spark is a focused, single-feature web app that generates one beautifully presented, AI-personalized bonding and brain-building activity for a parent and child each day.

No accounts. No onboarding friction. No complex setup.

**Fill in your child → get your activity → go do it.**

The goal is not to be another parenting app. The goal is to be the five minutes of intentional connection a parent has with their child today — made effortless.

---

## 🎯 The Problem

Despite deeply loving their children, most parents face a daily friction point: they want to connect meaningfully but hit decision fatigue, time pressure, and a blank-page problem when it comes to doing something intentional.

This is amplified for:

- Working parents with limited evening hours
- Parents of children with autism, ADHD, or sensory sensitivities who need adapted activities
- Single and divorced parents who want every moment to feel meaningful

---

## ✅ Core Feature — The Daily Spark Card

The entire flow — landing to activity card — takes under 90 seconds.

**Input: Child Profile Form**

| Field | Detail |
| --- | --- |
| Child's Name | Personalizes all card copy |
| Age | 1–18 — shifts activity complexity and type |
| Interests | Multi-select chips (Dinosaurs, Drawing, Legos, Music, Sports, Animals, Space, Cooking, Stories, Dancing) |
| Time Available | 5 / 15 / 30 minutes |
| Mood | Happy & Energetic / Quiet & Calm / Bored / A bit sad / Hyper |
| Special Needs | Optional free-text — accommodates autism, ADHD, sensory profiles |

**Output: Activity Card (8 required fields)**

| Field | Description |
| --- | --- |
| `emoji` | One contextually relevant emoji — hero display |
| `name` | Creative activity name (4–6 words) |
| `tagline` | One warm, inviting sentence about the activity |
| `duration` | Time required — echoes parent's input |
| `starter` | Exact words for the parent to say to begin |
| `howTo` | What parent and child do together (2–3 sentences) |
| `watchFor` | One specific meaningful moment to notice |
| `builds` | Array of 3 developmental skills the activity strengthens |

---

## 🤖 AI Design

**Model:** Claude Sonnet (Anthropic API)
**Approach:** Structured JSON output — no markdown, no preamble
**Prompt engineering:** System prompt positions model as a warm child development expert; dynamic variables inject child profile per request
**Special needs handling:** When enabled, prompt includes accommodation instructions for sensory, communication, and routine needs
**Parsing:** Robust JSON extraction with markdown fence stripping, brace-boundary detection, and graceful error fallback
