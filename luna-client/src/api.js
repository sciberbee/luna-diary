import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const register = (username, password) => axios.post(`${API_URL}/register`, { username, password });
export const login = (username, password) => axios.post(`${API_URL}/login`, { username, password });
export const logout = () => axios.post(`${API_URL}/logout`);
export const fetchDiaries = () => axios.get(`${API_URL}/diaries`);
export const createDiary = (data) => axios.post(`${API_URL}/create-diary`, data);
