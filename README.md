# Meetup-AI

Meetup-AI is a modern SaaS platform where users can create their own AI agents, set up meetings with them, and conduct video calls that automatically generate transcripts and intelligent summaries.

Built using the latest Next.js stack, Radix UI components, Stream SDK for video, and Inngest for background jobs — Meetup-AI is designed to offer seamless real-time interaction and AI-powered productivity.

---

## ✨ Features


- **Create an account through google, github, face and then log in**: Users can create an account then log in.
- **Create AI Agents**: Users can customize and spin up their own agents in seconds.
- **Schedule Meetings**: Book and host meetings with AI agents or other users.
- **Video Calls**: Real-time, high-quality video calls powered by [Stream Video SDK](https://getstream.io/video/).
- **Recordings of the video call**: Real-time high-quality call recording & can view the recording later
- **Transcripts + Summaries**: Get post-call transcripts and AI-generated summaries.
- **Free & Paid Plans**: Tiered pricing for casual users and power users alike.
- **Modern UI**: Beautiful, responsive interface built with TailwindCSS and Radix UI.

---

## 📦 Tech Stack

### Core
- **Next.js 15** – App Router, Server Actions, and Edge support
- **React 19** – Latest features for a modern reactive experience
- **TailwindCSS v4** – Utility-first styling
- **Radix UI** – Accessible, composable UI primitives
- **Drizzle ORM + NeonDB** – Type-safe SQL and serverless PostgreSQL
- **tRPC** – End-to-end typesafe API layer
- **Inngest** – Background jobs (e.g. transcription, summarization)
- **Stream SDK** – Video calls and real-time AI events

### Auth & State
- **better-auth** – Lightweight authentication system
- **react-hook-form + zod** – Forms with validation
- **@tanstack/react-query** – Data fetching and cache

### Developer Experience
- **TypeScript** – End-to-end static typing
- **ESLint + Prettier** – Code consistency
- **drizzle-kit** – ORM toolkit for schema and migration
- **ngrok** – Tunneling for webhook development

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/meetup-ai.git
   cd meetup-ai
