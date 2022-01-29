import React, { useEffect, useState } from 'react';
import * as _product from '../controller/product';
import ProductBanner from '../components/ProductPage/ProductBanner';
import ProductCategory from '../components/ProductPage/ProductCategory';
import ProductList from '../components/ProductPage/ProductList';
import PageSelector from '../components/PageSelector';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const ProductPage = () => {
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('전체보기');
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(37);

	useEffect(() => {
		_product.get_list(part, subPart).then((res) => {
			console.log(res.data);
		});
	}, [part, subPart]);

	const onClickPage = (e) => {
		setPage(e);
	};
	const getPart = (part) => {
		setPart(part);
	};
	const getSubPart = (subPart) => {
		setSubPart(subPart);
	};

	return (
		<div id='container'>
			<ProductBanner part={part} />
			<ProductCategory
				part={part}
				subPart={subPart}
				getPart={getPart}
				getSubPart={getSubPart}
			/>
			<ProductList
				part={part}
				subPart={subPart}
				getPart={getPart}
				getSubPart={getSubPart}
			/>
			<PageSelector
				style={{ marginBottom: '6rem' }}
				page={page}
				total={total}
				onClickPage={onClickPage}
			/>
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductPage;
