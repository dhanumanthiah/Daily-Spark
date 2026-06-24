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

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Forms | React Hook Form + Zod validation |
| AI | Anthropic Claude API (claude-sonnet) |
| Deployment | Render |

---

## 📐 Product Decisions

**Why no accounts?**
Validate that the core activity generation is genuinely useful before adding auth friction. Zero-friction was a deliberate design constraint — not an oversight.

**Why one activity, not a list?**
Decision fatigue is the problem. A list recreates it. One curated, specific activity removes it.

**Why Claude API over GPT?**
Best instruction-following for structured JSON output. Critical for reliable card rendering without post-processing complexity.

**Why special needs as a free-text field?**
Every child's needs are specific. A dropdown of conditions would be reductive and potentially harmful. Free text lets parents describe their child in their own words.

---

## 📊 MVP Success Metrics

| Metric | Target |
| --- | --- |
| Activation Rate (≥1 activity generated) | ≥ 60% |
| 7-Day Return Rate | ≥ 30% |
| Regeneration Rate | ≥ 40% |
| Completion Signal ("tried it") | ≥ 25% |
| NPS Score | ≥ 8.0 |
| API Error Rate | ≤ 2% |
| Load Time (form → card) | ≤ 4 seconds |

---

## 🗺 Roadmap

| Phase | Features |
| --- | --- |
| **MVP** | Daily Spark Card, child profile form, regeneration, mobile-first UI, feedback signal |
| **Phase 2 — Retention** | Activity history journal, saved child profiles, weekly themes, push notification opt-in |
| **Phase 2 — Social** | Share card as image, referral flow, community favorites |
| **Phase 3 — Monetize** | Freemium paywall (3 free/week), family subscription $49/year |
| **Phase 3 — Platform** | iOS app, Android app, home screen widget |
| **Phase 4 — Enterprise** | School district license, teacher-to-parent activity bridge |

---

## 👤 Target Personas

**Priya — The Exhausted Working Parent**
Full-time job, 2 kids, home at 6:30pm. Wants one good moment with each kid before bedtime. Zero prep time available.

**David — Parent of a Child with Autism**
Stay-at-home parent of a 7-year-old with ASD. Generic parenting apps don't account for sensory needs. Needs activities adapted to his son's triggers and interests.

**Marcus — The Weekend Parent**
Has his daughter every other weekend — 4 days a month. Feels pressure to make every moment count. Runs out of ideas fast.

---

## 🎨 Design Language

- **Palette:** Amber and natural tones — warm, not clinical
- **Primary:** `#D97706` — CTA buttons, accents, headers
- **Background:** `#FDF6EC` — app background; `#FFF7ED` — card background
- **Typography:** Fraunces (serif) for hero and activity names; DM Sans for body
- **Principle:** One thing at a time. Each section breathes. Mobile-first throughout.

---

## 👩‍💻 Author

**Deepa Hanumanthiah**
Lead Business Analyst / Digital Product Owner → AI Product Manager
[LinkedIn](https://www.linkedin.com/in/deepa-hanumanthiah-0a02b41b) · [GitHub](https://github.com/dhanumanthiah)

*Built as part of an AI PM portfolio demonstrating end-to-end product definition, prompt engineering, and AI-native UX design.*
