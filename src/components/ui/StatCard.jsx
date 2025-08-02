import React from 'react';

function StatCard({ title, value, style }) {
  return (
    <div style={style}>
      <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '10px' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}

export default StatCard;
