import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import * as _user from '../../controller/user';

const OrderBox = (props) => {
	const history = useHistory();
	const orderCalc = props.orderCalc;
	const [deliveryPrice, setDeliveryPrice] = useState(3000);

	const goShopping = () => {
		history.push('/product');
	};

	const goPayment = () => {
		const paymentProducts = [];
		let productName;

		props.checked.map((el, idx) => {
			if (el) {
				paymentProducts.push(props.cartList[idx]);
				productName = props.cartList[idx].product_title;
			}
		});

		history.push({
			pathname: '/payment',
			state: { paymentProducts, productName, total_amount: orderCalc.total },
		});
	};

	console.log(orderCalc);
	return (
		<OrderWrap>
			{props.supplierList &&
				props.supplierList.map((el, idx) => (
					<PriceBox key={idx}>
						<TitleAndPrice>
							<PriceTitle>공급처</PriceTitle>

							<Price color={'#A0A0A0'}>{el[0]}</Price>
						</TitleAndPrice>
						<TitleAndPrice>
							<PriceTitle>총 상품 금액</PriceTitle>
							<Price color={'#e50011'}>
								{orderCalc[idx] && orderCalc[idx].total.toLocaleString()}원
							</Price>
						</TitleAndPrice>
						<TitleAndPrice>
							<PriceTitle>배송비</PriceTitle>
							<Price color={'#e50011'}>
								{deliveryPrice.toLocaleString()}원
							</Price>
						</TitleAndPrice>
					</PriceBox>
				))}

			<PredictionPriceTitle>예상 결제 금액</PredictionPriceTitle>
			<PredictionPrice>
				{(
					orderCalc && orderCalc.total + 3000 * props.supplierList.length
				).toLocaleString()}
				<PredictionPriceWon>원</PredictionPriceWon>
			</PredictionPrice>
			<SubmitButton productOrder onClick={goPayment}>
				선택상품 주문하기
			</SubmitButton>
			<SubmitButton shopping onClick={goShopping}>
				쇼핑 계속하기
			</SubmitButton>
		</OrderWrap>
	);
};

export default OrderBox;

const OrderWrap = styled.div`
	position: sticky;
	width: 45.5rem;
	/* height: 57.2rem; */
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	padding: 4rem 5.5rem;
	top: 0%;
	/* left: 58%; */
`;
const PriceBox = styled.div`
	width: 100%;
	padding-bottom: 0.85rem;
	border-bottom: 1px solid #e0e0e0;
	margin-bottom: 2.45rem;
`;
const TitleAndPrice = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PriceTitle = styled.p`
	font-size: 2rem;
	font-family: 'kr-r';
	letter-spacing: -0.8px;
	color: #221814;
`;
const Price = styled.p`
	font-size: 2rem;
	font-family: 'kr-r';
	letter-spacing: -0.8px;
	color: ${(props) => props.color};
	margin-bottom: 1.6rem;
	text-align: end;
`;
const PredictionPriceTitle = styled.h2`
	font-size: 2.1rem;
	font-family: 'kr-b';
	letter-spacing: -0.84px;
	color: #221814;
	text-align: end;
	padding-top: 0.9rem;
`;
const PredictionPrice = styled.h2`
	width: fit-content;
	margin-left: auto;
	font-size: 4.5rem;
	font-family: 'ro-b';
	letter-spacing: -1.8px;
	color: #e50011;
	text-align: start;
`;
const PredictionPriceWon = styled.span`
	font-size: 3rem;
	letter-spacing: -1.2px;
	margin-left: 0.3rem;
	text-align: end;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	border-radius: 4px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: none;
	transition: all 200ms ease;
	${(props) =>
		props.productOrder &&
		`background-color:#221814; color:#fff ; margin-top:2rem `}
	${(props) =>
		props.shopping &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ; margin-bottom:4rem;`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
