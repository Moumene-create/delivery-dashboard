import React from 'react';
import { StatCard, ChartCard } from '../ui';
import { FourEventsBarChart, FourEventsPieChart } from '../charts';

function DeliveryPage({ styles }) {
  return (
    <div>
      <div style={styles.statsGrid}>
        <StatCard
          title="number of delivered packages today"
          value="1,465"
          style={styles.statCardBlue800}
        />
        <StatCard
          title="number of failed packages today"
          value="4,265"
          style={styles.statCardBlue700}
        />
        <StatCard
          title="number of fail-to-delivered packages today"
          value="648"
          style={styles.statCard}
        />
        <StatCard
          title="number of negative fail-to-delivered packages today"
          value="423"
          style={styles.statCardCyan}
        />
      </div>

      <div style={styles.chartsGrid}>
        <ChartCard title="bar chart of the four events" styles={styles}>
          <FourEventsBarChart styles={styles} />
        </ChartCard>
        <ChartCard title="percentage of the four events" styles={styles}>
          <FourEventsPieChart styles={styles} />
        </ChartCard>
      </div>
    </div>
  );
}

export default DeliveryPage;
