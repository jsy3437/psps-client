import React from 'react';
import Footer from '../components/Footer';
import Induce from '../components/Induce';
import OrderBox from '../components/OrderBox';

const ProductDetailPage = () => {
	return (
		<div id='container'>
			<OrderBox />
			<div
				style={{
					backgroundColor: '#aaa',
					width: '100%',
					height: '300px',
				}}></div>
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductDetailPage;
