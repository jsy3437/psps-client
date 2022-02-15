import React, { useEffect, useMemo, useState } from 'react';
import * as _product from '../controller/product';
import * as _category from '../data/category';
import ProductBanner from '../components/ProductPage/ProductBanner';
import ProductCategory from '../components/ProductPage/ProductCategory';
import ProductList from '../components/ProductPage/ProductList';
import PageSelector from '../components/PageSelector';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const ProductPage = () => {
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		_product.get_list(part, subPart, page).then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.product_list);
				setTotal(res.data.total);
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, [part, subPart, page]);

	const subPartArr = useMemo(() => {
		const _part = _category.part;
		for (let i = 0; i < _part.length; i++) {
			if (_part[i].title === part) {
				setSubPart(null);
				return _part[i].arr;
			}
		}
	}, [part]);

	return isLoading ? (
		<Spinner />
	) : (
		<div id="container">
			<ProductBanner part={part} />
			<ProductCategory
				part={part}
				subPart={subPart}
				setPart={setPart}
				setSubPart={setSubPart}
				subPartArr={subPartArr}
			/>
			<ProductList
				part={part}
				subPart={subPart}
				setPart={setPart}
				setSubPart={setSubPart}
				list={list}
			/>
			{list.length > 0 ? (
				<PageSelector
					style={{ marginBottom: '6rem' }}
					total={total}
					page={page}
					setPage={setPage}
				/>
			) : (
				<ListInfoText>상품이 없습니다.</ListInfoText>
			)}

			<Induce />
			<Footer />
		</div>
	);
};

export default ProductPage;

const ListInfoText = styled.p`
	font-size: 2.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 10rem auto 15rem;
`;
