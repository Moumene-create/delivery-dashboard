import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const showPage = (page) => {
    setActiveTab(page);
  };

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'delivery': 'Delivery',
      'more15days': 'More than 15 days',
      'anomalies': 'Anomalies'
    };
    return titles[activeTab];
  };

  const styles = {
    dashboard: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc'
    },
    sidebar: {
      width: '250px',
      background: 'white',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      padding: '20px'
    },
    sidebarTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#000000ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    menuItem: {
      width: '100%',
      padding: '10px 15px',
      marginBottom: '5px',
      background: 'none',
      border: 'none',
      borderRadius: '8px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    menuItemActive: {
      width: '100%',
      padding: '10px 15px',
      marginBottom: '5px',
      background: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    submenu: {
      marginLeft: '20px'
    },
    mainContent: {
      flex: 1,
      overflow: 'auto'
    },
    header: {
      background: 'white',
      padding: '20px 30px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    headerRight: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    searchBox: {
      padding: '8px 15px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      width: '250px',
      color: '#ffffffff',
    },
    downloadBtn: {
      background: '#000',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    content: {
      padding: '30px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      color: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',

    },
    statCardBlue800: {
      background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
      color: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)'
    },
    statCardBlue700: {
      background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
      color: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(29, 78, 216, 0.3)'
    },
    statCardCyan: {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
    },
    statTitle: {
      fontSize: '100px',
      opacity: 0.9,
      marginBottom: '10px'

    },
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    chartsGrid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    chartCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    chartTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '0px',
      marginTop: '-10px',
      textAlign: 'center',    // ← Change 'center' to 'textAlign'
      color: '#374151',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    // Fixed pie chart container
    pieChart: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: '20px',
      width: '100%',
      height: '250px',
      padding: '10px',
      boxSizing: 'border-box',
      marginBottom: '-30px',
      marginTop: '-30px',
    },
    pieCircle: {
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      background: 'conic-gradient(#3b82f6 0deg 144deg, #6366f1 144deg 216deg, #8b5cf6 216deg 288deg, #06b6d4 288deg 324deg, #0891b2 324deg 360deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      flexShrink: 0,
    },
    pieInner: {
      width: '70px',
      height: '70px',
      background: 'white',
      borderRadius: '50%',
      position: 'absolute'
    },
    pieLegend: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flexShrink: 0,
      maxWidth: '200px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      color: '#374151',
    },
    legendColor: {
      width: '16px',
      height: '16px',
      borderRadius: '3px',
      flexShrink: 0,
    },
    barChart: {
      display: 'flex',
      alignItems: 'end',
      height: '200px',
      gap: '10px',
      marginBottom: '-20px',
      marginLeft: '-10px'
    },
    barGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%'
    },
    barContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '80%',
      justifyContent: 'end',
      gap: '2px'
    },
    bar: {
      width: '20px',
      borderRadius: '2px',
      transition: 'all 0.3s'
    },
    barLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '100px',
      bottom: '25px'
    },
    legend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    distributionChart: {
      height: '150px',
      background: 'linear-gradient(to right, transparent 0%, #3b82f6 50%, transparent 100%)',
      borderRadius: '10px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    distributionStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      fontSize: '14px'
    },
    successChart: {
      height: '150px',
      background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
      borderRadius: '10px',
      position: 'relative',
      overflow: 'hidden'
    },
    countrySection: {
      marginBottom: '20px'
    },
    countryBoxes: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px'
    },
    countryBoxLight: {
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '500',
      background: '#e5e7eb',
      color: '#374151'
    },
    countryBoxDark: {
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '500',
      background: '#6b7280',
      color: 'white'
    },

    horizontalBars: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    horizontalBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    barLabelLeft: {
      width: '120px',
      textAlign: 'right',
      fontSize: '14px'
    },
    barTrack: {
      flex: 1,
      height: '16px',
      background: '#e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    barFill: {
      height: '100%',
      background: '#3b82f6',
      borderRadius: '8px',
      transition: 'width 0.5s ease'
    },
    barChartContainer: {
      position: 'relative',
      width: '89%',
      height: '250px',
      paddingLeft: '40px',
      paddingBottom: '30px'
    },
    xAxisLine: {
      position: 'absolute',
      bottom: '30px',
      left: '40px',
      right: '0',
      height: '2px',
      background: '#374151',
      marginBottom: '20px',
      marginLeft: '-20px',
    },
    gridLine: {
      position: 'absolute',
      left: '40px',
      right: '0',
      height: '0px',
      background: '#e5e7eb',
      borderTop: '1px dotted #9ca3af',
      marginLeft: '-2000px',
      marginBottom: '20px',
    },
    yAxisLabel: {
      position: 'absolute',
      left: '0',
      fontSize: '12px',
      color: '#6b7280',
      transform: 'translateY(-50%)',
      marginLeft: '-10px',
      marginBottom: '10px',
    }
  };

  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Menu</h2>
        <nav>
          <button
            style={activeTab === 'dashboard' ? styles.menuItemActive : styles.menuItem}
            onClick={() => showPage('dashboard')}
            onMouseEnter={(e) => {
              if (activeTab !== 'dashboard') {
                e.target.style.backgroundColor = '#f1f5f9';
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
            onClick={() => showPage('anomalies')}
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
            Anomalies
          </button>
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
            <div style={styles.submenu}>
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
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>{getPageTitle()}</h1>
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

        {/* Content */}
        <div style={styles.content}>
          {activeTab === 'dashboard' && <DashboardPage styles={styles} />}
          {activeTab === 'delivery' && <DeliveryPage styles={styles} />}
          {activeTab === 'more15days' && <More15DaysPage styles={styles} />}
          {activeTab === 'anomalies' && <AnomaliesPage styles={styles} />}
        </div>
      </div>
    </div>
  )
}

// Dashboard Page Component
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

        <ChartCard title="Fastest country to deliver" styles={styles}>
          <CountryDelivery styles={styles} />
        </ChartCard>

        <ChartCard title="Top willayas to deliver to" styles={styles}>
          <WillayasChart styles={styles} />
        </ChartCard>
      </div>
    </div>
  )
}

// Delivery Page Component
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
  )
}

// Other Pages
function More15DaysPage({ styles }) {
  return (
    <div style={styles.chartCard}>
      <h2 style={styles.chartTitle}>More than 15 days</h2>
      <p style={{ color: '#6b7280' }}>Content coming soon...</p>
    </div>
  )
}

function AnomaliesPage({ styles }) {
  return (
    <div style={styles.chartCard}>
      <h2 style={styles.chartTitle}>Anomalies</h2>
      <p style={{ color: '#6b7280' }}>Content coming soon...</p>
    </div>
  )
}

// Reusable Components
function StatCard({ title, value, style }) {
  return (
    <div style={style}>
      <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '10px' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{value}</div>
    </div>
  )
}

function ChartCard({ title, children, styles }) {
  return (
    <div style={styles.chartCard}>
      <h3 style={styles.chartTitle}>{title}</h3>
      {children}
    </div>
  )
}

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

function BarChart({ styles }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const delivered = [60, 80, 70, 90, 75, 65];
  const failed = [30, 20, 25, 35, 15, 25];

  const maxValue = 100;
  const yAxisValues = [0, 25, 50, 75, 100];

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
          right: '0'
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
  )
}
function DistributionChart({ styles }) {
  return (
    <div>
      <div style={styles.distributionChart}></div>
      <div style={styles.distributionStats}>
        <div>
          <div><strong>mean:</strong> 15</div>
          <div><strong>max:</strong> 93</div>
        </div>
        <div>
          <div><strong>mode:</strong> 20</div>
          <div><strong>min:</strong> 1</div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div><strong>median:</strong> 18</div>
        </div>
      </div>
    </div>
  )
}

function CountryDelivery({ styles }) {
  return (
    <div>
      <div style={styles.countrySection}>
        <div style={{ fontWeight: '600', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>to</span>
          <span>from</span>
        </div>
        <div style={styles.countryBoxes}>
          <div style={styles.countryBoxLight}>UA</div>
          <div style={styles.countryBoxDark}>US</div>
        </div>
      </div>
      <div style={styles.countrySection}>
        <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>slowest country to deliver</h4>
        <div style={{ fontWeight: '600', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>to</span>
          <span>from</span>
        </div>
        <div style={styles.countryBoxes}>
          <div style={styles.countryBoxLight}>FR</div>
          <div style={styles.countryBoxDark}>CN</div>
        </div>
      </div>
    </div>
  )
}

function WillayasChart({ styles }) {
  const willayas = [
    { name: 'Alger', percentage: 95 },
    { name: 'Annaba', percentage: 88 },
    { name: 'Setif', percentage: 75 },
    { name: 'Jijel', percentage: 70 },
    { name: 'Tipaza', percentage: 65 }
  ];

  return (
    <div style={styles.horizontalBars}>
      {willayas.map((willaya) => (
        <div key={willaya.name} style={styles.horizontalBar}>
          <div style={styles.barLabelLeft}>{willaya.name}</div>
          <div style={styles.barTrack}>
            <div
              style={{
                ...styles.barFill,
                width: `${willaya.percentage}%`
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FourEventsBarChart({ styles }) {
  return (
    <div style={styles.barChart}>
      <div style={styles.barGroup}>
        <div style={styles.barContainer}>
          <div style={{ ...styles.bar, backgroundColor: '#3b82f6', height: '60px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#6366f1', height: '40px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#06b6d4', height: '30px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#0891b2', height: '20px' }}></div>
        </div>
        <div style={styles.barLabel}>Mon</div>
      </div>
      <div style={styles.barGroup}>
        <div style={styles.barContainer}>
          <div style={{ ...styles.bar, backgroundColor: '#3b82f6', height: '80px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#6366f1', height: '30px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#06b6d4', height: '25px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#0891b2', height: '15px' }}></div>
        </div>
        <div style={styles.barLabel}>Tue</div>
      </div>
      <div style={styles.barGroup}>
        <div style={styles.barContainer}>
          <div style={{ ...styles.bar, backgroundColor: '#3b82f6', height: '70px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#6366f1', height: '35px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#06b6d4', height: '40px' }}></div>
          <div style={{ ...styles.bar, backgroundColor: '#0891b2', height: '25px' }}></div>
        </div>
        <div style={styles.barLabel}>Wed</div>
      </div>
    </div>
  )
}

function FourEventsPieChart({ styles }) {
  const pieStyle = {
    ...styles.pieCircle,
    background: 'conic-gradient(#1e40af 0deg 120deg, #3b82f6 120deg 200deg, #06b6d4 200deg 280deg, #0891b2 280deg 360deg)'
  };

  return (
    <div style={styles.pieChart}>
      <div style={pieStyle}>
        <div style={styles.pieInner}></div>
      </div>
      <div style={styles.pieLegend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#1e40af' }}></div>
          <span>delivered</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#3b82f6' }}></div>
          <span>failed</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#06b6d4' }}></div>
          <span>fail-to-delivered</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#0891b2' }}></div>
          <span>negative fail-to-delivered</span>
        </div>
      </div>
    </div>
  )
}

export default App