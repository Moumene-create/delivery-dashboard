import React from 'react';

function BarChart({ styles }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const delivered = [60, 80, 70, 90, 75, 65];
  const failed = [30, 20, 25, 35, 15, 25];

  const maxValue = 100;
  const yAxisValues = [0, 25, 50, 75];

  return (
    <div>
      <div style={styles.barChartContainer}>
        {/* Y-axis line */}
        <div style={styles.yAxisLine}></div>

        {/* X-axis line */}
        <div style={styles.xAxisLine}></div>

        {/* Horizontal grid lines (dotted) */}
        {yAxisValues.slice(1).map((value) => (
          <div key={value} style={{
            ...styles.gridLine,
            bottom: `${30 + (value / maxValue) * 200}px`
          }}></div>
        ))}

        {/* Y-axis labels */}
        {yAxisValues.map((value) => (
          <div key={value} style={{
            ...styles.yAxisLabel,
            bottom: `${25 + (value / maxValue) * 200}px`
          }}>
            {value}
          </div>
        ))}

        {/* Bars */}
        <div style={{
          ...styles.barChart,
          position: 'absolute',
          bottom: '32px',
          left: '42px',
          right: '0',
        }}>
          {days.map((day, i) => (
            <div key={day} style={styles.barGroup}>
              <div style={styles.barContainer}>
                <div
                  style={{
                    ...styles.bar,
                    backgroundColor: '#3b82f6',
                    height: `${(delivered[i] / maxValue) * 200}px`
                  }}
                ></div>
                <div
                  style={{
                    ...styles.bar,
                    backgroundColor: '#6366f1',
                    height: `${(failed[i] / maxValue) * 200}px`
                  }}
                ></div>
              </div>
              <div style={{
                ...styles.barLabel,
                position: 'absolute',
                bottom: '10px'
              }}>{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend stays the same */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#3b82f6' }}></div>
          <span>delivered</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#6366f1' }}></div>
          <span>failed</span>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
