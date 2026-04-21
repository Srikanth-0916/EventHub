import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentApi, facultyApi } from '../api';
import { UserPlus, UserRound, GraduationCap } from 'lucide-react';

const Register: React.FC = () => {
    const [role, setRole] = useState<'student' | 'faculty'>('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        identifier: '', // rollNumber or facultyId
        department: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (role === 'student') {
                await studentApi.post('/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    rollNumber: formData.identifier,
                    department: formData.department
                });
            } else {
                await facultyApi.post('/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    facultyId: formData.identifier,
                    department: formData.department
                });
            }
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data || 'Registration failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div className="card" style={styles.card}>
                <div style={styles.header}>
                    <UserPlus size={32} color="var(--accent-primary)" />
                    <h2>Join Us</h2>
                    <p>Create your account today</p>
                </div>

                <div style={styles.roleSwitcher}>
                    <button
                        type="button"
                        style={{ ...styles.roleBtn, ...(role === 'student' ? styles.roleBtnActive : {}) }}
                        onClick={() => setRole('student')}
                    >
                        <GraduationCap size={18} />
                        Student
                    </button>
                    <button
                        type="button"
                        style={{ ...styles.roleBtn, ...(role === 'faculty' ? styles.roleBtnActive : {}) }}
                        onClick={() => setRole('faculty')}
                    >
                        <UserRound size={18} />
                        Faculty
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>{role === 'student' ? 'Roll Number' : 'Faculty ID'}</label>
                            <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} style={styles.input} required />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={styles.submitBtn}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div style={styles.footer}>
                    Already have an account? <Link to="/login">Login here</Link>
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
        maxWidth: '500px',
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
        gap: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
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
        marginTop: '1rem',
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

export default Register;
