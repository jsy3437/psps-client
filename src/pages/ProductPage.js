import React, { useState } from 'react';
import ProductBanner from '../components/ProductPage/ProductBanner';
import ProductCategory from '../components/ProductPage/ProductCategory';
import ProductList from '../components/ProductPage/ProductList';
import PageSelector from '../components/PageSelector';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const ProductPage = () => {
	const [mainCategory, setMainCategory] = useState('농산');
	const [subCategory, setSubCategory] = useState('전체보기');
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(37);

	const onClickPage = (e) => {
		setPage(e);
	};
	const getMainCategory = (mainCategory) => {
		setMainCategory(mainCategory);
	};
	const getSubCategory = (subCategory) => {
		setSubCategory(subCategory);
	};

	return (
		<div id='container'>
			<ProductBanner mainCategory={mainCategory} />
			<ProductCategory
				getMainCategory={getMainCategory}
				getSubCategory={getSubCategory}
				mainCategory={mainCategory}
				subCategory={subCategory}
			/>
			<ProductList />
			<PageSelector page={page} total={total} onClickPage={onClickPage} />
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductPage;
