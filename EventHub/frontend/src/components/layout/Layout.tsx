import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={styles.layout}>
            <Navbar />
            <main className="container" style={styles.main}>
                {children}
            </main>
            <footer style={styles.footer}>
                <div className="container">
                    <p>© 2026 EventHub. Classy Event Management.</p>
                </div>
            </footer>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    layout: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        flex: 1,
        paddingTop: '2rem',
        paddingBottom: '4rem',
    },
    footer: {
        padding: '2rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
    }
};

export default Layout;
