<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect, useRef, useState } from 'react';
>>>>>>> psps/seoyoon
import { withRouter, useParams } from 'react-router-dom';
import * as _product from '../controller/product';
import OrderBox from '../components/ProductDetailPage/OrderBox';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductInfoTable from '../components/ProductDetailPage/ProductInfoTable';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
<<<<<<< HEAD

const ProductDetailPage = () => {
	const { product_id } = useParams();
	const [detail, setDetail] = useState({});
	const [optionList, setOptionList] = useState([]);

	console.log('detail', detail);

	useEffect(() => {
		let isSubscribed = true;
		if (product_id) {
			_product.get_detail(product_id).then((res) => {
				console.log(res.data);
				if (isSubscribed && res.data.success) {
					setDetail(res.data.product);
					setOptionList(res.data.product_option_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [product_id]);

	return (
		<div id='container'>
			<OrderBox detail={detail} optionList={optionList} />
			<ProductDetail detail={detail} />
			<ProductInfoTable detail={detail} />
=======
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProductDetailPage = () => {
	const { pathname } = useLocation();
	const user = useSelector((state) => state.user);
	const { product_id } = useParams();
	const selectRef = useRef();
	const infoRef = useRef();
	const detailRef = useRef();
	const [detail, setDetail] = useState({});
	const [optionList, setOptionList] = useState([]);

	function ScrollToTop() {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, [pathname]);
		return null;
	}

	useEffect(() => {
		if (product_id) {
			let isSubscribed = true;
			_product.get_detail(product_id).then((res) => {
				const { success, product, product_option_list } = res.data;
				if (isSubscribed && success) {
					setDetail(product);
					setOptionList([...product_option_list]);
				}
			});
			return () => {
				isSubscribed = false;
			};
		}
	}, [product_id]);
	return (
		<div id="container">
			<ScrollToTop />
			<OrderBox
				detail={detail}
				optionList={optionList}
				selectRef={selectRef}
				user={user}
			/>
			<ProductDetail
				detail={detail}
				detailRef={detailRef}
				selectRef={selectRef}
				infoRef={infoRef}
			/>
			<ProductInfoTable
				detail={detail}
				optionList={optionList}
				infoRef={infoRef}
			/>
>>>>>>> psps/seoyoon
			<Induce />
			<Footer />
		</div>
	);
};

export default withRouter(ProductDetailPage);
