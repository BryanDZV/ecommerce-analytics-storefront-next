import { analyticsData } from '@/mocks/mockAnalytics';
import { DashboardStats } from '@/types/analytics';

// simulated endpoint for dashboard analytics
export const getAnalytics = (): DashboardStats => {
  return analyticsData;
};
