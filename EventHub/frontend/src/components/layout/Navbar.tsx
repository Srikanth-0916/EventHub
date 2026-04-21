import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Calendar, User, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <Calendar size={24} />
                    <span>EventHub</span>
                </Link>

                <div style={styles.links}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" style={styles.link}>
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                            <div style={styles.userSection}>
                                <div style={styles.userInfo}>
                                    <User size={18} />
                                    <span>{user?.name}</span>
                                    <span style={styles.roleTag}>{role}</span>
                                </div>
                                <button onClick={handleLogout} className="btn btn-outline" style={styles.logoutBtn}>
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles: Record<string, React.CSSProperties> = {
    nav: {
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--accent-primary)',
        textDecoration: 'none',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-secondary)',
        fontWeight: 500,
        textDecoration: 'none',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        paddingLeft: '1.5rem',
        borderLeft: '1px solid var(--border-color)',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontSize: '0.875rem',
    },
    roleTag: {
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textTransform: 'capitalize',
    },
    logoutBtn: {
        padding: '0.5rem',
        borderRadius: 'var(--radius-sm)',
    }
};

export default Navbar;
