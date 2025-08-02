import React from 'react';

function PieChart({ styles, showGlobe = false, data = [], colors = [], title = "" }) {
  const defaultData = [25, 20, 15, 20, 20];
  const defaultColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'];

  let gradientStops = '';
  let currentDegree = 0;
  const effectiveData = data.length > 0 ? data : defaultData;
  const effectiveColors = colors.length > 0 ? colors : defaultColors;

  effectiveData.forEach((percentage, index) => {
    const startDegree = currentDegree;
    const endDegree = currentDegree + (percentage / 100) * 360;
    gradientStops += `${effectiveColors[index]} ${startDegree}deg ${endDegree}deg${index < effectiveData.length - 1 ? ', ' : ''}`;
    currentDegree = endDegree;
  });

  const pieStyle = {
    ...styles.pieCircle,
    background: `conic-gradient(${gradientStops})`,
  };

  return (
    <div style={styles.pieChart}>
      <div style={pieStyle}>
        <div style={styles.pieInner}></div>
        {showGlobe && <span style={{ position: 'absolute', fontSize: '30px' }}>🌍</span>}
      </div>

      <div style={styles.pieLegend}>
        {effectiveData.map((percentage, index) => (
          <div key={index} style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: effectiveColors[index] }}></div>
            <span>{showGlobe ? ['USA', 'France', 'Germany', 'China', 'Japan'][index] : `Category ${index + 1}`} ({percentage}%)  </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
