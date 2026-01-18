# Luma-Marketing - Marketing Website & Onboarding

> **For full ecosystem context, see the root [CLAUDE.md](../CLAUDE.md)**

## Project Overview

Luma-Marketing is the marketing website and vendor onboarding platform for Luma POS. It provides the public-facing website with pricing information, feature showcases, and a multi-step signup wizard with Stripe subscription integration.

**Tech Stack:**
- **Framework:** Next.js 16 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (desktop), CSS animations (mobile)
- **Payments:** Stripe Elements (subscription checkout)
- **Icons:** Lucide React

---

## Directory Structure

```
Luma-Marketing/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page (composition of sections)
│   ├── get-started/              # Multi-step onboarding wizard
│   │   └── page.tsx              # ~950 lines - full signup flow
│   ├── about/                    # About page
│   ├── contact/                  # Contact form
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── custom-plan-request/      # Enterprise plan request form
│   ├── onboarding/               # Onboarding completion & auth refresh
│   ├── subscription/             # Payment success page
│   └── layout.tsx                # Root layout with providers
├── components/
│   ├── ui/                       # Base components
│   │   ├── Button.tsx            # Button variants
│   │   ├── Card.tsx              # Card with hover effects
│   │   ├── Input.tsx             # Form input
│   │   └── Badge.tsx             # Status badges
│   ├── providers/
│   │   └── AuthProvider.tsx      # Auth context provider
│   ├── Hero.tsx                  # Hero section with phone mockup
│   ├── Features.tsx              # Feature showcase grid
│   ├── Pricing.tsx               # Pricing tier cards
│   ├── FAQ.tsx                   # Accordion FAQ section
│   ├── Header.tsx                # Navigation with scroll effects
│   ├── Footer.tsx                # Site footer with links
│   └── ...                       # Other marketing sections
├── lib/
│   ├── api/                      # API client
│   │   ├── client.ts             # Base HTTP client
│   │   ├── auth.ts               # Auth service
│   │   └── interceptor.ts        # Request/response interceptors
│   ├── stripe.ts                 # Stripe initialization
│   ├── pricing.ts                # Pricing tier definitions
│   └── auth-handoff.ts           # Cross-app auth token handoff
├── hooks/
│   ├── useFadeIn.ts              # Viewport-triggered fade animation
│   ├── useAuth.ts                # Authentication state
│   └── useIsMobile.ts            # Mobile detection
└── styles/
    └── globals.css               # Tailwind v4 + custom utilities
```

---

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing with Hero, Features, Pricing, FAQ |
| `/get-started` | Multi-step signup wizard with payment |
| `/about` | Company mission and values |
| `/contact` | Contact form |
| `/custom-plan-request` | Enterprise custom pricing request |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |
| `/onboarding` | Post-signup completion handler |
| `/subscription` | Payment success confirmation |

---

## Pricing Tiers

```typescript
// lib/pricing.ts
export const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    price: 0,                       // Free
    transactionFee: '2.9% + $0.18',
    features: [
      '1 custom catalog',
      '1-2 devices',
      'Basic reporting',
      'Email support',
    ],
  },
  pro: {
    name: 'Pro',
    price: 19,                      // $19/month
    transactionFee: '2.8% + $0.16',
    features: [
      'Unlimited catalogs',
      'Unlimited events',
      'Unlimited devices',
      'Revenue splits & tip pooling',
      'Analytics dashboard',
      'Export to CSV/PDF',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: null,                    // Custom pricing
    transactionFee: 'Custom',
    features: [
      'Everything in Pro',
      'Custom transaction rates',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
    ],
  },
};
```

---

## Onboarding Flow (`/get-started`)

The signup wizard is a multi-step form with conditional steps based on the selected tier.

### Steps

1. **Pricing Selection**
   - Display tier cards with features
   - Starter/Pro/Enterprise selection
   - Enterprise redirects to custom plan request

2. **Account Creation**
   - Email input with availability check
   - Password with strength requirements
   - Real-time email validation via API

3. **Business Information**
   - First name, last name
   - Business name
   - Business type (dropdown)
   - Phone number

4. **Use Case** (Enterprise only)
   - Custom requirements gathering
   - Expected transaction volume
   - Special needs

5. **Payment** (Pro only)
   - Stripe Elements integration
   - Card input with validation
   - Night theme styling

6. **Confirmation**
   - Success message
   - Auto-redirect to vendor dashboard
   - Token handoff via URL hash

### Implementation Details

```typescript
// Form state management
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  tier: 'starter',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  businessName: '',
  businessType: '',
  phone: '',
});

// Email availability check
const checkEmail = async (email: string) => {
  const available = await authService.checkEmailAvailability(email);
  setEmailError(available ? null : 'Email already in use');
};

// Stripe payment for Pro tier
const handlePayment = async () => {
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/subscription`,
    },
  });
};
```

---

## Design System

### Colors
```css
/* Primary */
--primary-50: #EFF6FF;
--primary-600: #2563EB;    /* Main brand color */
--primary-700: #1D4ED8;
--primary-950: #172554;

/* Background */
--bg-primary: #000000;     /* Pure black */
--bg-card: #111827;        /* gray-900 */
--bg-card-hover: #1F2937;  /* gray-800 */

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #9CA3AF;  /* gray-400 */
--text-muted: #6B7280;      /* gray-500 */
```

### Typography
```css
/* Headings in globals.css */
.heading-1 {
  @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight;
}
.heading-2 {
  @apply text-3xl md:text-4xl font-bold tracking-tight;
}
.heading-3 {
  @apply text-xl md:text-2xl font-semibold;
}
```

### Component Patterns

```tsx
// Button variants
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="white">Contact Sales</Button>

// Card with hover
<Card variant="default" hover className="p-6">
  <h3>Feature Title</h3>
  <p>Description text</p>
</Card>
```

---

## Animation System

### Desktop (Framer Motion)
```tsx
import { motion, useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

### Mobile (CSS + Intersection Observer)
```tsx
// useFadeIn hook for performance
const { ref, isVisible } = useFadeIn();

<div
  ref={ref}
  className={`transition-opacity duration-500 ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`}
>
  {children}
</div>
```

### Mobile Performance
- Framer Motion disabled below 1024px viewport
- Blur effects reduced via CSS media queries
- `isMobile` state defaults to `true` to prevent hydration mismatch

---

## API Integration

### Auth Service (`lib/api/auth.ts`)
```typescript
export const authService = {
  signup: (data: SignupData) =>
    apiClient.post('/auth/signup', data),

  login: (credentials: LoginData) =>
    apiClient.post('/auth/login', credentials),

  refreshTokens: () =>
    apiClient.post('/auth/refresh'),

  checkEmailAvailability: (email: string) =>
    apiClient.post('/auth/check-email', { email }),
};
```

### API Client (`lib/api/client.ts`)
```typescript
const apiClient = {
  get: <T>(url: string) => fetch(url).then(r => r.json()),
  post: <T>(url: string, data: any) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
};
```

---

## Cross-App Auth Handoff

After signup, users are redirected to the vendor dashboard with tokens passed via URL hash:

```typescript
// lib/auth-handoff.ts
export const handoffToVendor = (tokens: AuthTokens) => {
  const params = new URLSearchParams({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  window.location.href = `${DASHBOARD_URL}/#${params.toString()}`;
};

// Vendor dashboard extracts tokens from hash
const extractTokensFromHash = () => {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  return {
    accessToken: params.get('accessToken'),
    refreshToken: params.get('refreshToken'),
  };
};
```

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME=Luma POS
NEXT_PUBLIC_APP_URL=https://lumapos.co
NEXT_PUBLIC_API_URL=http://localhost:3334
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3335
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

---

## Build & Deploy

```bash
# Development
npm run dev              # Start dev server at localhost:3333

# Production build (static export)
npm run build            # Outputs to /out directory

# Preview production build
npm run start

# Docker builds
npm run build:dev        # Build + push dev Docker image
npm run build:prod       # Build + push prod Docker image
```

### Static Export
The site is configured for static HTML export (no Node.js server required):

```typescript
// next.config.ts
export default {
  output: 'export',
  images: { unoptimized: true },
};
```

Deployable to: S3, Vercel, Cloudflare Pages, Netlify, GitHub Pages

---

## Common Tasks

### Add a new marketing section
1. Create component in `components/`
2. Import and add to `app/page.tsx`
3. Use `useFadeIn` hook for mobile, `useInView` + Framer Motion for desktop
4. Follow existing section patterns for consistency

### Add a new page
1. Create `app/[route]/page.tsx`
2. Add to Header navigation if needed
3. Add to Footer links if needed
4. Follow existing page patterns

### Modify pricing tiers
Edit `lib/pricing.ts` - changes propagate to:
- Pricing component on landing page
- Onboarding wizard tier selection
- Feature comparison displays

### Update onboarding steps
Edit `app/get-started/page.tsx`:
- Steps are conditional based on selected tier
- Form validation is inline
- Stripe Elements styling in payment step

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 16.x | React framework (App Router) |
| `tailwindcss` 4.x | Styling |
| `framer-motion` | Desktop animations |
| `@stripe/react-stripe-js` | Payment forms |
| `@stripe/stripe-js` | Stripe SDK |
| `lucide-react` | Icons |
| `react-intersection-observer` | Scroll-triggered effects |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hydration mismatch | Check `isMobile` defaults to `true` |
| Stripe not loading | Verify publishable key, check HTTPS |
| Email check failing | Verify API URL, check CORS settings |
| Static export issues | Ensure no server-side features used |
| Animation jank on mobile | Animations should be CSS-only below 1024px |

---

**Remember:** This is the first touchpoint for new vendors. Ensure fast load times, clear messaging, and a smooth onboarding experience. Test the full signup flow regularly.
