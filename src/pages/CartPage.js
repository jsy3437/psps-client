import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cart_remove } from '../modules/cart';
import * as _basket from '../controller/basket';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import check_img from '../images/check_btn.svg';
import uncheck_img from '../images/uncheck_btn.svg';
import CartList from '../components/CartPage/CartList';
import OrderBox from '../components/CartPage/OrderBox';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const CartPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);
	const [supplierList, setSupplierList] = useState([]);
	const [allChecked, setAllChecked] = useState(true);
	const [cartList, setCartList] = useState([]);
	const [checked, setChecked] = useState([]);
	const [orderCalc, setOrderCalc] = useState([]);
	const [amount, setAmount] = useState(0);
	const [delivery_price, setDelivery_price] = useState(0);
	const [tempChecked, setTempChecked] = useState([]); // 공급원 리스트 각각의 모든상품들이 들어있는 임시배열
	const [cartCount, setCartCount] = useState(0);
	const [checkCount, setCheckCount] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		_basket.get_list().then((res) => {
			const { success, count, supplier_list } = res.data;
			if (isSubscribed && success) {
				setCartCount(count);
				setSupplierList(supplier_list);
			} else {
				alert('로그인 후 이용가능');
				return history.push('/login');
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, []);

	useEffect(() => {
		if (checked.length === cartCount) {
			setAllChecked(true);
		} else {
			setAllChecked(false);
		}
		setCheckCount(checked.length);
		settingOrderCalc();
	}, [checked]);

	// trans checked -> resetting calc
	function settingOrderCalc() {
		if (supplierList && checked) {
			let calcArr = [];
			let tempAmount = 0;
			let tempDeliveryPrice = 0;
			supplierList.map((supplier, id) => {
				let tempCalc = {
					supplier_name: supplierList[id] && supplierList[id][0],
					total: 0,
					delivery_price: 0,
					checked_product_list: [],
				};
				checked.map((el, idx) => {
					if (supplier[0] === el.supplier_name) {
						tempCalc.total += el.total;

						tempCalc.checked_product_list.push(el);

						if (tempCalc.delivery_price === 0) {
							tempCalc.delivery_price += 3000;
						}
					}
				});
				tempDeliveryPrice += tempCalc.delivery_price;
				calcArr.push(tempCalc);
				tempAmount += tempCalc.total;
			});

			setDelivery_price(tempDeliveryPrice);
			setAmount(tempAmount);
			setOrderCalc(calcArr);
		}
	}

	// make all checked or all unchecked
	const onAllCheck = () => {
		if (supplierList) {
			if (cartCount === checked.length) {
				return setChecked([]);
			} else {
				return setChecked([...tempChecked]);
			}
		}
	};

	const goShopping = () => {
		if (!user.login) {
			alert('로그인 후 이용가능합니다');
			return history.push('/login');
		}
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
		<div id='container'>
			<Container>
				<LogoImg alt='logo' src={logo} />
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
							setTempChecked={setTempChecked}
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
							alt='all check img'
							src={allChecked ? check_img : uncheck_img}
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
