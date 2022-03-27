import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as _product from '../controller/product';
import styled, { keyframes, css } from 'styled-components';
import alert_img from '../images/alert-box.svg';
import OrderBox from '../components/ProductDetailPage/OrderBox';
import ProductDetail from '../components/ProductDetailPage/ProductDetail';
import ProductInfoTable from '../components/ProductDetailPage/ProductInfoTable';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
	const location = useLocation().state;
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const { product_id } = useParams();
	const selectRef = useRef();
	const infoRef = useRef();
	const detailRef = useRef();
	const [detail, setDetail] = useState({});
	const [optionList, setOptionList] = useState([]);
	const [alertState, setAlertState] = useState({
		successTrue: false,
		successFalse: false,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		return () => {
			history.replace({ state: location });
		};
	}, []);

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
			{(alertState.successTrue || alertState.successFalse) && (
				<AlertBox>
					<AlertImgBox
						state={alertState.successTrue || alertState.successFalse}
					>
						<AlertImg alt="alert image" src={alert_img} />
						<AlertText>
							{alertState.successTrue
								? '상품이 장바구니에 담겼어요!'
								: `이미 장바구니에\n존재하는 상품입니다.`}
						</AlertText>
					</AlertImgBox>
				</AlertBox>
			)}
			<OrderBox
				detail={detail}
				optionList={optionList}
				selectRef={selectRef}
				user={user}
				alertState={alertState}
				setAlertState={setAlertState}
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
			<Induce />
			<Footer />
		</div>
	);
};

export default ProductDetailPage;

const AlertBox = styled.div`
	width: 120rem;
	padding-left: 98rem;
	position: fixed;
	top: 8.5rem;
	z-index: 44;
`;

const alertBoxFade = keyframes`
	0% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;
const AlertImgBox = styled.div`
	position: relative;
	width: 25rem;
	opacity: 0;
	${(props) =>
		props.state &&
		css`
			animation: ${alertBoxFade} 5s;
		`}
`;
const AlertImg = styled.img`
	width: 100%;
`;
const AlertText = styled.p`
	width: 20rem;
	position: absolute;
	font-size: 1.6rem;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #221814;
	top: 50%;
	transform: translateY(-50%);
	left: 2.2rem;
	text-align: center;
`;
