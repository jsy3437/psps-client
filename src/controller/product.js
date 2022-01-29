import axios from 'axios';
import { ADDRESS } from '../config';
import { PORT } from '../config';

const instance = axios.create({
	proxy: `${ADDRESS}`,
	baseURL: '/client/product',
	// baseURL: `${ADDRESS}/product`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async (part, subPart) => {
	return await instance.get(`/${part}/${subPart}`).catch(errorMessage);
};

export const get_detail = async (product_id) => {
	return await instance.get(`/detail/${product_id}`).catch(errorMessage);
};
