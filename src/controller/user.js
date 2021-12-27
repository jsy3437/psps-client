import axios from 'axios';
import { ADDRESS } from '../config';
import { PORT } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}:${PORT}`,
	// baseURL: '/client/user',
	baseURL: `${ADDRESS}:${PORT}/user`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const authCheck = async () => {
	return await instance.get('/').catch(errorMessage);
};
export const login = async (userData) => {
	return await instance.post('/login', userData).catch(errorMessage);
};
export const logout = async () => {
	return await instance.get('/logout').catch(errorMessage);
};
export const register = async (userData) => {
	return await instance.post('/register', userData).catch(errorMessage);
};
