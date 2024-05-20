import axios from 'axios';

const API_URL = 'https://api.cyber.newbie.sparcsandbox.com';

export const register = (username, password) => axios.post(`${API_URL}/register`, { username, password }, { withCredentials: true });
export const login = (username, password) => axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
export const getUsername = () => axios.get(`${API_URL}/get-username`, { withCredentials: true });
export const logout = () => axios.post(`${API_URL}/logout`, null, { withCredentials: true });
export const fetchDiaries = () => axios.get(`${API_URL}/diaries`, { withCredentials: true });
export const createDiary = (data) => axios.post(`${API_URL}/create-diary`, data, { withCredentials: true });
