# Traders Reality Customer Terminal - V1 Demo

Professional market intelligence and trading education platform for serious traders.

**A Bloomberg-style trading intelligence terminal + hybrid system education + membership funnel.**

---

## Project Overview

This is the V1 demo of the Traders Reality customer-facing terminal. It combines:

- **Market Intelligence** - Real-time desk, macro context, risk flags
- **Trade Setups** - Market-ready setup cards with tier-based access
- **Education** - Trader progression system from fundamentals to mastery
- **Alerts & Briefings** - Daily/weekly intelligence and market notifications
- **Membership Tiers** - Bronze (free) → Gold → Platinum (main revenue) → Black (elite)

### Core Philosophy

The app should feel like: **"I am inside Tino's market desk."**

Not a landing page. Not a typical SaaS dashboard. Not a crypto casino.

---

## Getting Started

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
/app
  /page.tsx                 # Today's Battlefield (home)
  /setups
    /page.tsx               # Setup browser with filtering
  /market-desk
    /page.tsx               # Intelligence terminal grid
  /academy
    /page.tsx               # Trader progression system
  /briefings
    /page.tsx               # Daily & weekly intelligence
  /alerts
    /page.tsx               # Alert center
  /membership
    /page.tsx               # Tier comparison & upgrade
  /profile
    /page.tsx               # Account & preferences

/components
  /TerminalShell.tsx        # Main layout shell & navigation
  /LockedPreview.tsx        # Access control component
  /SetupCard.tsx            # Setup display card
  /layout.tsx               # Root layout

/lib
  /mock-data.ts             # All mock data schemas & data
  /tier-access.ts           # Tier access utilities

/styles
  /globals.css              # TR styling & theme

/public                     # Static assets (placeholder)
```

---

## Membership Tiers

### Bronze (Free)

**Identity:** Learning  
**Price:** Free

**Access:**
- Market snapshot
- One free lesson
- Delayed/locked setup previews
- Newsletter signup
- Limited dashboard

---

### Gold

**Identity:** Structured Trader  
**Price:** $97/month

**Access:**
- Delayed setups (120 min delay)
- Daily briefing
- Core education tracks
- Community access
- Basic market dashboard
- Alert history

---

### Platinum

**Identity:** Professional System User  
**Price:** $297/month

**Access:**
- Real-time setups (no delay)
- Full market desk access
- Confirmation board & risk flags
- Full briefings & PDF breakdowns
- Masterclass access
- Discord access
- TR Archives
- Hybrid Academy (all tracks)
- Priority alerts
- Tino notes on all setups

---

### Black

**Identity:** Elite Market Desk  
**Price:** $997/month

**Access:**
- Priority alerts (immediate)
- Elite desk notes
- Higher-confidence setups
- Advanced intelligence reports
- Early access to new tools
- Direct Q&A session access
- Private market analysis
- Gamma/positioning reports
- VIP Discord access

---

## Key Features

### 1. Today's Battlefield (Home)

The command center that greets users on login.

**Shows:**
- Market Status (RISK_ON/RISK_OFF/MIXED/STAND_DOWN/EVENT_RISK)
- Threat Level (LOW/ELEVATED/CRITICAL)
- Assets In Play
- Next Event Risk
- Tino's Read (market outlook)
- Confirmation Board (macro confirmation vs conflict)
- Latest Setup Preview
- Upgrade triggers (natural, not pushy)

**Lock/Access Logic:**
- All Bronze users see full battlefield
- Setup details lock at Platinum
- Tino's notes lock at Platinum

---

### 2. Setups

Market-ready trade setup cards.

**Filters:**
- Direction (LONG/SHORT)
- Asset Class (EQUITY/CRYPTO/FOREX/COMMODITY/INDEX)

**Each Setup Shows:**
- Asset & direction
- Setup type (BREAKOUT/REVERSAL/PULLBACK/RANGE/STRUCTURAL)
- Bias (BULLISH/BEARISH/NEUTRAL/CONFLICTED)
- Entry zone
- Target area
- Invalidation
- Confidence level
- Risk flag
- Time issued
- Tino's note (tier-locked)
- Why it matters

**Tier Access:**
- Bronze: Teasers only
- Gold: Full setup with 120-minute delay
- Platinum: Real-time, full execution notes
- Black: Priority + elite notes

---

### 3. Market Desk

Intelligence terminal grid combining all market context.

**Sections:**
- **Market Pulse** - Status & threat level overview
- **Confirmation Board** - Technical/Macro/Sentiment/Risk confirmation
- **Risk Flags** - Major market threats (per asset)
- **Macro Threats** - Geopolitical, policy, event risks
- **Assets In Play** - What's moving today
- **Tino's Deep Read** - Full market outlook
- **Coming Soon:** TR Signals, Gamma Exposure, ACTUS Score

**Locked:** Behind Platinum tier (complete lock for Bronze/Gold)

---

### 4. Academy

Trader progression system.

**Tracks:**
1. **Start Here** (Bronze) - Market structure foundation
2. **Core Principles** (Gold) - Bias vs setup
3. **Execution Track** (Platinum) - Risk management
4. **Professional Track** (Platinum) - Flow analysis
5. **Specialist Track** (Black) - Macro integration

**Per Lesson:**
- Title, description, duration
- Tier requirement
- Progress tracking
- Locked state indicator

---

### 5. Briefings

Daily and weekly market intelligence from Tino.

**Types:**
- Daily Briefing - Session preparation
- Weekly Review - Market context & outlook

**Access:**
- Gold+ gets daily briefings
- Platinum+ gets full weekly reviews
- Includes downloadable PDFs (future)

---

### 6. Alerts

Real-time alert center.

**Features:**
- Unread/All filter
- Priority badges (LOW/MEDIUM/HIGH/CRITICAL)
- Alert types (SETUP/MARKET_MOVE/MACRO/RISK/BRIEFING)
- Tier-based visibility
- Alert preferences (push, email, setup alerts)

---

### 7. Membership

Tier comparison & upgrade page.

**Shows:**
- Current plan status
- Full tier grid with pricing & features
- Feature breakdown (setups, market desk, academy, community)
- Billing info (for non-free users)

---

### 8. Profile

Account & preferences.

**Includes:**
- User info (name, member since, status)
- Membership status & renewal date
- Learning progress dashboard
- Alert preferences
- Connected services (Discord, Email)
- Account settings (password, privacy, sign out)

---

## Mock Data

All data is hardcoded in `/lib/mock-data.ts` for V1.

### Schemas

**User:**
- id, name, tier, joinedAt
- alertPreferences (push, email, types)
- academyProgress (completed lessons, current track)

**Setup:**
- id, asset, assetClass, direction
- setupType, bias, entry, invalidation, target
- confidence, riskFlag, tierRequired, delayMinutes
- issuedAt, tinoNote, whyItMatters, status

**MarketIntelligence:**
- marketStatus, threatLevel, assetsInPlay
- macroThreats, confirmationBoard, riskFlags
- nextEvent, standDownCondition, tinoRead

**AcademyLesson:**
- id, title, track, tierRequired
- progress, locked, duration, description

**Alert:**
- id, asset, type, message
- tierRequired, issuedAt, priority, read

**Briefing:**
- id, title, type, content
- pdfUrl, tinoNotes, tierRequired, timestamp

---

## Tier Access Utilities

Located in `/lib/tier-access.ts`:

```typescript
canAccessTier(userTier, requiredTier)  // boolean
getAccessStatus(userTier, requiredTier) // { accessible, type }
getDelayForTier(tier, requiredTier, baseDelay) // minutes
getUpgradeMessage(userTier, requiredTier) // string
```

---

## Styling

### Theme Colors

- **Primary Black:** `#0a0a0a`
- **Accent Red:** `#e63946`
- **Dark Gray:** `#1a1a1a`, `#2a2a2a`
- **Light Gray:** `#666666`, `#999999`
- **White:** `#f5f5f5`

### Fonts

- **Heading:** IBM Plex Sans Condensed (uppercase, letter-spaced)
- **Body:** IBM Plex Sans
- **Mono:** IBM Plex Mono

### Component Classes

- `.tr-terminal` - Main container
- `.tr-heading` - Title styles
- `.tr-card` - Content card
- `.tr-badge` - Status badges
- `.tr-nav` - Navigation bar
- `.tr-accent-red` - Red highlight
- `.tr-upgrade-btn` - Upgrade button
- `.tr-locked` - Locked content blur
- `.tr-unlock-prompt` - Unlock overlay

---

## Future Roadmap (Architecture Ready)

### Phase 2: API Integration

- Replace mock data with real backend
- Connect to Stripe for payments
- Sync with Mailchimp for emails

### Phase 3: Advanced Features

- Real-time alerts via WebSocket
- Push notifications
- Discord integration
- PDF generation for briefings

### Phase 4: Repo Integration

1. **TradingAgents** → Agent vote system on market desk
2. **LibreChat** → AI "Ask TR Desk" panel
3. **HyperFrames** → Auto-render setups to social media
4. **Fincept Terminal** → Enhanced layout design
5. **Agentic Inbox** → Support classification
6. **VoxCPM** → Voice alert placeholders
7. **Flowsint** → Relationship mapping dashboard
8. **Nango** → Integration hub (Stripe, Discord, etc.)

---

## Development Guidelines

### Adding New Pages

1. Create folder in `/app` (e.g., `/app/new-section`)
2. Create `page.tsx` with `'use client'`
3. Use `TerminalShell` wrapper
4. Import mock data from `/lib/mock-data.ts`
5. Apply tier access logic via `/lib/tier-access.ts`

### Adding New Components

1. Create file in `/components`
2. Use TypeScript interfaces for props
3. Follow TR styling conventions
4. Test with all tiers in mock data

### Modifying Tier Access

Edit `/lib/tier-access.ts` - all logic is centralized there.

---

## Testing the Tiers

Change `mockUser.tier` in `/lib/mock-data.ts` to test different access levels:

```typescript
// Try each tier
tier: 'bronze'   // Most locked
tier: 'gold'     // Delayed access
tier: 'platinum' // Full access to most features
tier: 'black'    // Premium access
```

Then restart the dev server to see changes.

---

## Performance Notes

- V1 uses mock data (instant)
- No external API calls yet
- Component lazy loading ready for future
- Tailwind CSS optimized for production

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## License

© 2026 Traders Reality. All rights reserved.

---

## Questions?

This V1 demo is designed to validate the direction before heavy backend investment.

**Key Questions to Answer:**
- Does this feel like a premium trading intelligence product?
- Is the tier value proposition clear?
- Does the UX encourage natural upgrade paths?
- Should we add/remove any features?
- Is the Traders Reality brand voice correct?

Share feedback to iterate on the architecture.
