import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { user_logout } from '../modules/user';
import { logout } from '../controller/user';
import * as _basket from '../controller/basket';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';

const Navbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.user);
	const [cartCount, setCartCount] = useState('');

	useEffect(() => {
		_basket.get_list().then((res) => {
			const { success, count } = res.data;
			success && setCartCount(count);
		});
	}, [user]);

	useEffect(() => {
		cart && setCartCount(cart.cartCount);
	}, [cart, user]);

	const goHome = () => {
		history.push('/');
	};
	const goProduct = () => {
		history.push('/product');
	};
	const goIntro = () => {
		history.push('/intro');
	};
	const goService = () => {
		history.push('/service');
	};
	const goLogin = () => {
		history.push('/login');
	};
	const goLogout = () => {
		logout().then((res) => {
			if (res.data.success) {
				dispatch(user_logout());
				history.push('/');
			}
		});
	};
	const goRegister = () => {
		history.push('/register');
	};
	const goMyPage = () => {
		history.push('/members');
	};
	const goCart = () => {
		history.push('/cart');
	};

	return (
		<NavbarWrap>
			<NavbarInside>
				<NavbarLeft>
					<NavbarLogo alt="logo" src={logo} onClick={goHome} />
				</NavbarLeft>
				<NavbarRight>
					<RightFirst>
						<RightFirstList onClick={goProduct}>쇼핑하기</RightFirstList>
						<RightFirstList onClick={goIntro}>품생품사란</RightFirstList>
						<RightFirstList onClick={goService}>고객센터</RightFirstList>
					</RightFirst>
					<RightSecond>
						<RightSecondList onClick={!user.login ? goLogin : goLogout}>
							{!user.login ? '로그인' : '로그아웃'}
						</RightSecondList>
						<RightSecondList onClick={!user.login ? goRegister : goMyPage}>
							{!user.login ? '회원가입' : '마이페이지'}
						</RightSecondList>
						<RightSecondList onClick={goCart}>
							장바구니
							{cartCount && cartCount.length !== 0 ? (
								<CartCount>{cartCount && cartCount}</CartCount>
							) : null}
						</RightSecondList>
					</RightSecond>
				</NavbarRight>
			</NavbarInside>
		</NavbarWrap>
	);
};

export default Navbar;

const NavbarWrap = styled.div`
	width: 100vw;
	height: 8rem;
	display: flex;
	justify-content: center;
	background-color: #fff;
	border-bottom: 1px solid #a0a0a0;
	z-index: 100;
	position: fixed;
	top: 0rem;
`;
const NavbarInside = styled.div`
	width: 120rem;
	display: flex;
	justify-content: space-between;
`;
const NavbarLeft = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const NavbarLogo = styled.img`
	width: 5.8rem;
	height: 5.8rem;
	cursor: pointer;
`;
const NavbarRight = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
`;
const RightFirst = styled.ul`
	display: flex;
	border-right: 3px solid #000;
	padding-right: 1rem;
`;
const RightFirstList = styled.li`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #000000;
	letter-spacing: -0.64px;
	padding: 0 0.8rem;
	cursor: pointer;
`;
const RightSecond = styled.ul`
	display: flex;
	padding-left: 1rem;
`;
const RightSecondList = styled(RightFirstList)`
	display: flex;
	align-items: center;
`;
const CartCount = styled.p`
	padding: 0 0.5rem;
	/* width: 1.8rem; */
	height: 1.8rem;
	line-height: 1.8rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	text-align: center;
	margin-left: 0.5rem;
	background-color: #e50011;
	border-radius: 4px;
`;
