import React from 'react';
import styled from 'styled-components';
import * as info from '../../config';
import equalImg from '../../images/equal-ico.svg';
import plusImg from '../../images/plus-ico.svg';

const ProductData = () => {
	const PaymentAndDeliveryInfo = `- 신선식품이기 때문에 단순 소비자 단순 변심으로 인한 개인적인 사유로는 교환 및 환불이 불가합니다.\n- 상품의 변질, 이물질 발견, 아이스박스 및 아이스팩이 파손되어 배송될 경우 고객센터(${info.COMPANY_CONTACT})로 전화주시면 \b\b바로 교환/환불 해드리겠습니다.\n- 고객센터 운영시간은 평일 오전 9시부터 오후 6시까지 입니다. (점심시간 : 오전 12시부터 오후 1시)`;
	const productList = [
		{
			product_title: '소고기소고기소고기소고기소고기소고기소고기',
			product_option_title: '국거리용국거리용국거리용국거리용',
			quantity: 3,
			total: 57000,
		},
		{
			product_title: '소고기',
			product_option_title: '국거리용',
			quantity: 3,
			total: 57000,
		},
		{
			product_title: '소고기',
			product_option_title: '국거리용',
			quantity: 3,
			total: 57000,
		},
		{
			product_title: '소고기',
			product_option_title: '국거리용',
			quantity: 30,
			total: 1570000,
		},
	];

	return (
		<ProductDataWrap>
			<Title>주문 상품</Title>
			{productList.map((el, idx) => (
				<BorderBox key={idx}>
					<ProductText title="true">{el.product_title}</ProductText>
					<ProductText option>{el.product_option_title}</ProductText>
					<ProductText quantity>{el.quantity}개</ProductText>
					<ProductText price>{el.total.toLocaleString()}원</ProductText>
				</BorderBox>
			))}
			<TotalPriceBox>
				<PriceTitle>총 상품 금액</PriceTitle>
				<PriceText>21,000원</PriceText>
				<PlusImg alt="plus sign" src={plusImg} />
				<PriceTitle>배송비</PriceTitle>
				<PriceText>3,000원</PriceText>
				<PlusImg alt="equal sign" src={equalImg} />
				<PaymentPrice>
					24,000<PaymentWon>원</PaymentWon>
				</PaymentPrice>
			</TotalPriceBox>
			<Title>결제 및 배송 관련 안내</Title>
			<PaymentAndDeliveryInfoBox>
				{PaymentAndDeliveryInfo}
			</PaymentAndDeliveryInfoBox>
			<BtnBox>
				<SubmitButton>주문하기</SubmitButton>
			</BtnBox>
		</ProductDataWrap>
	);
};

export default ProductData;
const ProductDataWrap = styled.div`
	margin: 6rem auto;
	width: 100%;
`;

const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 0 auto 1.3rem 1.5rem;
	${(props) => props.receive && `margin: 0 auto 0.6rem 1.5rem`}
`;
const BorderBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 2rem 4rem;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	margin-bottom: 0.6rem;
`;
const ProductText = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	letter-spacing: -0.64px;
	color: #221814;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	${(props) => props.title && `width:19.7rem`}
	${(props) => props.option && `width:15.9rem`}
	${(props) => props.quantity && `width:5rem`}
	${(props) =>
		props.price && `width:10rem; text-align: right; font-family: 'kr-b';`}
`;
const TotalPriceBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 3.5rem 5.8rem;
	color: #e50011;
	font-family: 'kr-b';
	color: #6b6462;
	box-shadow: 0px 0px 10px #00000014;
	border-radius: 4px;
	margin: 3rem 0 8.6rem;
`;
const PriceTitle = styled.p`
	font-size: 1.4rem;
	letter-spacing: -0.56px;
`;
const PriceText = styled.p`
	font-size: 1.6rem;
	letter-spacing: -0.56px;
	color: #221814;
`;
const PlusImg = styled.img`
	width: 1.1rem;
	height: 1.1rem;
	margin: 0 2rem;
`;
const PaymentPrice = styled.p`
	width: 15rem;
	font-size: 3rem;
	font-family: 'ro-b';
	letter-spacing: -1.2px;
	color: #e50011;
	text-align: right;
`;
const PaymentWon = styled.span`
	font-size: 2rem;
	letter-spacing: -0.8px;
`;
const PaymentAndDeliveryInfoBox = styled.div`
	width: 100%;
	padding: 2.05rem 3.1rem;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	line-height: 2.4rem;
	color: #6b6462;
	word-break: break-all;
	white-space: pre-wrap;
`;
const BtnBox = styled.div`
	width: fit-content;
	margin: auto;
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
	background-color: #221814;
	color: #fff;
	margin: 6.05rem auto 0;

	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
