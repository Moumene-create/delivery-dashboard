import React, { useState, useCallback, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { AlertTriangle, CheckCircle } from "lucide-react";

import { PieChart, BarChart, LineChart } from '../charts';
import { Kpi } from '../ui';
import { wilayaNumbers, alarmDefinitions } from "../constants";

const geoUrl = "/algeria.json";

// Définitions des alarmes avec descriptions et actions

const defaultData = [
    { day: 'Mon', delivered: 60, failed: 30 },
    { day: 'Tue', delivered: 80, failed: 20 },
    { day: 'Wed', delivered: 70, failed: 25 },
    { day: 'Thu', delivered: 90, failed: 35 },
    { day: 'Fri', delivered: 75, failed: 15 },
    { day: 'Sat', delivered: 65, failed: 25 }
];

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

function AlgeriaMapPage({ styles }) {
    const [selectedWilaya, setSelectedWilaya] = useState(null);
    const [selectedWilayaData, setSelectedWilayaData] = useState(null);
    const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 600 });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [wilayasData, setWilayasData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const loadWilayasData = async () => {
            try {
                setLoading(true);
                const response = await fetch('./wilayadata.json');
                if (!response.ok) {
                    throw new Error('Failed to load wilayadata.json');
                }
                const data = await response.json();
                setWilayasData(data);
                console.log('Wilaya data loaded:', data);
            } catch (err) {
                console.error('Error loading wilaya data:', err);
                setError('Failed to load wilaya data');
            } finally {
                setLoading(false);
            }
        };

        loadWilayasData();
    }, []);

    const findWilayaData = (wilayaName) => {
        if (!wilayasData || !wilayasData.wilayas) {
            return null;
        }

        let foundWilaya = wilayasData.wilayas.find(w =>
            w.nom.toLowerCase() === wilayaName.toLowerCase()
        );

        if (!foundWilaya) {
            foundWilaya = wilayasData.wilayas.find(w =>
                w.nom.toLowerCase().includes(wilayaName.toLowerCase()) ||
                wilayaName.toLowerCase().includes(w.nom.toLowerCase())
            );
        }

        return foundWilaya || null;
    };

    const getWilayaName = (geo) => {
        return geo.properties.NAME_1
            || geo.properties.name
            || geo.properties.NAME
            || geo.properties.wilaya_name
            || "Unknown";
    };

    const getWilayaNumber = (geo) => {
        const wilayaName = getWilayaName(geo);
        return wilayaNumbers[wilayaName] || "??";
    };

    // Vérifier si la wilaya a des alarmes actives
    const hasActiveAlarms = (wilayaName) => {
        const wilayaData = findWilayaData(wilayaName);
        if (!wilayaData || !wilayaData.alerte) return false;

        return Object.values(wilayaData.alerte).some(value => value === 1);
    };

    // Obtenir les alarmes actives pour une wilaya
    const getActiveAlarms = (wilayaData) => {
        if (!wilayaData || !wilayaData.alerte) return [];

        return Object.entries(wilayaData.alerte)
            .filter(([key, value]) => value === 1)
            .map(([key]) => ({
                code: key,
                ...alarmDefinitions[key]
            }));
    };

    const getCentroid = (geo) => {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        const processCoordinates = (coords) => {
            coords.forEach(point => {
                if (Array.isArray(point[0])) {
                    processCoordinates(point);
                } else {
                    const [x, y] = point;
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            });
        };

        processCoordinates(geo.geometry.coordinates);
        return [(minX + maxX) / 2, (minY + maxY) / 2];
    };

    const updateMapDimensions = useCallback(() => {
        if (mapContainerRef.current) {
            const { offsetWidth, offsetHeight } = mapContainerRef.current;
            setMapDimensions({
                width: Math.max(offsetWidth, 400),
                height: Math.max(offsetHeight, 300)
            });
        }
    }, []);

    useEffect(() => {
        // Attendre que le composant soit monté avant de calculer les dimensions
        setTimeout(() => updateMapDimensions(), 100);

        const handleResize = () => updateMapDimensions();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebarOpen, updateMapDimensions]);

    const calculateScale = () => {
        const baseScale = 950;
        const aspectRatio = mapDimensions.width / mapDimensions.height;
        return aspectRatio > 1.5
            ? baseScale * (mapDimensions.height / 400)
            : baseScale * (mapDimensions.width / 600);
    };

    const handleWilayaClick = (geo) => {
        const wilayaName = getWilayaName(geo);
        const wilayaNumber = getWilayaNumber(geo);
        const fullWilayaName = `${wilayaNumber} - ${wilayaName}`;

        setSelectedWilaya(fullWilayaName);
        const wilayaData = findWilayaData(wilayaName);
        setSelectedWilayaData(wilayaData);
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="main-content">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        fontSize: '1.2rem',
                        color: '#666'
                    }}>
                        Loading wilaya data...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="main-content">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        fontSize: '1.2rem',
                        color: '#e74c3c'
                    }}>
                        Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    const activeAlarms = selectedWilayaData ? getActiveAlarms(selectedWilayaData) : [];

    return (
        <div className="app-container">
            <div className="main-content">
                <div style={{
                    width: '100%',
                    padding: sidebarOpen ? '15px' : '20px',
                    boxSizing: 'border-box',
                    fontFamily: 'Arial, sans-serif',
                    transition: 'all 0.3s ease'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: sidebarOpen ? '1.25fr 1fr' : '1.25fr 1fr',
                        gap: '20px',
                        marginBottom: '20px',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            {selectedWilaya && (
                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '15px 20px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    borderLeft: `4px solid ${activeAlarms.length > 0 ? '#ef4444' : '#e0f7fa'}`,
                                }}>
                                    <div style={{ fontSize: '1.5rem', opacity: 0.8 }}>
                                        {activeAlarms.length > 0 ? '⚠️' : '📍'}
                                    </div>
                                    <div style={{ color: '#2c3e50', fontSize: '1rem', flex: 1 }}>
                                        <strong style={{ color: '#3498db' }}>Selected:</strong> {selectedWilaya}
                                        {activeAlarms.length > 0 && (
                                            <div style={{
                                                color: '#ef4444',
                                                fontSize: '0.9rem',
                                                marginTop: '4px',
                                                fontWeight: '500'
                                            }}>
                                                {activeAlarms.length} alarme(s) active(s)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div
                                ref={mapContainerRef}
                                style={{
                                    height: '500px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'white',
                                    borderRadius: '15px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    width: '100%',
                                    flex: 1
                                }}
                            >
                                <ComposableMap
                                    projection="geoMercator"
                                    projectionConfig={{
                                        scale: calculateScale(),
                                        center: [2.5, 28]
                                    }}
                                    width={mapDimensions.width}
                                    height={mapDimensions.height}
                                >
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const wilayaNumber = getWilayaNumber(geo);
                                                const centroid = getCentroid(geo);
                                                const wilayaName = geo.properties.NAME_1 || geo.properties.name;
                                                const isSelected = selectedWilaya && selectedWilaya.includes(wilayaName);
                                                const hasAlarms = hasActiveAlarms(wilayaName);

                                                return (
                                                    <React.Fragment key={geo.rsmKey}>
                                                        <Geography
                                                            geography={geo}
                                                            onClick={() => handleWilayaClick(geo)}
                                                            style={{
                                                                default: {
                                                                    fill: hasAlarms ? "#148010ff" : "#148010ff",
                                                                    stroke: "#000000ff",
                                                                    strokeWidth: isSelected ? 1.5 : 0.5,
                                                                    outline: "none",
                                                                },
                                                                hover: {
                                                                    fill: hasAlarms ? "#148010ff" : "#148010ff",
                                                                    stroke: "#000000ff",
                                                                    strokeWidth: 1,
                                                                    cursor: "pointer",
                                                                    outline: "none",
                                                                },
                                                                pressed: {
                                                                    fill: hasAlarms ? "#148010ff" : "#148010ff",
                                                                    stroke: "#000000ff",
                                                                    strokeWidth: 1.5,
                                                                    outline: "none",
                                                                },
                                                            }}
                                                        />
                                                        <Marker coordinates={centroid}>
                                                            <text
                                                                textAnchor="middle"
                                                                dy={3}
                                                                style={{
                                                                    fontFamily: "Arial, sans-serif",
                                                                    fontSize: "9px",
                                                                    fontWeight: "bold",
                                                                    fill: "white",
                                                                    pointerEvents: "none",
                                                                    textShadow: "1px 1px 1px rgba(0,0,0,0.5)"
                                                                }}
                                                            >
                                                                {wilayaNumber}
                                                            </text>
                                                            {hasAlarms && (
                                                                <circle
                                                                    cx={8}
                                                                    cy={-8}
                                                                    r={4}
                                                                    fill="#fb2424ff"
                                                                    stroke="white"
                                                                    strokeWidth={1}
                                                                />
                                                            )}
                                                        </Marker>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </Geographies>
                                </ComposableMap>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            {selectedWilayaData ? (
                                <div style={{
                                    background: 'white',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                    border: '2px solid rgba(0,0,0,0.05)',
                                    maxHeight: '568px',
                                    overflowY: 'auto',
                                    flex: 2

                                }}>
                                    <h3 style={{
                                        margin: '0 0 15px 0',
                                        color: '#2c3e50',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        borderBottom: '2px solid #ecf0f1',
                                        paddingBottom: '8px'
                                    }}>
                                        {selectedWilayaData.nom} - Statistiques
                                    </h3>

                                    {/* Section des Alarmes */}
                                    {activeAlarms.length > 0 && (
                                        <div style={{
                                            background: '#fef2f2',
                                            border: '1px solid #fecaca',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            marginBottom: '15px'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginBottom: '8px',
                                                color: '#dc2626',
                                                fontWeight: '600'
                                            }}>
                                                <AlertTriangle size={16} />
                                                Alarmes Actives ({activeAlarms.length})
                                            </div>
                                            {activeAlarms.map((alarm) => (
                                                <div key={alarm.code} style={{
                                                    background: 'white',
                                                    padding: '8px',
                                                    borderRadius: '4px',
                                                    marginBottom: '6px',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    <div style={{ fontWeight: '600', color: '#dc2626' }}>
                                                        {alarm.code}: {alarm.name}
                                                    </div>
                                                    <div style={{ color: '#666', marginTop: '2px' }}>
                                                        {alarm.description}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '14px'
                                    }}>
                                        <Kpi
                                            title="nombre de dépèches pré-arrivé"
                                            value={selectedWilayaData.kpi["Nombre de dépêches pré-arrivées"]}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre d'envoi livrés"
                                            value={selectedWilayaData.kpi["Nombre denvois livrés"]}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre d'envois non-livrés"
                                            value={selectedWilayaData.kpi["Nombre denvois non livrés "]}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="taux de livraison"
                                            value={`${selectedWilayaData.kpi["Taux de livraison"]}%`}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="taux de livraison à temps"
                                            value={`${selectedWilayaData.kpi["Taux de livraison dans les délais"]}%`}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre d'envois > délai de garde"
                                            value={selectedWilayaData.kpi["Nombre denvois en dépassement du délai de garde"]}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre d'envois en détention doinière "
                                            value={selectedWilayaData.kpi["Nombre denvois bloqués en douane"]}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre d'envois retturnés "
                                            value={selectedWilayaData.kpi["Nombre denvois retournés"]}

                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="délai d'enchainement des envois"
                                            value={`${selectedWilayaData.kpi["Délai dacheminement des envois de bout en bout "]} j`}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="délai de concentration des envois"
                                            value={`${selectedWilayaData.kpi["Délai de concentration des envois "]} j`}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        /><Kpi
                                            title="nombre  d'envois scannés"
                                            value={selectedWilayaData.kpi["Nombre denvois non scannés"]}

                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                        <Kpi
                                            title="nombre de colis en transit"
                                            value={`${selectedWilayaData.kpi["Délai de concentration "]} j`}
                                            style={{
                                                backgroundColor: '#3B82F6',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                minHeight: '80px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    background: 'white',
                                    borderRadius: '15px',
                                    padding: '40px 20px',
                                    boxShadow: '0 8px 25px rgba(0, 238, 255, 0.3)',
                                    textAlign: 'center',
                                    color: '#00eeff',
                                    border: '2px dashed #0099ff'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.5 }}>📊</div>
                                    <p style={{ margin: 0, fontSize: '1.1rem' }}>Select a wilaya to view analytics</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section des Graphiques */}
                    <div style={{ width: '100%', marginBottom: '20px' }}>
                        {selectedWilayaData ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                                gap: '8px'
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
                                        showLabels={true}
                                    />
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
                        ) : (
                            <div style={{
                                background: 'white',
                                borderRadius: '15px',
                                padding: '40px 20px',
                                boxShadow: '0 8px 25px rgba(0, 238, 255, 0.3)',
                                textAlign: 'center',
                                color: '#00eeff',
                                border: '2px dashed #0099ff'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.5 }}>🗺️</div>
                                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                    Click on any wilaya on the map to see detailed charts and analytics
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Section Actions des Alarmes */}
                    {selectedWilayaData && activeAlarms.length > 0 && (
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '20px',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}>
                            <h3 style={{
                                margin: '0 0 20px 0',
                                color: '#dc2626',
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <AlertTriangle size={20} />
                                Actions Recommandées pour {selectedWilayaData.nom}
                            </h3>

                            {activeAlarms.map((alarm, index) => (
                                <div key={alarm.code} style={{
                                    background: '#fef2f2',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    marginBottom: index < activeAlarms.length - 1 ? '16px' : '0',
                                    border: '1px solid #fecaca'
                                }}>
                                    <div style={{
                                        color: '#dc2626',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        marginBottom: '8px'
                                    }}>
                                        {alarm.name} ({alarm.code})
                                    </div>
                                    <div style={{
                                        color: '#6b7280',
                                        fontSize: '0.95rem',
                                        marginBottom: '12px'
                                    }}>
                                        {alarm.description}
                                    </div>
                                    <div style={{
                                        color: '#374151',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        marginBottom: '8px'
                                    }}>
                                        Actions à prendre :
                                    </div>
                                    <ul style={{
                                        margin: '0',
                                        paddingLeft: '20px',
                                        color: '#4b5563'
                                    }}>
                                        {alarm.actions.map((action, actionIndex) => (
                                            <li key={actionIndex} style={{
                                                marginBottom: '4px',
                                                fontSize: '0.85rem',
                                                lineHeight: '1.4'
                                            }}>
                                                {action}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    <style jsx>{`
                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        transition: all 0.3s ease;
                        width: 100%;
                        margin-left: ${sidebarOpen ? '20px' : '0'};
                    }

                    .app-container {
                        position: relative;
                        width: 100%;
                        min-height: 100vh;
                    }

                    @media (max-width: 1200px) {
                        .main-content {
                            margin-left: ${sidebarOpen ? '200px' : '0'} !important;
                        }
                        
                        .dashboard-grid {
                            grid-template-columns: 1fr !important;
                            gap: 15px !important;
                        }
                    }

                    @media (max-width: 768px) {
                        .main-content {
                            margin-left: 0 !important;
                            padding: 10px !important;
                        }
                    }
                    `}</style>
                </div>
            </div>
        </div>
    );
}

export default AlgeriaMapPage;