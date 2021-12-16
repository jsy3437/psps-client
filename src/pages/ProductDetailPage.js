import React from 'react';
import OrderBox from '../components/OrderBox';
import ProductDetail from '../components/ProductDetail';
import ProductInfoTable from '../components/ProductInfoTable';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
	return (
		<div id='container'>
			<OrderBox />
			<ProductDetail />
			<ProductInfoTable />
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductDetailPage;
