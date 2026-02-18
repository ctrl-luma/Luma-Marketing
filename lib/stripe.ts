import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;
let cachedPublishableKey: string | null = null;

// Fetch the publishable key from the backend
async function fetchPublishableKey(): Promise<string> {
  if (cachedPublishableKey) {
    return cachedPublishableKey;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';
  const response = await fetch(`${apiUrl}/stripe/config`);

  if (!response.ok) {
    throw new Error('Failed to fetch Stripe config');
  }

  const data = await response.json();
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
