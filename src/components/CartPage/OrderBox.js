import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { payment_request } from '../../payments';
import * as _user from '../../controller/user';

const OrderBox = (props) => {
	const history = useHistory();
	const orderCalc = props.orderCalc;
	const [me, setMe] = useState('');
	const [deliveryPrice, setDeliveryPrice] = useState(3000);

	useEffect(() => {
		_user.get_me().then((res) => {
			const { success, user } = res.data;
			if (success) {
				setMe(user);
			}
		});
	}, []);

	const goShopping = () => {
		history.push('/product');
	};

	const goPayment = () => {
		history.push('/payment');
	};

	console.log(props.cartList);
	// console.log(props.orderCalc);

	const onOrder = () => {
		const paymentProducts = [];
		let productName;
		props.checked.map((el, idx) => {
			if (el) {
				paymentProducts.push({
					product_option_id: props.cartList[idx].product_option_id,
					quantity: props.cartList[idx].quantity,
				});
				productName = props.cartList[idx].product_title;
			}
		});

		const name =
			paymentProducts.length === 1
				? productName
				: `${productName} 외 ${paymentProducts.length - 1}건`;

		const impData = {
			buyer_name: me.name,
			buyer_email: me.email,
			buyer_tel: me.phone_number,
			buyer_addr: me.address,
			name,
			// TODO 테스트 끝나고 나면 금액 바꿔주기
			// amount: props.orderCalc.total_price + deliveryPrice,
			amount: 100,
		};

		payment_request(impData, paymentProducts);
	};
	return (
		<OrderWrap>
			<PriceBox>
				<TitleAndPrice>
					<PriceTitle>총 상품 금액</PriceTitle>
					<Price color={'#e50011'}>
						{orderCalc && orderCalc.total_price.toLocaleString()}원
					</Price>
				</TitleAndPrice>
				<Price color={'#a0a0a0'}>
					기존가 {orderCalc && orderCalc.total.toLocaleString()}원
				</Price>
				<Price color={'#a0a0a0'}>
					할인금액 {orderCalc && orderCalc.total_discount.toLocaleString()}원
				</Price>
			</PriceBox>
			<PriceBox>
				<TitleAndPrice>
					<PriceTitle>총 배송비</PriceTitle>
					<Price color={'#e50011'}>3,000원</Price>
				</TitleAndPrice>
			</PriceBox>
			<PredictionPriceTitle>예상 결제 금액</PredictionPriceTitle>
			<PredictionPrice>
				{(orderCalc && orderCalc.total_price + 3000).toLocaleString()}
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
	height: 57.2rem;
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
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ; margin-bottom:10rem;`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
