import React from 'react';
import { useParams } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

import logo from '../images/red-logo.svg';

const PaymentResultPage = () => {
	const history = useHistory();
	const { payment_id } = useParams();

	console.log('aa', payment_id);

	const orderInfoMsg = `주문이 완료되었습니다! \n주문 상세내역은 마이페이지에서 확인하실 수 있습니다.`;

	const goShopping = () => {
		history.push('/product');
	};

	const goOrderDetail = () => {
		history.push('/members');
	};

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>주문하기</Title>
				<OrderResultInfo>{orderInfoMsg}</OrderResultInfo>
				<SubmitButton orderDetail onClick={goOrderDetail}>
					주문 상세보기
				</SubmitButton>
				<SubmitButton shopping onClick={goShopping}>
					계속 쇼핑하기
				</SubmitButton>
			</Container>
			<Footer />
		</div>
	);
};

export default withRouter(PaymentResultPage);

const Container = styled.div`
	width: 54rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10rem auto;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 0.8rem auto 4rem;
`;
const OrderResultInfo = styled.p`
	width: 100%;
	font-size: 2.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.96px;
	white-space: pre-wrap;
	text-align: center;
	margin-bottom: 6rem;
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
		props.orderDetail &&
		`background-color:#221814; color:#fff ; margin-top:2rem `}
	${(props) =>
		props.shopping &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ; margin-bottom:10rem;`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
