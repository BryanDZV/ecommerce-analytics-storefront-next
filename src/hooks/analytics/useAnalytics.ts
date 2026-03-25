import { getAnalytics } from '@/services/analyticsService';
import { DashboardStats } from '@/types/analytics';
import { useQuery } from '@tanstack/react-query';

const withAnalyticsDefaults = () => ({
  staleTime: 1000 * 60 * 60, // 1 hora
  retry: 2, // 2 reintentos
});

export const useAnalytics = () => {
  return useQuery<DashboardStats>({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics(),
    ...withAnalyticsDefaults(),
  });
};
