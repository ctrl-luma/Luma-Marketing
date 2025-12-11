import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;
let cachedPublishableKey: string | null = null;

// Fetch the publishable key from the backend
async function fetchPublishableKey(): Promise<string> {
  if (cachedPublishableKey) {
    console.log('[Stripe] Using cached publishable key:', cachedPublishableKey);
    return cachedPublishableKey;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';
  console.log('[Stripe] Fetching publishable key from:', `${apiUrl}/stripe/config`);

  const response = await fetch(`${apiUrl}/stripe/config`);

  if (!response.ok) {
    throw new Error('Failed to fetch Stripe config');
  }

  const data = await response.json();
  console.log('[Stripe] Received publishable key:', data.publishableKey);
  cachedPublishableKey = data.publishableKey;
  return data.publishableKey;
}

// Initialize Stripe by fetching the key from the backend
export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = fetchPublishableKey().then((key) => loadStripe(key));
  }
  return stripePromise;
};

// For components that need the promise directly (like Elements)
export const getStripePromise = () => {
  if (!stripePromise) {
    stripePromise = fetchPublishableKey().then((key) => loadStripe(key));
  }
  return stripePromise;
};
