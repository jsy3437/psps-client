import React from 'react';
import UserData from '../components/PaymentPage/UserData';
import ProductData from '../components/PaymentPage/productData';
import styled from 'styled-components';

import logo from '../images/red-logo.svg';
import Footer from '../components/Footer';

const PaymentPage = () => {
	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>주문하기</Title>
				<UserData />
				<ProductData />
			</Container>
			<Footer />
		</div>
	);
};

export default PaymentPage;

const Container = styled.div`
	width: 69.7rem;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 1rem auto;
`;
