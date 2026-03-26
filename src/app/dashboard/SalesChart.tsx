import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getAnalytics } from '@/services/analyticsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart() {
  const data = getAnalytics();

  const labels = data.recentSales.map((item) => item.date);

  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const, // Gráfico de barras
        label: 'Ingresos Diarios (€)',
        data: data.recentSales.map((item) => item.totalSales),
        backgroundColor: 'rgba(120, 172, 141, 0.8)',
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Volumen de Pedidos',
        data: data.recentSales.map((item) => item.ordersCount),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(235, 110, 21, 0.73)',
        borderWidth: 3,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tendencias Diarias: Ingresos vs Volumen de Pedidos',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: { display: true, text: 'Ingresos (€)' },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: { display: true, text: 'Pedidos' },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6 h-120">
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
}
