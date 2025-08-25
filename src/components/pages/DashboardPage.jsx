import React, { useState } from 'react';
import { StatCards, ChartCard, Top10List } from '../ui';
import { PieChart, BarChart, LineChart, WillayasChart } from '../charts';
import { stats } from '../constants'

function DashboardPage({ styles }) {
  // State to manage which stat card is selected
  const [selectedCard, setSelectedCard] = useState(null);

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

  const topCitiesData = [
    { name: "Algiers", visits: 1250 },
    { name: "Oran", visits: 980 },
    { name: "Constantine", visits: 750 },
    { name: "Annaba", visits: 620 },
    { name: "Blida", visits: 580 },
    { name: "Batna", visits: 520 },
    { name: "Djelfa", visits: 480 },
    { name: "Sétif", visits: 450 },
    { name: "Sidi Bel Abbès", visits: 420 },
    { name: "Biskra", visits: 380 },
    { name: "Tébessa", visits: 350 },
    { name: "Tlemcen", visits: 320 }
  ];



  // Handle card clicks
  const handleCardClick = (selectedStat, selectedIndex) => {
    setSelectedCard(selectedIndex); // <-- This updates the selected card!
  };

  const pieColors = ['#2e75e7ff', '#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'];

  return (
    <div>
      <StatCards
        stats={stats}
        onCardClick={handleCardClick}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />

      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginBottom: "10px"
      }}>
        {/* Main LineChart block (left) */}
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
            title="Evolution Mensuelle du taux de livraison"
            showLabels={true} />
        </div>

        {/* Selected stat chart block (right) */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '19px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1.5,
          height: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {selectedCard !== null ? (
            <div style={{
              width: '150%',
              height: '150%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

              <div style={{ fontWeight: 'bold', marginBottom: '45px' }}>
                {stats[selectedCard].title}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000ff', marginBottom: '10px' }}>
                Evolution mensuelle : {stats[selectedCard].title}
              </div>


              {/* Make the chart fill the available space */}
              <div style={{
                flex: 1,
                width: '100%',
                display: 'flex'
              }}>
                <LineChart
                  data={stats[selectedCard].chartData}
                  title=""
                  showLabels={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          ) : (
            <div style={{
              color: '#3a62e6ff',
              fontSize: '18px',
              textAlign: 'center',

            }}>
              Click on a stat card above to view its evolution chart
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginBottom: "20px",
        marginTop: "20px"
      }}>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Top10List
            title="willayas avec le meiller taux de livraisons"
            data={topCitiesData}
            labelKey="name"
            valueKey="visits"
            showNumbers={true}
            showValues={true}
          />
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '19px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1,
          height: '292px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BarChart data={defaultData} styles={styles} title="collis livrés" />

        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Top10List
            title="willayas avec le meiller taux de livraisons"
            data={topCitiesData}
            labelKey="name"
            valueKey="visits"
            showNumbers={true}
            showValues={true}
          />
        </div>
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
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e5',
          flex: 1.5,
          height: '290px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <PieChart
            styles={styles}
            data={pieData2}
            colors={pieColors}
            title="Device Usage"
            showLabels={true}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;