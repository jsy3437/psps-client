import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import * as _product from '../controller/product';
import OrderBox from '../components/ProductDetailPage/OrderBox';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductInfoTable from '../components/ProductDetailPage/ProductInfoTable';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

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
			<Induce />
			<Footer />
		</div>
	);
};

export default withRouter(ProductDetailPage);
