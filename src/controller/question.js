import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/question' }
		: { baseURL: `${ADDRESS}/question` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_type_list = async () => {
	return await instance.get(`/?type`).catch(errorMessage);
};

export const get_list = async (qu_type_id) => {
	return await instance.get(`/list/${qu_type_id}`).catch(errorMessage);
};
