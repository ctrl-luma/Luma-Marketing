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
      '1 custom catalog',
      'Basic tip tracking',
      'Event mode',
      'Daily payout summary',
      '1-2 devices',
    ],
    notIncluded: [
      'Revenue splits',
      'Multi-device support',
      'Advanced analytics',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For established mobile bars running regular events',
    transactionFee: '2.8% + $0.16 per tap',
    features: [
      'Everything in Starter',
      'Unlimited custom catalogs',
      'Unlimited events & locations',
      'Unlimited devices',
      'Revenue splits (venue/promoter)',
      'Tip pooling & tip-out rules',
      'Analytics dashboard',
      'Export to CSV/PDF',
      'Event templates',
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
