import React, { useEffect, useState } from 'react';
import { eventApi } from '../api';
import { useAuth } from '../context/AuthContext';
import type { Event, Registration } from '../types';
import { Calendar, MapPin, Users, CheckCircle, Clock } from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [eventsRes, regsRes] = await Promise.all([
                eventApi.get<Event[]>(''),
                eventApi.get<Registration[]>(`/registrations/student/${(user as any).rollNumber}`)
            ]);
            setEvents(eventsRes.data);
            setRegistrations(regsRes.data);
        } catch (err) {
            setError('Failed to load dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    const isRegistered = (eventId: string) => {
        return registrations.some(reg => reg.eventId === eventId);
    };

    const handleRegister = async (eventId: string) => {
        try {
            await eventApi.post(`/${eventId}/register`, {
                rollNumber: (user as any).rollNumber,
                studentName: user?.name
            });
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.response?.data || 'Failed to register for event.');
        }
    };

    if (loading) return <div style={styles.loading}>Loading your dashboard...</div>;

    return (
        <div style={styles.dashboard}>
            <header style={styles.header}>
                <div>
                    <h1>Student Dashboard</h1>
                    <p>Explore and register for upcoming campus events</p>
                </div>
            </header>

            {error && <div style={styles.error}>{error}</div>}

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Available Events</h2>
                <div style={styles.grid}>
                    {events.length === 0 ? (
                        <p style={styles.empty}>No events available at the moment.</p>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="card" style={styles.eventCard}>
                                <div style={styles.eventHeader}>
                                    <h3 style={styles.eventName}>{event.name}</h3>
                                    <span style={styles.dateBadge}>
                                        <Calendar size={14} />
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <p style={styles.eventDesc}>{event.description}</p>

                                <div style={styles.eventMeta}>
                                    <div style={styles.metaItem}>
                                        <MapPin size={16} />
                                        <span>{event.location}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <Users size={16} />
                                        <span>{event.currentParticipants} / {event.maxParticipants}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <Clock size={16} />
                                        <span>Faculty: {event.facultyName}</span>
                                    </div>
                                </div>

                                <div style={styles.actions}>
                                    {isRegistered(event.id) ? (
                                        <div style={styles.registeredBadge}>
                                            <CheckCircle size={18} />
                                            Registered
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            style={styles.actionBtn}
                                            onClick={() => handleRegister(event.id)}
                                            disabled={event.currentParticipants >= event.maxParticipants}
                                        >
                                            {event.currentParticipants >= event.maxParticipants ? 'Full' : 'Register Now'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>My Registrations</h2>
                <div className="card" style={styles.regCard}>
                    {registrations.length === 0 ? (
                        <p style={styles.empty}>You haven't registered for any events yet.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Event Name</th>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map(reg => (
                                    <tr key={reg.id} style={styles.tr}>
                                        <td style={styles.td}>{reg.eventName}</td>
                                        <td style={styles.td}>{new Date(reg.registrationDate).toLocaleDateString()}</td>
                                        <td style={styles.td}>
                                            <span style={styles.successText}>Confirmed</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    dashboard: {
        paddingBottom: '2rem',
    },
    header: {
        marginBottom: '2.5rem',
    },
    section: {
        marginBottom: '3rem',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
    },
    eventCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    eventHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
    },
    eventName: {
        fontSize: '1.125rem',
        margin: 0,
    },
    dateBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: 'var(--accent-soft)',
        color: 'var(--accent-primary)',
        padding: '0.25rem 0.625rem',
        borderRadius: '100px',
    },
    eventDesc: {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        height: '4.5em',
    },
    eventMeta: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        marginTop: 'auto',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
    },
    actions: {
        marginTop: '1.25rem',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1rem',
    },
    actionBtn: {
        width: '100%',
    },
    registeredBadge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        color: '#059669',
        fontWeight: 600,
        fontSize: '0.875rem',
    },
    regCard: {
        padding: 0,
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    th: {
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--bg-tertiary)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-secondary)',
    },
    tr: {
        borderBottom: '1px solid var(--border-color)',
    },
    td: {
        padding: '1rem 1.5rem',
        fontSize: '0.875rem',
    },
    successText: {
        color: '#059669',
        fontWeight: 600,
    },
    empty: {
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        color: 'var(--text-secondary)',
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
    }
};

export default StudentDashboard;
