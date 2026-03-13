export interface SalesData {
  date: string;
  totalSales: number;
  ordersCount: number;
}

// Summary metrics used by the analytics dashboard.
export interface DashboardStats {
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  recentSales: SalesData[];
}
