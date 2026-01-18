# REACT Studios™ Gaming Community Platform - Design Guidelines

## Design Approach: Reference-Based (Gaming Social Platforms)

**Primary References:** Discord (community UI patterns), Steam Community (gaming aesthetics), Reddit (discussion layouts), modern gaming dashboards

**Core Principle:** Create a premium dark-themed gaming platform that balances social engagement with powerful community management tools.

---

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts) - clean, modern readability
- Accent/Display: Space Grotesk (via Google Fonts) - distinctive gaming edge

**Hierarchy:**
- Hero Headlines: 3xl-4xl, bold, Space Grotesk
- Section Titles: 2xl-3xl, semibold, Space Grotesk  
- Card Headers: xl, semibold, Inter
- Body Text: base, regular, Inter
- Metadata/Stats: sm, medium, Inter
- Buttons/CTAs: sm-base, semibold, Inter

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 (p-2, p-4, gap-6, m-8, py-12, py-16)

**Container Strategy:**
- Marketing pages: max-w-7xl centered
- Dashboard/App: Full-width with sidebar navigation (280px fixed)
- Content areas: max-w-6xl for readability
- Forum posts: max-w-4xl for optimal reading

**Grid Patterns:**
- Feature cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- LFG listings: grid-cols-1 lg:grid-cols-2
- Build showcases: grid-cols-1 md:grid-cols-2 xl:grid-cols-3
- Stats counters: grid-cols-2 md:grid-cols-3 lg:grid-cols-6

---

## Component Library

### Navigation
**Main Nav:** Fixed top bar with logo, primary links, user profile dropdown, notification bell
**Sidebar:** Collapsible left sidebar for dashboard sections (LFG, Clans, Forums, Builds, Profile, Settings)
**Breadcrumbs:** For deep navigation in forums and clan pages

### Cards
**Standard Card:** Rounded corners (rounded-lg), subtle border, hover lift effect
**LFG Card:** Game icon, roles needed, skill level badges, join button, participant count
**Clan Card:** Clan logo, member count, recruitment status badge, featured stats
**Build Card:** Game/character thumbnail, build name, rating stars, author, upvote count
**Forum Thread Card:** Title, author avatar, reply count, view count, last activity timestamp

### Status Indicators
**VIP Badges:** Four distinct badge designs for Bronze/Sapphire/Diamond/Founders with icons
**Account Links:** Connected status indicators for Discord (logo + username) and Roblox (logo + username)
**Online Status:** Small colored dots (green/gray) on avatars
**Role Badges:** Small pills for game roles (Tank, DPS, Support, etc.)

### Forms & Inputs
**Standard Input:** Full-width with labels above, consistent padding (p-3)
**Search Bars:** Icon prefix, rounded design, prominent in LFG/Forums/Clans sections
**Filters:** Dropdown selects and toggle chips for skill level, game type, availability
**VIP Purchase Cards:** Comparison table layout with feature checkmarks, pricing, CTA buttons

### Data Display
**Stats Counters:** Large numbers (3xl-4xl) with labels below, animated counting on load
**Analytics Charts:** Line graphs for member growth, bar charts for engagement
**Leaderboards:** Ranked lists with positions, avatars, stats columns
**Activity Feeds:** Timeline-style with timestamps, user actions, linked content

### Interactive Elements
**Primary CTA:** Vibrant gaming accent color, rounded, semibold text, subtle glow effect
**Secondary Buttons:** Outlined style, transparent background
**Icon Buttons:** For actions (edit, delete, share, bookmark)
**Tabs:** Underline indicator style for switching between sections
**Toggles:** For settings and preferences

### Social Features
**Chat Interface:** Message bubbles, timestamp, user avatars, typing indicators
**Comment Threads:** Nested replies with indent lines, upvote/downvote arrows
**User Profiles:** Hero banner area, avatar, stats grid, recent activity, linked accounts section
**Notification Badges:** Red dot counters on navigation items

---

## Page-Specific Layouts

### Marketing Homepage
**Hero:** Full-width with large headline, subtext, dual CTAs, background gaming imagery (blurred, dark overlay), stats counters overlaid
**Features Grid:** 3-column grid showcasing Member Management, Forums, Analytics, Game Integration, Security, Infrastructure
**Social Proof:** Testimonial cards in 3-column grid with company logos
**CTA Section:** Centered call-to-action with supporting stats

### LFG Matchmaking
**Filter Sidebar:** Game selector, role checkboxes, skill level slider, time availability
**Listings Grid:** 2-column responsive cards with quick join actions
**Create LFG Modal:** Form overlay for posting new LFG request

### Clan Hubs
**Clan Directory:** Grid of clan cards with search and filter options
**Individual Clan Page:** Hero banner, roster table, recruitment panel, recent activity feed, stats dashboard

### Build Sharing
**Build Browser:** Filterable grid of build cards by game/character
**Build Detail:** Large layout with images, detailed stats table, loadout breakdown, comment section

### Forums
**Category List:** Card grid for different game forums
**Thread List:** Table-style layout with thread titles, author, replies, views
**Thread View:** Post content, reply tree, sidebar with related threads

### User Dashboard
**Overview:** Welcome panel, quick stats, recent activity, linked accounts status
**Settings:** Tabbed interface for Profile, Account Connections (Discord/Roblox), VIP Subscription, Notifications

---

## Images

**Hero Section:** Yes - use a dramatic gaming-themed image showing community/multiplayer gaming scenes. Apply dark overlay (opacity 60-70%) for text readability. Consider blurred background treatment.

**Additional Images:**
- Feature section icons: Use Heroicons for all feature cards
- User avatars: Circular, consistent sizing (40px standard, 64px profiles, 24px mentions)
- Game thumbnails: 16:9 ratio for builds and LFG posts
- Clan logos: Square format, 80px-120px
- VIP tier badges: Custom designed icons representing each tier

---

## Accessibility & Polish

**Consistent Focus States:** Visible keyboard navigation indicators across all interactive elements
**Loading States:** Skeleton screens for data-heavy sections (forums, LFG listings)
**Empty States:** Friendly messaging with CTAs when no content exists
**Responsive Breakpoints:** Mobile-first approach, optimize for 768px, 1024px, 1440px
**Micro-interactions:** Subtle scale on hover for cards, smooth transitions for modals, gentle fade-ins for loaded content