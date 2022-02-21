import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as _basket from '../controller/basket';
import { cart_remove } from '../modules/cart';

import CartList from '../components/CartPage/CartList';
import OrderBox from '../components/CartPage/OrderBox';
import logo from '../images/red-logo.svg';
import checkImg from '../images/check_btn.svg';
import uncheckImg from '../images/uncheck_btn.svg';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { useHistory } from 'react-router-dom';

const CartPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [cartCount, setCartCount] = useState('');
	const [checked, setChecked] = useState([]);
	const [allChecked, setAllChecked] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [cartList, setCartList] = useState([]);

	const [checkCount, setCheckCount] = useState('');
	const [orderCalc, setOrderCalc] = useState('');

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		_basket.get_list().then((res) => {
			console.log(res.data);
			const { success, count, basket_list, calc } = res.data;
			if (isSubscribed && success) {
				setCartList(basket_list);
				setCartCount(count);
				setCheckCount(count);
				setOrderCalc(calc);
			} else {
				console.log(res.data);
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, []);

	useEffect(() => {
		if (cartCount > 0) {
			setChecked(new Array(cartCount).fill(true));
		}
	}, [cartCount]);

	useEffect(() => {
		if (checked.length === cartCount) {
			if (allChecked && productCheckTest(false)) {
				setAllChecked(!allChecked);
			} else if (!allChecked && productCheckTest(true)) {
				setAllChecked(!allChecked);
			}
			settingOrderCalc();
		}
	}, [checked]);

	// Test if there is a checked state different from allChecked
	function productCheckTest(boolean) {
		const test = checked.filter((el) => el === boolean);
		if (!boolean && test.length !== 0) {
			return true;
		} else if (boolean && test.length === cartCount) {
			return true;
		}
		return false;
	}

	// trans checked -> resetting calc
	function settingOrderCalc() {
		let tempCalc = { total: 0, total_discount: 0, total_price: 0 };
		checked.map((el, idx) => {
			if (el) {
				tempCalc.total += cartList[idx].total;
				tempCalc.total_discount += cartList[idx].total_discount;
				tempCalc.total_price += cartList[idx].total_price;
			}
		});
		setOrderCalc(tempCalc);
	}

	// make all checked or all unchecked
	const onAllCheck = () => {
		if (allChecked) {
			setChecked(new Array(cartCount).fill(false));
		} else {
			setChecked(new Array(cartCount).fill(true));
		}
	};

	const goShopping = () => {
		history.push('/product');
	};

	// select and remove submit
	const onSelectRemove = () => {
		let basketIdArr = [];
		checked.map((el, idx) => {
			if (el) {
				basketIdArr.push(cartList[idx].basket_id);
			}
		});

		basketIdArr.map((el, idx) => {
			_basket.remove_cart(el).then((res) => {
				const { success, basket_list, count, calc } = res.data;
				if (success && basketIdArr.length - 1 === idx) {
					setCartList(basket_list);
					setCartCount(count);
					setCheckCount(count);
					setOrderCalc(calc);
					dispatch(cart_remove(count));
				} else {
					console.log(idx);
				}
			});
		});
	};

	return isLoading ? (
		<Spinner />
	) : (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>{user.name}님의 장바구니</Title>
				{cartCount > 0 ? (
					<CartContentWrap>
						<CartList
							checked={checked}
							setChecked={setChecked}
							cartList={cartList}
							setCartList={setCartList}
							cartCount={cartCount}
							setCartCount={setCartCount}
							setOrderCalc={setOrderCalc}
							allChecked={allChecked}
							setAllChecked={setAllChecked}
						/>
						<OrderBoxBox>
							<OrderBox
								orderCalc={orderCalc}
								user={user}
								cartList={cartList}
								checked={checked}
							/>
						</OrderBoxBox>
					</CartContentWrap>
				) : (
					<CartEmptyBox>
						<EmptyTitle>현재 장바구니 내역이 없습니다.</EmptyTitle>
						<EmptyBtn onClick={goShopping}>쇼핑하기</EmptyBtn>
					</CartEmptyBox>
				)}

				{cartCount > 0 && (
					<AllCheckAndRemove>
						<AllCheckImg
							alt="all check img"
							src={allChecked ? checkImg : uncheckImg}
							onClick={onAllCheck}
						/>
						<AllCheckText>
							전체선택 ( {checkCount} / {cartCount} )
						</AllCheckText>
						<RemoveBtn onClick={onSelectRemove}>선택삭제</RemoveBtn>
					</AllCheckAndRemove>
				)}
			</Container>
			<Footer />
		</div>
	);
};

export default CartPage;

const Container = styled.div`
	position: relative;
	width: 120rem;
	margin: 100px auto;
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
const CartContentWrap = styled.div`
	display: flex;
`;
const OrderBoxBox = styled.div`
	border: 1px solid #000;
	/* height: 100%; */
	margin-left: 4.8rem;
`;
const AllCheckAndRemove = styled.div`
	width: fit-content;
	display: flex;
	align-items: baseline;
	margin-right: auto;
	margin: 0.5rem auto 0 0;
`;
const AllCheckImg = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	margin: auto 1rem auto 0.8rem;
	cursor: pointer;
`;
const AllCheckText = styled.span`
	font-size: 1.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.48px;
	color: #221814;
`;
const RemoveBtn = styled.button`
	width: 7.1rem;
	height: 2.7rem;
	background-color: #fff;
	border: 1px solid #8e8e8e;
	border-radius: 4px;
	font-size: 1.2rem;
	letter-spacing: -0.24px;
	color: #8e8e8e;
	margin-left: 2rem;
`;
const CartEmptyBox = styled.div`
	width: fit-content;
	height: 17rem;
	margin: 10rem auto 34rem;
`;
const EmptyTitle = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -0.12rem;
	margin-bottom: 6rem;
`;
const EmptyBtn = styled.button`
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
	margin: 2rem 0 0 1rem;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
