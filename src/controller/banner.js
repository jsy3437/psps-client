import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}`,
	// baseURL: '/banner',
	baseURL: `${ADDRESS}/banner`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async (type) => {
	return await instance.get(`/?type=${type}`).catch(errorMessage);
};
