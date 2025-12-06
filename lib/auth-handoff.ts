/**
 * Auth Handoff Helper for redirecting to Vendor Dashboard with authentication
 */

import { authService } from './api/auth';

/**
 * Redirects to the vendor dashboard with authentication tokens
 * Uses the hash fragment method for cross-origin compatibility
 */
export function redirectToVendorDashboard() {
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard';
  
  // Get current auth data
  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken();
  const user = authService.getUser();
  
  if (!accessToken || !refreshToken) {
    console.error('No authentication tokens available for handoff');
    window.location.href = dashboardUrl;
    return;
  }
  
  // Build the auth callback URL with tokens in hash fragment
  const params = new URLSearchParams({
    accessToken,
    refreshToken,
  });
  
  if (user) {
    params.append('user', encodeURIComponent(JSON.stringify(user)));
  }
  
  // Use hash fragment for cross-origin compatibility
  const authCallbackUrl = `${dashboardUrl}/auth/callback#${params.toString()}`;
  
  // Redirect to vendor dashboard with auth
  window.location.href = authCallbackUrl;
}