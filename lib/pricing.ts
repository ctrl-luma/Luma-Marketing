export interface PricingTier {
  id: string
  name: string
  price: string
  period: string
  description: string
  transactionFee: string
  features: string[]
  notIncluded: string[]
  cta: string
  highlighted: boolean
  recommended?: boolean
  promoPrice?: string
  promoPeriod?: string
  regularPrice?: string
  trialDays?: number
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for new mobile bars and pop-ups',
    transactionFee: '2.9% + $0.18 per tap',
    features: [
      'Tap to Pay on iPhone/Android',
      'Simple menu builder',
      '1 custom menu',
      'Daily payout summary',
      '1 User',
    ],
    notIncluded: [
      'Events & ticketing',
      'Tip reports & tracking',
      'Revenue splits',
      'Additional staff accounts',
      'Advanced analytics',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99',
    period: ' first month',
    regularPrice: '$29.99',
    promoPrice: '$19.99',
    promoPeriod: 'first month',
    trialDays: 7,
    description: 'For established mobile bars running regular events',
    transactionFee: '2.8% + $0.16 per tap',
    features: [
      'Everything in Starter',
      'Unlimited custom menus',
      'Events & ticketing',
      'Unlimited users & devices',
      'Staff account management',
      'Revenue splits (venue/promoter)',
      'Tip reports & tracking',
      'Tip pooling & tip-out rules',
      'Analytics dashboard',
      'Export to CSV/PDF',
    ],
    notIncluded: [],
    cta: 'Get Pro',
    highlighted: true,
    recommended: true,
  },
]

// Helper to get a tier by ID
export const getTierById = (id: string): PricingTier | undefined => {
  return pricingTiers.find(tier => tier.id === id)
}

// Helper to format price display
export const formatPriceDisplay = (tier: PricingTier): string => {
  return tier.price + tier.period
}
