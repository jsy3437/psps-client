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
	const [isLoading, setIsLoading] = useState(false);
	const [supplierList, setSupplierList] = useState([]);
	const [allChecked, setAllChecked] = useState([]);
	const [cartList, setCartList] = useState([]);
	const [checked, setChecked] = useState([]);
	const [orderCalc, setOrderCalc] = useState([]);
	const [amount, setAmount] = useState(0);
	const [delivery_price, setDelivery_price] = useState(0);

	const [cartCount, setCartCount] = useState('');

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		_basket.get_list().then((res) => {
			const { success, count, basket_list, calc, supplier_list } = res.data;
			if (isSubscribed && success) {
				setCartCount(count);

				setSupplierList(supplier_list);
			} else {
				alert('잘못된 접근입니다');
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, []);

	useEffect(() => {
		if (!!supplierList) {
			const allCheckTemp = new Array(supplierList.length).fill(true);
			setAllChecked(allCheckTemp);
			onAllCheck();
			// settingOrderCalc();
		}
	}, [supplierList]);

	useEffect(() => {
		if (checked.length !== 0) {
			let copyAllChecked = [...allChecked];
			checked.map((el, idx) => {
				if (allChecked[idx] && productCheckTest(el.arr, false)) {
					copyAllChecked[idx] = false;
				} else if (!allChecked[idx] && productCheckTest(el.arr, true))
					copyAllChecked[idx] = true;
			});
			setAllChecked(copyAllChecked);
			settingOrderCalc();
		}
	}, [checked]);

	// Test if there is a checked state different from allChecked
	function productCheckTest(checkedArr, boolean) {
		if (checkedArr) {
			const test = checkedArr.filter((el) => el === boolean);
			if (!boolean && test.length !== 0) {
				if (test.length !== 0 || test.length !== checkedArr.length) return true;
			} else if (boolean && test.length === checkedArr.length) {
				return true;
			}
			return false;
		}
	}

	// trans checked -> resetting calc
	function settingOrderCalc() {
		if (supplierList && checked) {
			let calcArr = [];
			let tempAmount = 0;
			let tempDelivery = 0;

			checked.map((checkedArr, id) => {
				let tempCalc = {
					supplier_name: supplierList[id] && supplierList[id][0],
					total: 0,
					delivery_price: 0,
					checked_product_list: [],
				};
				checkedArr.arr.map((el, idx) => {
					if (el) {
						tempCalc.total += supplierList[id][1].product[idx].total;
						tempCalc.checked_product_list.push(
							supplierList[id][1].product[idx]
						);

						if (tempCalc.delivery_price === 0) {
							tempCalc.delivery_price += 3000;
						}
					}
				});

				calcArr.push(tempCalc);
				tempAmount += tempCalc.total;
				tempDelivery += tempCalc.delivery_price;
			});

			setDelivery_price(tempDelivery);
			setAmount(tempAmount);
			setOrderCalc(calcArr);
		}
	}

	// make all checked or all unchecked
	const onAllCheck = () => {
		if (supplierList) {
			let checkArr;
			const supplierArr = new Array(supplierList.length).fill('');

			if (allChecked && !!checked) {
				supplierList.map((x, idx) => {
					checkArr = new Array(x[1].product.length).fill(true);
					supplierArr[idx] = { supplier_name: x[0], arr: checkArr };
				});
				return setChecked(supplierArr);
			} else if (allChecked) {
				supplierList.map((x, idx) => {
					checkArr = new Array(x[1].product.length).fill(false);
					supplierArr[idx] = { supplier_name: x[0], arr: checkArr };
				});
			} else if (!allChecked) {
				supplierList.map((x, idx) => {
					checkArr = new Array(x[1].product.length).fill(true);
					supplierArr[idx] = { supplier_name: x[0], arr: checkArr };
				});
			}

			setChecked(supplierArr);
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
					setOrderCalc(calc);
					dispatch(cart_remove(count));
				} else {
					console.error(idx);
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
							supplierList={supplierList}
							setSupplierList={setSupplierList}
						/>
						<OrderBoxBox>
							<OrderBox
								orderCalc={orderCalc}
								user={user}
								cartList={cartList}
								checked={checked}
								supplierList={supplierList}
								amount={amount}
								delivery_price={delivery_price}
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
							전체선택 ( {cartCount} / {cartCount} )
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
	margin: auto 1rem 0.5rem 1.2rem;
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
