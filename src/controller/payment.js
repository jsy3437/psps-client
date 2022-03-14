import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/payment' }
		: { baseURL: `${ADDRESS}/payment` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const payment = async (paymentData) => {
	return await instance.post('/', paymentData).catch(errorMessage);
};

export const get_list = async () => {
	return await instance.get('/list').catch(errorMessage);
};

export const get_detail = async (payment_id) => {
	return await instance.get(`/detail/${payment_id}`).catch(errorMessage);
};

export const claim_cancel = async (paymentData, claimType) => {
	return await instance
		.patch(`/claim/?type=${claimType}`, paymentData)
		.catch(errorMessage);
};
