import { useState } from 'react';
import { dashboardStyles } from './styles/dashboardStyles';
import { Sidebar, Header, DashboardPage, AlgeriaMapPage } from './components';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anomaliesExpanded, setAnomaliesExpanded] = useState(false);

  const showPage = (page) => {
    setActiveTab(page);
  };


  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'delivery': 'Delivery',
      'more15days': 'More than 15 days',
      'anomalies': 'Anomalies',
      'algeriamap': 'Algeria Map'
    };
    return titles[activeTab];
  };

  const sidebarStyle = {
    ...dashboardStyles.sidebar,
    ...(sidebarOpen ? {} : dashboardStyles.sidebarCollapsed)
  };

  return (
    <div style={dashboardStyles.dashboard}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          anomaliesExpanded={anomaliesExpanded}
          setAnomaliesExpanded={setAnomaliesExpanded}
          showPage={showPage}
          styles={dashboardStyles}
        />
      </div>

      {/* Main Content */}
      <div style={dashboardStyles.mainContent}>
        {/* Header */}
        <Header
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          getPageTitle={getPageTitle}
          styles={dashboardStyles}
        />

        {/* Content */}
        <div style={dashboardStyles.content}>
          {activeTab === 'dashboard' && <DashboardPage styles={dashboardStyles} />}

          {activeTab === 'algeriamap' && <AlgeriaMapPage styles={dashboardStyles} />}
        </div>
      </div>
    </div>
  );
}
export default App;