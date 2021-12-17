import React from 'react';
import styled from 'styled-components';
import ProductBanner from '../components/ProductPage/ProductBanner';
import ProductCategory from '../components/ProductPage/ProductCategory';
import ProductList from '../components/ProductPage/ProductList';
import PageSelector from '../components/PageSelector';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const ProductPage = () => {
	const page = 1;
	const total = 24;
	return (
		<div id='container'>
			<ProductBanner />
			<ProductCategory />
			<ProductList />
			<PageSelector page={page} total={total} />
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductPage;
