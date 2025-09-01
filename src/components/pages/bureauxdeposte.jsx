import { useState } from 'react';
import { StatCards } from '../ui';
import { LineChart } from '../charts';
import { useEffect } from 'react';

const getstates = async (path) => {
    const response = await fetch(path);
    const data = await response.json();
    const kpi1 = data.donnees.kpi1;
    const kpi2 = data.donnees.kpi2;
    const kpi3 = data.donnees.kpi3;

    const mapping = {
        "Nombre de dépêches pré-arrivées": "data1",
        "Nombre denvois livrés": "data2",
        "Nombre denvois livrés dès la première tentative (1 échec)": "data3",
        "Nombre denvois non livrés": "data4",
        "Taux de livraison": "data5",
        "Taux de livraison dans les délais": "data6",
        "Nombre denvois en dépassement du délai de garde": "data7",
        "Nombre denvois bloqués en douane": "data8",
        "Nombre denvois retournés": "data9",
        "Délai de concentration": "data10",
        "Délai dacheminement des envois de bout en bout": "data11",
        "Délai de concentration des envois": "data12",
        "Nombre denvois non scannés": "data13"
    };

    const color = "#2e75e7ff";

    const stats = [];

    for (const [title, datakey] of Object.entries(mapping)) {
        const value = kpi1[title];
        const chartData = kpi1[datakey] || [];
        stats.push({
            title,
            value,
            color,
            chartData
        });
    }
    for (const [title, datakey] of Object.entries(mapping)) {
        const value = kpi2[title];
        const chartData = kpi2[datakey] || [];
        stats.push({
            title,
            value,
            color,
            chartData
        });
    }
    for (const [title, datakey] of Object.entries(mapping)) {
        const value = kpi3[title];
        const chartData = kpi3[datakey] || [];
        stats.push({
            title,
            value,
            color,
            chartData
        });
    }
    return stats;
}

const Bureauxdeposte = ({ postOfficesData }) => {
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getstates("/post_offices_data.json");
            setStats(data);
        };
        fetchData();
    }, []);

    console.log(stats);
    // Sample data for testing - replace with your actual JSON data
    const sampleData = postOfficesData || [
        {
            id: 1,
            name: "CTNI",
            location: "Centre de Tri National International",
            stats: [
                {
                    title: "Colis traités",
                    value: 15420,
                    color: '#10b981',
                    chartData: [
                        { month: 'Jan', value: 14200 },
                        { month: 'Fév', value: 14800 },
                        { month: 'Mar', value: 15100 },
                        { month: 'Avr', value: 15200 },
                        { month: 'Mai', value: 15300 },
                        { month: 'Jun', value: 15420 }
                    ]
                },
                {
                    title: "Taux de tri",
                    value: "96%",
                    color: '#3b82f6',
                    chartData: [
                        { month: 'Jan', value: 94 },
                        { month: 'Fév', value: 95 },
                        { month: 'Mar', value: 95 },
                        { month: 'Avr', value: 96 },
                        { month: 'Mai', value: 96 },
                        { month: 'Jun', value: 96 }
                    ]
                },
                {
                    title: "Personnel actif",
                    value: 145,
                    color: '#f59e0b',
                    chartData: [
                        { month: 'Jan', value: 140 },
                        { month: 'Fév', value: 142 },
                        { month: 'Mar', value: 143 },
                        { month: 'Avr', value: 144 },
                        { month: 'Mai', value: 145 },
                        { month: 'Jun', value: 145 }
                    ]
                },
                {
                    title: "Temps moyen tri",
                    value: "2.5 h",
                    color: '#ef4444',
                    chartData: [
                        { month: 'Jan', value: 3.2 },
                        { month: 'Fév', value: 3.0 },
                        { month: 'Mar', value: 2.8 },
                        { month: 'Avr', value: 2.7 },
                        { month: 'Mai', value: 2.6 },
                        { month: 'Jun', value: 2.5 }
                    ]
                },
                {
                    title: "Revenus (DA)",
                    value: 8500000,
                    color: '#8b5cf6',
                    chartData: [
                        { month: 'Jan', value: 8000000 },
                        { month: 'Fév', value: 8200000 },
                        { month: 'Mar', value: 8300000 },
                        { month: 'Avr', value: 8400000 },
                        { month: 'Mai', value: 8450000 },
                        { month: 'Jun', value: 8500000 }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "CPX",
            location: "Centre Postal d'Échange",
            stats: [
                {
                    title: "Colis échangés",
                    value: 8750,
                    color: '#10b981',
                    chartData: [
                        { month: 'Jan', value: 8200 },
                        { month: 'Fév', value: 8400 },
                        { month: 'Mar', value: 8600 },
                        { month: 'Avr', value: 8650 },
                        { month: 'Mai', value: 8700 },
                        { month: 'Jun', value: 8750 }
                    ]
                },
                {
                    title: "Taux d'échange",
                    value: "92%",
                    color: '#3b82f6',
                    chartData: [
                        { month: 'Jan', value: 89 },
                        { month: 'Fév', value: 90 },
                        { month: 'Mar', value: 91 },
                        { month: 'Avr', value: 91 },
                        { month: 'Mai', value: 92 },
                        { month: 'Jun', value: 92 }
                    ]
                },
                {
                    title: "Partenaires actifs",
                    value: 28,
                    color: '#f59e0b',
                    chartData: [
                        { month: 'Jan', value: 25 },
                        { month: 'Fév', value: 26 },
                        { month: 'Mar', value: 27 },
                        { month: 'Avr', value: 27 },
                        { month: 'Mai', value: 28 },
                        { month: 'Jun', value: 28 }
                    ]
                },
                {
                    title: "Délai moyen",
                    value: "4.2 h",
                    color: '#ef4444',
                    chartData: [
                        { month: 'Jan', value: 5.1 },
                        { month: 'Fév', value: 4.8 },
                        { month: 'Mar', value: 4.6 },
                        { month: 'Avr', value: 4.4 },
                        { month: 'Mai', value: 4.3 },
                        { month: 'Jun', value: 4.2 }
                    ]
                },
                {
                    title: "Revenus (DA)",
                    value: 6200000,
                    color: '#8b5cf6',
                    chartData: [
                        { month: 'Jan', value: 5800000 },
                        { month: 'Fév', value: 5900000 },
                        { month: 'Mar', value: 6000000 },
                        { month: 'Avr', value: 6100000 },
                        { month: 'Mai', value: 6150000 },
                        { month: 'Jun', value: 6200000 }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Centre Aero Postal",
            location: "Centre Aéroportuaire",
            stats: [
                {
                    title: "Colis aériens",
                    value: 3250,
                    color: '#10b981',
                    chartData: [
                        { month: 'Jan', value: 2800 },
                        { month: 'Fév', value: 2950 },
                        { month: 'Mar', value: 3100 },
                        { month: 'Avr', value: 3150 },
                        { month: 'Mai', value: 3200 },
                        { month: 'Jun', value: 3250 }
                    ]
                },
                {
                    title: "Taux de livraison",
                    value: "89%",
                    color: '#3b82f6',
                    chartData: [
                        { month: 'Jan', value: 86 },
                        { month: 'Fév', value: 87 },
                        { month: 'Mar', value: 88 },
                        { month: 'Avr', value: 88 },
                        { month: 'Mai', value: 89 },
                        { month: 'Jun', value: 89 }
                    ]
                },
                {
                    title: "Vols traités",
                    value: 156,
                    color: '#f59e0b',
                    chartData: [
                        { month: 'Jan', value: 142 },
                        { month: 'Fév', value: 148 },
                        { month: 'Mar', value: 152 },
                        { month: 'Avr', value: 154 },
                        { month: 'Mai', value: 155 },
                        { month: 'Jun', value: 156 }
                    ]
                },
                {
                    title: "Délai aérien",
                    value: "1.8 j",
                    color: '#ef4444',
                    chartData: [
                        { month: 'Jan', value: 2.5 },
                        { month: 'Fév', value: 2.3 },
                        { month: 'Mar', value: 2.1 },
                        { month: 'Avr', value: 2.0 },
                        { month: 'Mai', value: 1.9 },
                        { month: 'Jun', value: 1.8 }
                    ]
                },
                {
                    title: "Revenus (DA)",
                    value: 4100000,
                    color: '#8b5cf6',
                    chartData: [
                        { month: 'Jan', value: 3600000 },
                        { month: 'Fév', value: 3750000 },
                        { month: 'Mar', value: 3900000 },
                        { month: 'Avr', value: 3950000 },
                        { month: 'Mai', value: 4000000 },
                        { month: 'Jun', value: 4100000 }
                    ]
                }
            ]
        }
    ];

    const handleOfficeSelect = (office) => {
        setSelectedOffice(office);
        setSelectedCard(null); // Reset selected card when changing office
    };

    const handleCardClick = (stat, index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#1e293b',
                    marginBottom: '10px'
                }}>
                    Tableau de Bord des Bureaux de Poste
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: '#64748b'
                }}>
                    Sélectionnez un bureau pour voir ses indicateurs de performance
                </p>
            </div>

            {/* Office Selection Buttons */}
            <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                {/* CTNI */}
                <button
                    onClick={() => handleOfficeSelect(sampleData?.find(office => office.name === 'CTNI'))}
                    style={{
                        padding: '15px 25px',
                        borderRadius: '10px',
                        border: selectedOffice?.name === 'CTNI' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                        backgroundColor: selectedOffice?.name === 'CTNI' ? '#3b82f6' : 'white',
                        color: selectedOffice?.name === 'CTNI' ? 'white' : '#1e293b',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOffice?.name === 'CTNI' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '200px',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                        if (selectedOffice?.name !== 'CTNI') {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedOffice?.name !== 'CTNI') {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }
                    }}
                >
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>CTNI</div>
                    <div style={{
                        fontSize: '14px',
                        opacity: selectedOffice?.name === 'CTNI' ? 0.9 : 0.7
                    }}>
                        Centre de Tri National International
                    </div>
                </button>



















                {/* CPX */}
                <button
                    onClick={() => handleOfficeSelect(sampleData?.find(office => office.name === 'CPX'))}
                    style={{
                        padding: '15px 25px',
                        borderRadius: '10px',
                        border: selectedOffice?.name === 'CPX' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                        backgroundColor: selectedOffice?.name === 'CPX' ? '#3b82f6' : 'white',
                        color: selectedOffice?.name === 'CPX' ? 'white' : '#1e293b',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOffice?.name === 'CPX' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '200px',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                        if (selectedOffice?.name !== 'CPX') {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedOffice?.name !== 'CPX') {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }
                    }}
                >
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>CPX</div>
                    <div style={{
                        fontSize: '14px',
                        opacity: selectedOffice?.name === 'CPX' ? 0.9 : 0.7
                    }}>
                        Centre Postal d'Échange
                    </div>
                </button>

                {/* Centre Aero Postal */}
                <button
                    onClick={() => handleOfficeSelect(sampleData?.find(office => office.name === 'Centre Aero Postal'))}
                    style={{
                        padding: '15px 25px',
                        borderRadius: '10px',
                        border: selectedOffice?.name === 'Centre Aero Postal' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                        backgroundColor: selectedOffice?.name === 'Centre Aero Postal' ? '#3b82f6' : 'white',
                        color: selectedOffice?.name === 'Centre Aero Postal' ? 'white' : '#1e293b',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOffice?.name === 'Centre Aero Postal' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '200px',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                        if (selectedOffice?.name !== 'Centre Aero Postal') {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedOffice?.name !== 'Centre Aero Postal') {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }
                    }}
                >
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Centre Aero Postal</div>
                    <div style={{
                        fontSize: '14px',
                        opacity: selectedOffice?.name === 'Centre Aero Postal' ? 0.9 : 0.7
                    }}>
                        Centre Aéroportuaire
                    </div>
                </button>
            </div>

            {/* Office Details */}
            {selectedOffice ? (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e5e5'
                }}>
                    {/* Office Info Header */}
                    <div style={{
                        marginBottom: '25px',
                        textAlign: 'center',
                        borderBottom: '2px solid #f1f5f9',
                        paddingBottom: '15px'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            marginBottom: '5px'
                        }}>
                            {selectedOffice.name}
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: '#64748b'
                        }}>
                            {selectedOffice.location}
                        </p>
                    </div>

                    {/* KPI Cards */}
                    <StatCards
                        stats={selectedOffice.stats}
                        onCardClick={handleCardClick}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                    />

                    {/* Charts Section */}
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "stretch",
                        marginBottom: "10px",
                        marginTop: "20px"
                    }}>
                        {/* Main LineChart block (left) */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '19px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e5e5',
                            flex: 1.5,
                            height: '250px',
                            display: 'flex',
                        }}>
                            <LineChart
                                data={selectedOffice.stats[1]?.chartData} // Default to delivery rate chart
                                title="Evolution Mensuelle du taux de livraison"
                                showLabels={true}
                            />
                        </div>

                        {/* Selected stat chart block (right) */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '19px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e5e5',
                            flex: 1.5,
                            height: '250px',
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
                                        {selectedOffice.stats[selectedCard].title}
                                    </div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: '#000000ff',
                                        marginBottom: '10px'
                                    }}>
                                        Evolution mensuelle : {selectedOffice.stats[selectedCard].title}
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        width: '100%',
                                        display: 'flex'
                                    }}>
                                        <LineChart
                                            data={selectedOffice.stats[selectedCard].chartData}
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
                                    Cliquez sur une carte KPI ci-dessus pour voir son graphique d'évolution
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // No office selected state
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '60px 25px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e5e5',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '20px'
                    }}>
                        📮
                    </div>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '10px'
                    }}>
                        Aucun bureau sélectionné
                    </h3>
                    <p style={{
                        fontSize: '16px',
                        color: '#64748b'
                    }}>
                        Veuillez sélectionner un bureau de poste ci-dessus pour voir ses indicateurs de performance
                    </p>
                </div>
            )}
        </div>
    );
};

export default Bureauxdeposte;