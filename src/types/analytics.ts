export interface SalesData {
  date: string;
  totalSales: number;
  ordersCount: number;
}

export interface DashboardStats {
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  recentSales: SalesData[];
}
