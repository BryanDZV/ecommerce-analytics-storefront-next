'use client';
import FlexibleImage from '@/components/FlexibleImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchbarBack from '@/components/SearchbarBack';
import { getAnalytics } from '@/services/analyticsService';
import SalesChart from './SalesChart';

export default function Analytics() {
  const data = getAnalytics();

  const totalOrders = data.recentSales.reduce(
    (acc, currentDay) => acc + currentDay.ordersCount,
    0
  );

  return (
    <>
      <Header />
      <SearchbarBack></SearchbarBack>
      <section className="mainContainerDashboard">
        <div className="descriptionAndDateDashboard">
          <div>
            <strong>Panel de Control - Resumen de ventas recientes</strong>
          </div>
          <div>
            <select defaultValue="1-5-marzo" aria-label='Select Date Range'>
              <option value="1-5-marzo">Del 1 al 5 de Marzo de 2026</option>
            </select>
          </div>
        </div>

        <div className="boxesContainerDashboard">
          {/* 4 CUADRADOS */}
          <div className="fourBoxesContainer">
            {/* PRIMER CUADRADO */}
            <div className="analyticsCard">
              <div className="titleOfAnalitycsBox">
                <p>Ingresos Totales</p>
                <div className="pictureOfContainerDashboard">
                  <img src="/money.png" alt="cash" />
                </div>
              </div>
              <div>
                <span className="dataOfAnalitycs">€{data.totalRevenue}</span>
              </div>
              <div>
                <p className="trendPositive">
                  <span>+12.5%</span> vs. periodo anterior
                </p>
              </div>
            </div>

            {/* SEGUNDO CUADRADO */}
            <div className="analyticsCard">
              <div className="titleOfAnalitycsBox">
                <p>Usuarios activos</p>
                <div className="pictureOfContainerDashboard">
                  <img src="/group.png" alt="users" />
                </div>
              </div>
              <div>
                <span className="dataOfAnalitycs">
                  {data.activeUsers.toLocaleString('es-ES')}
                </span>
              </div>
              <div>
                <p className="subtitleCard">Visitantes únicos</p>
              </div>
            </div>

            {/* TERCER CUADRADO */}
            <div className="analyticsCard">
              <div className="titleOfAnalitycsBox">
                <p>Tasa de conversion</p>
                <div className="pictureOfContainerDashboard">
                  <img src="/target.png" alt="target" />
                </div>
              </div>
              <div>
                <span className="dataOfAnalitycs">{data.conversionRate}%</span>
              </div>
            </div>

            {/* CUARTO CUADRADO */}
            <div className="analyticsCard">
              <div className="titleOfAnalitycsBox">
                <p>Pedidos totales</p>
                <div className="pictureOfContainerDashboard">
                  <img src="/package.png" alt="package" />
                </div>
              </div>
              <div>
                <span className="dataOfAnalitycs">{totalOrders}</span>
              </div>
              <div>
                <p className="subtitleCard">Total pedidos en 5 dias</p>
              </div>
            </div>
          </div>

          {/* CUADRO PRINCIPAL GRAFICA */}
          <div className="graphicContainer">
            <div className="chartPlaceholder">
              <SalesChart></SalesChart>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
