# Luma-Marketing

Marketing website and onboarding platform for Luma POS. Built with Next.js 16 (App Router), Tailwind CSS 4, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev     # http://localhost:3333
```

## Project Structure

```
Luma-Marketing/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing page (composition of sections)
│   ├── get-started/          # Multi-step onboarding wizard (946 lines)
│   ├── about/                # About page
│   ├── contact/              # Contact form
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── custom-plan-request/  # Enterprise plan request form
│   ├── onboarding/           # Onboarding completion & auth refresh
│   └── subscription/         # Payment success page
├── components/
│   ├── ui/                   # Base components (Button, Card, Input, Badge)
│   ├── providers/            # AuthProvider
│   ├── Hero.tsx              # Hero section with phone mockup
│   ├── Features.tsx          # Feature showcase
│   ├── Pricing.tsx           # Pricing tier cards
│   ├── Header.tsx            # Navigation with scroll effects
│   ├── Footer.tsx            # Site footer
│   └── ...                   # Other marketing sections
├── lib/
│   ├── api/                  # API client, auth service, interceptor
│   ├── stripe.ts             # Stripe initialization
│   ├── pricing.ts            # Pricing tier definitions
│   └── auth-handoff.ts       # Cross-app auth token handoff
├── hooks/
│   ├── useFadeIn.ts          # Viewport-triggered fade animation
│   ├── useAuth.ts            # Authentication state management
│   └── useIsMobile.ts        # Mobile detection
└── styles/
    └── globals.css           # Tailwind v4 + custom utilities
```

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing with Hero, Features, Pricing, FAQ |
| `/get-started` | Multi-step signup wizard with Stripe payment |
| `/about` | Company mission and values |
| `/contact` | Contact form |
| `/custom-plan-request` | Enterprise custom pricing request |

## Design System

### Colors
- **Primary**: Blue-600 (`#2563EB`) with full shade palette (50-950)
- **Background**: Pure black (`#000000`) with gray-900/950 for cards
- **Text**: White for headings, gray-300/400 for body

### Typography
- **Font**: Inter (body), Roboto Mono (code)
- **Headings**: `.heading-1`, `.heading-2`, `.heading-3` classes in globals.css

### Component Patterns
```tsx
// Button variants: primary, secondary, ghost, danger, white
<Button variant="primary" size="lg">Get Started</Button>

// Card with hover effects
<Card variant="default" hover>Content</Card>
```

### Animations
- Desktop: Framer Motion with scroll-triggered reveals
- Mobile: CSS fade-in animations (performance optimized)
- Use `useFadeIn` hook for viewport-triggered effects

## Onboarding Flow

The `/get-started` page is a multi-step wizard:

1. **Pricing** - Select tier (Starter/Pro/Enterprise)
2. **Account** - Email (with availability check) + password
3. **Business** - Name, business name, type, phone
4. **Use Case** - (Enterprise only) Requirements gathering
5. **Payment** - (Pro only) Stripe payment element
6. **Confirmation** - Success with redirect to dashboard

### Key Implementation Details
- Form state managed with `useState`
- Email availability checked before proceeding
- Stripe Elements for payment (night theme)
- Auto-redirect to vendor dashboard with token handoff

## API Integration

### Auth Service (`lib/api/auth.ts`)
```typescript
authService.signup(data)      // Create account
authService.login(credentials) // Login
authService.refreshTokens()   // Token refresh
authService.checkEmailAvailability(email)
```

### API Client (`lib/api/client.ts`)
- Auto-injects Bearer token
- Auto-refreshes on 401
- Base URL: `NEXT_PUBLIC_API_URL`

## Pricing Tiers (`lib/pricing.ts`)

| Tier | Price | Transaction Fee |
|------|-------|-----------------|
| Starter | Free | 2.9% + $0.18 |
| Pro | $19/mo | 2.8% + $0.16 |
| Enterprise | Custom | Custom |

## Environment Variables

```env
NEXT_PUBLIC_APP_NAME=Luma POS
NEXT_PUBLIC_APP_URL=https://lumapos.co
NEXT_PUBLIC_API_URL=http://localhost:3334
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3335
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## Build & Deploy

```bash
npm run build           # Static export to /out
npm run build:dev       # Build + Docker push (dev tag)
npm run build:prod      # Build + Docker push (latest tag)
```

**Output**: Static HTML (no server required) - deployable to S3, Vercel, Cloudflare Pages

## Mobile Performance Notes

- Framer Motion disabled on mobile (< 1024px)
- Blur effects reduced via CSS media queries
- `useFadeIn` uses Intersection Observer for GPU-accelerated CSS animations
- `isMobile` state defaults to `true` to prevent hydration mismatch

## Common Tasks

### Add a new section to landing page
1. Create component in `components/`
2. Import and add to `app/page.tsx`
3. Use `useFadeIn` for mobile, `useInView` + Framer Motion for desktop

### Add a new page
1. Create `app/[route]/page.tsx`
2. Add to Header navigation if needed
3. Add to Footer links if needed

### Modify pricing tiers
Edit `lib/pricing.ts` - changes propagate to Pricing component and onboarding

### Update onboarding steps
Edit `app/get-started/page.tsx` - steps are conditional based on selected tier

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 16.x | React framework (App Router) |
| `tailwindcss` 4.x | Styling |
| `framer-motion` | Animations |
| `@stripe/react-stripe-js` | Payment forms |
| `lucide-react` | Icons |
| `react-intersection-observer` | Scroll-triggered effects |
