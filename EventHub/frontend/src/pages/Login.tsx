import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentApi, facultyApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserRound, GraduationCap } from 'lucide-react';

const Login: React.FC = () => {
    const [role, setRole] = useState<'student' | 'faculty'>('student');
    const [identifier, setIdentifier] = useState(''); // rollNumber or facultyId
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (role === 'student') {
                const response = await studentApi.post('/login', { rollNumber: identifier, password });
                login(response.data.student, 'student');
            } else {
                const response = await facultyApi.post('/login', { facultyId: identifier, password });
                login(response.data.faculty, 'faculty');
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div className="card" style={styles.card}>
                <div style={styles.header}>
                    <LogIn size={32} color="var(--accent-primary)" />
                    <h2>Welcome Back</h2>
                    <p>Login to manage your events</p>
                </div>

                <div style={styles.roleSwitcher}>
                    <button
                        style={{ ...styles.roleBtn, ...(role === 'student' ? styles.roleBtnActive : {}) }}
                        onClick={() => setRole('student')}
                    >
                        <GraduationCap size={18} />
                        Student
                    </button>
                    <button
                        style={{ ...styles.roleBtn, ...(role === 'faculty' ? styles.roleBtnActive : {}) }}
                        onClick={() => setRole('faculty')}
                    >
                        <UserRound size={18} />
                        Faculty
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{role === 'student' ? 'Roll Number' : 'Faculty ID'}</label>
                        <input
                            type="text"
                            placeholder={role === 'student' ? 'e.g. 21CS001' : 'e.g. FAC001'}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={styles.submitBtn}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={styles.footer}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    roleSwitcher: {
        display: 'flex',
        backgroundColor: 'var(--bg-tertiary)',
        padding: '0.25rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
    },
    roleBtn: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        transition: 'var(--transition)',
    },
    roleBtnActive: {
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--accent-primary)',
        boxShadow: 'var(--shadow-sm)',
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
        color: 'var(--text-secondary)',
    },
    input: {
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        outline: 'none',
        transition: 'var(--transition)',
    },
    submitBtn: {
        marginTop: '0.5rem',
        width: '100%',
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem',
        textAlign: 'center',
    },
    footer: {
        marginTop: '1.5rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
    }
};

export default Login;
