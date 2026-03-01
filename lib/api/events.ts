import { apiClient } from './client';

export interface PublicEvent {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  locationName: string | null;
  locationAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  startsAt: string;
  endsAt: string;
  salesStartAt: string | null;
  salesEndAt: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  timezone: string;
  status: string;
  maxTicketsPerOrder: number;
  refundPolicy: string | null;
  contactEmail: string | null;
  ageRestriction: string | null;
  organizationName: string | null;
  currency?: string;
  tiers: PublicTier[];
}

export interface PublicTier {
  id: string;
  name: string;
  description: string | null;
  price: number;
  maxQuantity: number | null;
  soldCount: number;
  lockedCount: number;
  available: number | null;
  sortOrder: number;
}

export interface TicketLockResponse {
  sessionId: string;
  lockId: string;
  expiresAt: string;
}

export interface PurchaseResponse {
  tickets: {
    id: string;
    qrCode: string;
    tierName: string;
    amountPaid: number;
  }[];
  receiptUrl?: string;
}

export const publicEventsApi = {
  list: (params?: { lat?: number; lng?: number; radiusMiles?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.lat) searchParams.set('lat', params.lat.toString());
    if (params?.lng) searchParams.set('lng', params.lng.toString());
    if (params?.radiusMiles) searchParams.set('radiusMiles', params.radiusMiles.toString());
    if (params?.search) searchParams.set('search', params.search);
    const qs = searchParams.toString();
    return apiClient.get<{ events: PublicEvent[] }>(`/events/public${qs ? `?${qs}` : ''}`);
  },

  getBySlug: (slug: string) =>
    apiClient.get<{ event: PublicEvent }>(`/events/public/${slug}`),

  checkLock: (slug: string, sessionId: string) =>
    apiClient.get<TicketLockResponse & { tierId: string; quantity: number; tierPrice: number }>(`/events/public/${slug}/lock/${sessionId}`),

  lockTickets: (slug: string, data: { tierId: string; quantity: number; customerEmail?: string }) =>
    apiClient.post<TicketLockResponse>(`/events/public/${slug}/lock`, data),

  purchase: (slug: string, data: {
    sessionId: string;
    tierId: string;
    quantity: number;
    customerEmail: string;
    customerName: string;
    paymentMethodId: string;
  }) =>
    apiClient.post<PurchaseResponse>(`/events/public/${slug}/purchase`, data),
};
