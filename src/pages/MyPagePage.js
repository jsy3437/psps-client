import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import MenuSelect from '../components/MyPage/MenuSelect';
import OrderHistory from '../components/MyPage/OrderHistory';
import Footer from '../components/Footer';
import * as _payment from '../controller/payment';

const MyPagePage = () => {
	const [menu, setMenu] = useState('주문내역');
	const [paymentList, setPaymentList] = useState('');

	useEffect(() => {
		_payment.get_list().then((res) => {
			// console.log(res.data);
			const { success, payment_list } = res.data;
			if (success) {
				setPaymentList(payment_list);
			}
		});
	}, []);
	// console.log(paymentList);
	return (
		<div id="container">
			<Container>
				<MyPageInside>
					<LogoImg alt="logo" src={logo} />
					<Title>마이페이지</Title>
					<MenuSelect menu={menu} setMenu={setMenu} />
					{menu === '주문내역' && <OrderHistory paymentList={paymentList} />}
				</MyPageInside>
				<Footer />
			</Container>
		</div>
	);
};

export default MyPagePage;

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const MyPageInside = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 0.8rem;
`;
const Title = styled.h2`
	height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 4rem;
`;
