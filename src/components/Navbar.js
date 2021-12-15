import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../images/red-logo.svg';

const Navbar = () => {
	const history = useHistory();
	const firstArr = ['카테고리', '품생품사란', '고객센터'];
	const secondArr = ['로그인', '회원가입', '장바구니'];

	const goHome = () => {
		history.push('/');
	};
	const goProduct = () => {
		history.push('/product');
	};
	const goIntro = () => {
		history.push('/intro');
	};
	const goLogin = () => {
		history.push('/login');
	};
	const goRegister = () => {
		history.push('/register');
	};
	const goCart = () => {
		history.push('/cart');
	};

	return (
		<NavbarWrap>
			<NavbarInside>
				<NavbarLeft>
					<NavbarLogo onClick={goHome} alt='로고' src={Logo} />
				</NavbarLeft>
				<NavbarRight>
					<RightFirst>
						{firstArr.map((el, idx) => (
							<RightFirstList
								key={idx}
								onClick={
									idx === 0 ? goProduct : idx === 1 ? goIntro : null
								}>
								{el}
							</RightFirstList>
						))}
					</RightFirst>
					<RightSecond>
						{secondArr.map((el, idx) => (
							<RightSecondList
								key={idx}
								onClick={
									idx === 0 ? goLogin : idx === 1 ? goRegister : goCart
								}>
								{el}
							</RightSecondList>
						))}
					</RightSecond>
				</NavbarRight>
			</NavbarInside>
		</NavbarWrap>
	);
};

export default withRouter(Navbar);

const NavbarWrap = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	background: var(--unnamed-color-221814) 0% 0% no-repeat padding-box;
	background: #221814 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 30px #00000066;
	opacity: 1;
`;
const NavbarInside = styled.div`
	width: 120rem;
	display: flex;
	justify-content: space-between;
`;
const NavbarLeft = styled.div`
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const NavbarLogo = styled.img`
	width: 5.8rem;
	height: 5.8rem;
`;
const NavbarRight = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
`;
const RightFirst = styled.ul`
	display: flex;
	border-right: 2px solid #fff;
`;
const RightFirstList = styled.li`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #fff;
	letter-spacing: -0.64px;
	margin-right: 2rem;
`;
const RightSecond = styled.ul`
	display: flex;
`;
const RightSecondList = styled.li`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #fff;
	letter-spacing: -0.64px;
	margin-left: 2rem;
`;
