import { apiClient } from './client';

export interface PublicCatalog {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  date: string | null;
  slug: string;
  organizationName: string;
  preorderPaymentMode: 'pay_now' | 'pay_at_pickup' | 'both';
  pickupInstructions: string | null;
  estimatedPrepTime: number;
  taxRate: number;
  // Tip settings
  showTipScreen: boolean;
  tipPercentages: number[];
  allowCustomTip: boolean;
  // Payment capability
  canAcceptPayments?: boolean;
  categories: PublicCategory[];
  products: PublicProduct[];
}

export interface PublicCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
}

export interface PublicProduct {
  id: string;
  catalogProductId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface PreorderItem {
  catalogProductId: string;
  quantity: number;
  notes?: string;
}

export interface CreatePreorderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentType: 'pay_now' | 'pay_at_pickup';
  items: PreorderItem[];
  orderNotes?: string;
  tipAmount?: number;
  paymentMethodId?: string; // Required for pay_now
}

export interface PreorderResponse {
  id: string;
  orderNumber: string;
  dailyNumber: number;
  status: 'pending' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
  paymentType: 'pay_now' | 'pay_at_pickup';
  subtotal: number;
  taxAmount: number;
  tipAmount: number;
  totalAmount: number;
  estimatedReadyAt: string | null;
  pickupInstructions: string | null;
  catalogName: string;
  createdAt: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    notes: string | null;
  }[];
}

export interface PreorderStatusResponse {
  preorder: PreorderResponse;
}

export const publicMenuApi = {
  getCatalog: (slug: string) =>
    apiClient.get<{ catalog: PublicCatalog }>(`/menu/public/${slug}`),

  createPreorder: (slug: string, data: CreatePreorderRequest) =>
    apiClient.post<{ preorder: PreorderResponse }>(`/menu/public/${slug}/preorder`, data),

  getPreorderStatus: (slug: string, preorderId: string, email: string) =>
    apiClient.get<PreorderStatusResponse>(`/menu/public/${slug}/preorder/${preorderId}?email=${encodeURIComponent(email)}`),

  cancelPreorder: (slug: string, preorderId: string, email: string) =>
    apiClient.post<{ message: string }>(`/menu/public/${slug}/preorder/${preorderId}/cancel`, { email }),
};
