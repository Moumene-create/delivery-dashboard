import React from 'react';
import { StatCard, ChartCard } from '../ui';
import { PieChart, BarChart, DistributionChart, CountryDelivery, WillayasChart } from '../charts';

function DashboardPage({ styles }) {
  const originData = [25, 20, 15, 20, 20];
  const originColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'];

  const destinationData = [30, 15, 25, 10, 20];
  const destinationColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'];

  return (
    <div>
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <StatCard
          title="number of received packages today"
          value="1,465"
          style={styles.statCard}
        />
        <StatCard
          title="number of packages in transit today"
          value="4,265"
          style={styles.statCard}
        />
        <StatCard
          title="number of delivered packages today"
          value="648"
          style={styles.statCard}
        />
        <StatCard
          title="number of failed packages today"
          value="423"
          style={styles.statCard}
        />
      </div>

      {/* Charts Row 1 */}
      <div style={styles.chartsGrid}>
        <ChartCard title="packages origin" styles={styles}>
          <PieChart styles={styles} data={originData} colors={originColors} title="Origin Breakdown" />
        </ChartCard>
        <ChartCard title="packages destination" styles={styles}>
          <PieChart styles={styles} showGlobe data={destinationData} colors={destinationColors} title="Destination Breakdown" />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div style={styles.chartsGrid}>
        <ChartCard title="bar chart of the failed / delivered" styles={styles}>
          <BarChart styles={styles} />
        </ChartCard>
        <ChartCard title="distribution of the number of delivery" styles={styles}>
          <DistributionChart styles={styles} />
        </ChartCard>
      </div>

      {/* Charts Row 3 */}
      <div style={styles.chartsGrid3}>
        <ChartCard title="Delivery Success Rate Over Time" styles={styles}>
          <div style={styles.successChart}></div>
        </ChartCard>
      </div>

      {/* New row for smaller blocks side by side */}
      <div style={styles.chartsGridSmall}>
        <ChartCard title="Fastest country to deliver" styles={styles}>
          <CountryDelivery styles={styles} />
        </ChartCard>

        <ChartCard title="Top willayas to deliver to" styles={styles}>
          <WillayasChart styles={styles} />
        </ChartCard>
      </div>
    </div>
  );
}

export default DashboardPage;
