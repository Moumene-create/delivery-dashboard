import React from 'react';

function Sidebar({ sidebarOpen, activeTab, anomaliesExpanded, setAnomaliesExpanded, showPage, styles }) {
  if (!sidebarOpen) return null;

  return (
    <>
      <h2 style={styles.sidebarTitle}>Menu</h2>
      <nav>
        <button
          style={activeTab === 'dashboard' ? styles.menuItemActive : styles.menuItem}
          onClick={() => showPage('dashboard')}
          onMouseEnter={(e) => {
            if (activeTab !== 'dashboard') {
              e.target.style.backgroundColor = '#197cdfff';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'dashboard') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          Dashboard
        </button>

        <button
          style={activeTab === 'anomalies' ? styles.menuItemActive : styles.menuItem}
          onClick={() => {
            setAnomaliesExpanded(!anomaliesExpanded);
            showPage('anomalies');
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'anomalies') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'anomalies') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{
            display: 'inline-block',
            marginRight: '8px',
            transition: 'transform 0.3s ease',
            transform: anomaliesExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
          }}>
            ▶
          </span>
          Anomalies
        </button>

        {anomaliesExpanded && (
          <div style={styles.submenu}>
            <button
              style={activeTab === 'delivery' ? styles.menuItemActive : styles.menuItem}
              onClick={() => showPage('delivery')}
              onMouseEnter={(e) => {
                if (activeTab !== 'delivery') {
                  e.target.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'delivery') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Delivery
            </button>
            <button
              style={activeTab === 'more15days' ? styles.menuItemActive : styles.menuItem}
              onClick={() => showPage('more15days')}
              onMouseEnter={(e) => {
                if (activeTab !== 'more15days') {
                  e.target.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'more15days') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              more than 15 days
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Sidebar;
