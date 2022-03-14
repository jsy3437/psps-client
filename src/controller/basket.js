import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/basket' }
		: { baseURL: `${ADDRESS}/basket` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async () => {
	return await instance.get('/list').catch(errorMessage);
};
export const add_cart = async (productData) => {
	return await instance.post('/', productData).catch(errorMessage);
};
export const remove_cart = async (basket_id) => {
	return await instance.delete(`/${basket_id}`).catch(errorMessage);
};
export const patch_cart = async (quantity, basket_id) => {
	return await instance
		.patch(`/quantity/${basket_id}/?quantity=${quantity}`)
		.catch(errorMessage);
};
