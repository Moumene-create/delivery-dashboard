import React from 'react';

const logoUrl = "/poste-algerie-seeklogo.svg";
function Sidebar({ sidebarOpen, activeTab, anomaliesExpanded, setAnomaliesExpanded, showPage, styles }) {
  if (!sidebarOpen) return null;

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center", // horizontal center
        alignItems: "center",     // vertical center
        height: "60px",
        marginBottom: '20px'     // adjust to your sidebar header height
      }}>
        <img src={logoUrl} alt="Menu" style={{ width: 60, height: 60 }} />
      </div>
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
          style={activeTab === 'algeriamap' ? styles.menuItemActive : styles.menuItem}
          onClick={() => showPage('algeriamap')}
          onMouseEnter={(e) => {
            if (activeTab !== 'algeriamap') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'algeriamap') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          Algeria Map
        </button>



      </nav>
    </>
  );
}

export default Sidebar;
