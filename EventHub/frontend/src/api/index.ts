import axios from 'axios';

const STUDENT_SERVICE_URL = 'http://localhost:8081/api/students';
const FACULTY_SERVICE_URL = 'http://localhost:8082/api/faculties';
const EVENT_SERVICE_URL = 'http://localhost:8083/api/events';

export const studentApi = axios.create({
  baseURL: STUDENT_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const facultyApi = axios.create({
  baseURL: FACULTY_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventApi = axios.create({
  baseURL: EVENT_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
