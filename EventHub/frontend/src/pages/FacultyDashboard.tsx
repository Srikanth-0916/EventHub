import React, { useEffect, useState } from 'react';
import { eventApi } from '../api';
import { useAuth } from '../context/AuthContext';
import type { Event } from '../types';
import { Plus, Calendar, MapPin, Users, Trash2 } from 'lucide-react';

const FacultyDashboard: React.FC = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        maxParticipants: 50,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await eventApi.get<Event[]>(`/faculty/${(user as any).facultyId}`);
            setEvents(res.data);
        } catch (err) {
            console.error('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await eventApi.post('', {
                ...formData,
                facultyId: (user as any).facultyId,
                facultyName: user?.name,
                maxParticipants: Number(formData.maxParticipants)
            });
            setShowModal(false);
            setFormData({ name: '', description: '', date: '', location: '', maxParticipants: 50 });
            fetchEvents();
        } catch (err) {
            alert('Failed to create event');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await eventApi.delete(`/${id}`);
            setEvents(events.filter(e => e.id !== id));
        } catch (err) {
            alert('Failed to delete event');
        }
    };

    if (loading) return <div style={styles.loading}>Loading your events...</div>;

    return (
        <div style={styles.dashboard}>
            <header style={styles.header}>
                <div>
                    <h1>Faculty Dashboard</h1>
                    <p>Organize and manage your campus events</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    Create Event
                </button>
            </header>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>My Events</h2>
                <div style={styles.grid}>
                    {events.length === 0 ? (
                        <div style={styles.emptyContainer}>
                            <p style={styles.empty}>You haven't created any events yet.</p>
                            <button className="btn btn-outline" onClick={() => setShowModal(true)}>Start by creating one</button>
                        </div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="card" style={styles.eventCard}>
                                <div style={styles.eventHeader}>
                                    <h3 style={styles.eventName}>{event.name}</h3>
                                    <div style={styles.eventActions}>
                                        <button style={styles.iconBtn} onClick={() => handleDelete(event.id)}>
                                            <Trash2 size={16} color="#ef4444" />
                                        </button>
                                    </div>
                                </div>

                                <p style={styles.eventDesc}>{event.description}</p>

                                <div style={styles.eventMeta}>
                                    <div style={styles.metaItem}>
                                        <Calendar size={14} />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <MapPin size={14} />
                                        <span>{event.location}</span>
                                    </div>
                                    <div style={styles.metaItem}>
                                        <Users size={14} />
                                        <span>{event.currentParticipants} / {event.maxParticipants}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {showModal && (
                <div style={styles.modalOverlay}>
                    <div className="card" style={styles.modal}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Create New Event</h2>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Event Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} required />
                            </div>
                            <div style={styles.grid2}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Max Participants</label>
                                    <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} style={styles.input} required />
                                </div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} required />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    dashboard: {
        paddingBottom: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    grid2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
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
    },
    eventName: {
        fontSize: '1.125rem',
        margin: 0,
    },
    eventActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.25rem',
        borderRadius: '4px',
        transition: 'var(--transition)',
    },
    eventDesc: {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        minHeight: '3em',
    },
    eventMeta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1rem',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
    },
    emptyContainer: {
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '4rem 0',
    },
    empty: {
        color: 'var(--text-muted)',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '1.5rem',
    },
    modal: {
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: 500,
    },
    input: {
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        outline: 'none',
    },
    textarea: {
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        outline: 'none',
        minHeight: '100px',
        resize: 'vertical',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1rem',
    },
    loading: {
        padding: '4rem 0',
        textAlign: 'center',
        color: 'var(--text-secondary)',
    }
};

export default FacultyDashboard;
