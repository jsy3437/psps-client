import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../images/red-logo.svg';
import MenuSelect from '../components/MyPage/MenuSelect';
import OrderHistory from '../components/MyPage/OrderHistory';
import Footer from '../components/Footer';

const MyPagePage = () => {
	const [menu, setMenu] = useState('주문내역');
	const getMenu = (menu) => {
		setMenu(menu);
	};

	return (
		<div id='container'>
			<Container>
				<MyPageInside>
					<LogoImg alt='logo' src={Logo} />
					<Title>{`마이페이지`}</Title>
					<MenuSelect getMenu={getMenu} menu={menu} />
					{menu === '주문내역' && <OrderHistory />}
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
