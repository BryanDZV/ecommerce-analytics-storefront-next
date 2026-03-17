import { getAnalytics } from '@/services/analyticsService';
import { DashboardStats } from '@/types/analytics';
import { useQuery } from '@tanstack/react-query';

export const useAnalytics = () => {
  return useQuery<DashboardStats>({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics(),
  });
};
