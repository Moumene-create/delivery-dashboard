import React from 'react';

function Header({ setSidebarOpen, sidebarOpen, getPageTitle, styles }) {
  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          style={styles.hamburgerBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 style={styles.headerTitle}>{getPageTitle()}</h1>
      </div>
      <div style={styles.headerRight}>
        <input
          type="text"
          style={styles.searchBox}
          placeholder="Search..."
        />
        <button style={styles.downloadBtn}>
          Download
        </button>
      </div>
    </div>
  );
}

export default Header;
