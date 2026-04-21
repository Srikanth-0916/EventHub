export interface Student {
    id: string;
    name: string;
    rollNumber: string;
    department: string;
    email: string;
}

export interface Faculty {
    id: string;
    name: string;
    facultyId: string;
    department: string;
    email: string;
}

export interface AuthState {
    user: Student | Faculty | null;
    role: 'student' | 'faculty' | null;
    isAuthenticated: boolean;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    facultyId: string;
    facultyName: string;
    maxParticipants: number;
    currentParticipants: number;
}

export interface Registration {
    id: string;
    eventId: string;
    eventName: string;
    studentRollNumber: string;
    studentName: string;
    registrationDate: string;
}
