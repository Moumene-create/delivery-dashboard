import React from 'react';
import { StatCard, ChartCard } from '../ui';
import { PieChart, BarChart, LineChart, WillayasChart } from '../charts';

function DashboardPage({ styles }) {
  const originData = [25, 20, 15, 20, 20];
  const originColors = ['#000000ff', '#171720ff', '#29292bff', '#353838ff', '#5c5f5fff'];

  const destinationData = [30, 15, 25, 10, 20];
  const destinationColors = ['#000000ff', '#171720ff', '#29292bff', '#353838ff', '#5c5f5fff'];
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 100 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 1500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 700 },
    { name: 'Aug', value: 600 },
    { name: 'Sep', value: 800 },
    { name: 'Oct', value: 500 },
    { name: 'Nov', value: 700 },
    { name: 'Dec', value: 600 }


  ];

  const pieData2 = [
    { name: 'Maroco', value: 5 },
    { name: 'Tunisia', value: 10 },
    { name: 'France', value: 20 },
    { name: 'U.A', value: 25 },
    { name: 'Chine', value: 40 },

  ];

  const defaultData = [
    { day: 'Mon', delivered: 60, failed: 30 },
    { day: 'Tue', delivered: 80, failed: 20 },
    { day: 'Wed', delivered: 70, failed: 25 },
    { day: 'Thu', delivered: 90, failed: 35 },
    { day: 'Fri', delivered: 75, failed: 15 },
    { day: 'Sat', delivered: 65, failed: 25 }
  ];

  const pieColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'];
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
        <StatCard
          title="number of received packages today"
          value="1,465"
          style={styles.statCard}
        />
        <StatCard
          title="number of received packages today"
          value="1,465"
          style={styles.statCard}
        />

      </div>


      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginBottom: "10px"
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '19px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1.5,
          height: '260px',
          display: 'flex',


        }}>

          <LineChart

            data={chartData}
            title="Evolution Mensuelle"
            showLabels={true} />
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '19px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1,
          height: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BarChart data={defaultData} styles={styles} title="collis livrés" />
        </div>



      </div>


      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginBottom: "50px",
        marginTop: "20px"
      }}>


        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 0.5,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          /*<h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '0 0 15px 0',
            color: '#333',
            paddingBottom: '-5px',
            marginTop: '-50px'
          }}>
            Top 5 Origin Locations
          </h3>*/
          <PieChart
            styles={styles}
            data={pieData2}
            colors={pieColors}
            title="Device Usage"
            showLabels={true}
          />
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 2,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 2,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        </div>
      </div>


    </div>
  );
}

export default DashboardPage;
