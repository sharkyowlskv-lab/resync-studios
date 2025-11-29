# REACT Studios™ Gaming Community Platform

## Project Overview
A comprehensive gaming community forum platform branded as "REACT Studios™" (Metro Interactive community) featuring LFG matchmaking, clan hubs, build/meta sharing, community forums with structured categories, real-time chat infrastructure, and staff directory. Platform requires Discord account linking for server access and Roblox account linking for in-game perks.

**Launch Date:** November 2025 (after 5+ months of development)
**Community Size:** 69.3K+ Connected Members, 59.9K+ Discord, 293.6K+ Roblox

---

## Current Implementation Status

### ✅ Phase 1: Frontend (Complete)
All pages and UI components fully implemented with professional dark-themed gaming aesthetic:

**Core Pages:**
- Landing page with community statistics and CTA
- Dashboard (user hub)
- LFG Matchmaking system
- Clan Hubs & management
- Build Sharing & voting system
- Community Forums (structured with News & Information, Community, Moderation, VIP Lounge)
- VIP Subscription store with 4 tiers
- Member Profiles
- Account Settings
- Staff Directory (6 departments)

**Legal Documentation:**
- Community Guidelines
- Privacy Policy
- Terms of Service

**Design System:**
- Dark gaming theme with purple primary color (262 83% 58%)
- Fonts: Inter (body), Space Grotesk (display)
- Consistent dark-themed UI using shadcn components
- Sidebar navigation with app-sidebar
- Professional card-based layouts

### ⏳ Phase 2: Backend (Pending Implementation)
Required API endpoints and integrations:

**Authentication & Linking:**
- Discord OAuth integration (mandatory for server access)
- Roblox account verification (for in-game perks)
- Session management via Express + Passport
- Automatic Discord role assignment on VIP purchase

**API Endpoints:**
- User CRUD and profile management
- LFG post creation, joining, deletion
- Clan management operations
- Build creation, voting, deletion
- Forum thread/reply CRUD
- Chat messaging system
- VIP subscription processing

**Integrations:**
- Stripe payment processing with automatic Discord role assignment
- Discord.js for role management
- WebSocket server for real-time chat
- Database seed for forum categories and initial data

**Storage:**
- PostgreSQL via Neon with Drizzle ORM
- Full database schema already designed in shared/schema.ts

---

## VIP Subscription Tiers
1. **Bronze** - $12.99/month: Basic perks
2. **Sapphire** - $29.99/month: Enhanced features
3. **Diamond** - $44.99/month: Premium benefits
4. **Founders Edition** - $120 one-time: Exclusive lifetime perks

All tiers include: XP boosts, vehicle discounts, HelpDesk support, Discord role assignment, and in-game rewards.

---

## Upcoming Roadmap (Announced)

### Community Groups Feature
- Direct integration with Project Ventura (in-game)
- Website-based group management
- Asset management and permissions
- Activity logging
- Private server support (future)

### Community Marketplace
- Creator-focused platform
- Digital file & content uploads
- Stripe integration for payouts
- Direct creator earnings

### Custom Vehicle Orders System
- Personalized vehicle customization in Project Ventura
- Style selection and unique ride creation
- Social sharing capabilities
- Highly requested community feature

---

## Design & Branding

### Brand Identity
- **Primary Brand:** REACT Studios™
- **Secondary Branding:** Metro Interactive / Resync Studios
- **Target Audience:** 13+ gaming community
- **Values:** Christian fellowship, community-focused, competitive gaming

### Color Scheme
- Primary: Purple (262 83% 58%)
- Dark background theme throughout
- Accent colors for CTAs and highlights
- Semantic colors for status/validation

### Typography
- **Display Font:** Space Grotesk (headings, prominent text)
- **Body Font:** Inter (main content, UI)

---

## Tech Stack

### Frontend
- React + TypeScript
- Vite build tool
- shadcn/ui components
- TanStack React Query
- Wouter (routing)
- Tailwind CSS + custom dark theme
- Lucide React icons

### Backend
- Express.js
- Passport.js (authentication)
- Drizzle ORM
- PostgreSQL (Neon serverless)
- WebSockets (ws)

### Integrations
- Discord.js (role management)
- Stripe (payments)
- Stripe Replit Sync
- Discord OAuth (Replit integration)
- Roblox verification (pending)

---

## Database Schema
All models defined in `shared/schema.ts`:
- Users (with Discord/Roblox linking)
- Clans
- LFG Posts & Participants
- Builds & Votes
- Forum Categories, Threads, Replies
- Chat Messages
- VIP Subscriptions (with auto-role assignment)

---

## Staff Directory

### Leadership
- **CEO & Founder:** cxiqlne (2018-Present)

### Management
- Operations Manager & Co-Founder: silentdirective. (2025-Present)
- Operations Manager & Staff Admin: ArielOperations (2025-Present)
- Operations Manager: Kyros (2024-Present)

### Trust & Safety
- Director: Iceberg1038 (2023-Present)

### Support & Creative
- Senior/Customer Support Representatives
- Vehicle Artist: d1vvt (2019-Present)
- Gameplay Systems Developer: acerxtro (2018-Present)
- Programmers & Vehicle Engineers

---

## Important Notes

### Data Integrity
- All pages use authentic backend data (no mock data in production)
- Database integrations with real Postgres backend
- Error handling with user-friendly messages

### Code Conventions
- Minimal file count - collapsed similar components
- Backend responsible for data persistence & API calls
- Frontend handles UI/UX and user interactions
- Strong TypeScript typing throughout

### Legal Compliance
- Terms include: arbitration clauses, chargeback policies, refund policy (FINAL & NON-REFUNDABLE)
- Privacy policy covers data collection and user rights
- Community guidelines enforce Code of Conduct
- Age restriction: 13+ with parental consent for minors

---

## Deployment Status
Frontend fully functional and ready for backend API integration. Platform launch announcement posted to community. Website accessible upon backend implementation.

---

## Development Timeline
- Started: ~June 2025
- Completed Frontend: November 2025
- Next Phase: Backend API & Integrations (Q4 2025)
