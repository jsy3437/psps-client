import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/user' }
		: { baseURL: `${ADDRESS}/user` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const authCheck = async () => {
	return await instance.get('/').catch({ data: { success: false } });
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
export const get_me = async () => {
	return await instance.get('/me').catch(errorMessage);
};
export const send_sms = async (userData) => {
	return await instance.post('/sms/send', userData).catch(errorMessage);
};
export const check_sms = async (smsData) => {
	return await instance.post('/sms/check', smsData).catch(errorMessage);
};
export const check_email = async (userData) => {
	return await instance.post('/check', userData).catch(errorMessage);
};
export const change_tel = async (userData) => {
	return await instance.patch('/', userData).catch(errorMessage);
};
export const change_password = async (userData) => {
	return await instance.patch('/', userData).catch(errorMessage);
};
export const change_address = async (userData) => {
	return await instance.patch('/', userData).catch(errorMessage);
};
export const find_email = async (userData) => {
	return await instance.post('/email', userData).catch(errorMessage);
};
export const find_Pw_get_number = async (userData) => {
	return await instance.post('/find', userData).catch(errorMessage);
};
export const find_Pw_change = async (userData) => {
	console.log(userData);
	return await instance.patch('/password', userData).catch(errorMessage);
};
