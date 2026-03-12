import { DashboardStats } from '@/types/analytics';

export const analyticsData: DashboardStats = {
  totalRevenue: 85430.5,
  activeUsers: 1240,
  conversionRate: 4.5,

  recentSales: [
    { date: '2026-03-01', totalSales: 4200, ordersCount: 15 },
    { date: '2026-03-02', totalSales: 3800, ordersCount: 12 },
    { date: '2026-03-03', totalSales: 5100, ordersCount: 22 },
    { date: '2026-03-04', totalSales: 4600, ordersCount: 18 },
    { date: '2026-03-05', totalSales: 6200, ordersCount: 25 },
  ],
};
