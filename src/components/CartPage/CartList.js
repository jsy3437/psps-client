import React from 'react';
import styled from 'styled-components';
import { IMG_ADDRESS } from '../../config';

import * as _basket from '../../controller/basket';

import exitBtn from '../../images/exit_btn.svg';
import plusBtn from '../../images/count-plus.svg';
import minusBtn from '../../images/count-minus.svg';
import checkImg from '../../images/check_btn.svg';
import uncheckImg from '../../images/uncheck_btn.svg';

const CartList = (props) => {
	const onChecked = (idx) => {
		let copy = [...props.checked];
		copy[idx] = !copy[idx];
		props.setChecked(copy);
	};

	const onRemove = (id) => {
		_basket.remove_cart(id).then((res) => {
			const { success, basket_list, count, calc } = res.data;
			if (success) {
				console.log(res.data);
				props.setCartList(basket_list);
				props.setCartCount(count);
				props.setOrderCalc(calc);
			}
		});
	};

	const onCount = (e, quantity, id) => {
		switch (e) {
			case 'minus':
				quantity !== 1 && submitQuantityPatch(quantity - 1, id);
				break;
			case 'plus':
				submitQuantityPatch(quantity + 1, id);
				break;
			// no default
		}
	};

	const submitQuantityPatch = (quantity, id) => {
		console.log(quantity, id);
		_basket.patch_cart(quantity, id).then((res) => {
			const { success, basket_list, count, calc } = res.data;
			if (success) {
				console.log(res.data);
				props.setCartList(basket_list);
				props.setCartCount(count);
				props.setOrderCalc(calc);
			}
		});
	};

	return (
		<CartListWrap>
			{props.cartList.map((el, idx) => (
				<ShadowBox key={idx}>
					<CheckImg
						onClick={() => {
							onChecked(idx);
						}}
						src={props.checked[idx] ? checkImg : uncheckImg}
						alt="check image"
					/>
					<ProductImg
						alt="product image"
						src={`${IMG_ADDRESS}/${el.product_image}`}
					/>
					<InfoBox>
						<ProductNameAndRemove>
							<ProductName>{el.product_title}</ProductName>
							<RoundBtn
								alt="remove button"
								src={exitBtn}
								onClick={() => {
									onRemove(el.basket_id);
								}}
							/>
						</ProductNameAndRemove>
						<Option>옵션 : {el.product_option_title}</Option>
						<CountAndPrice>
							<CountBox>
								<RoundBtn
									alt="count button"
									src={minusBtn}
									onClick={() => {
										onCount('minus', el.quantity, el.basket_id);
									}}
								/>
								<CountNum>{el.quantity}</CountNum>
								<RoundBtn
									alt="count button"
									src={plusBtn}
									onClick={() => {
										onCount('plus', el.quantity, el.basket_id);
									}}
								/>
							</CountBox>
							<PriceBox>
								<ExistingPrice>
									기존가{' '}
									<ExistingDeco>
										{el.total_price.toLocaleString()}원
									</ExistingDeco>
								</ExistingPrice>
								<DiscountPrice>
									{el.total.toLocaleString()}
									<DiscountWon>원</DiscountWon>
								</DiscountPrice>
							</PriceBox>
						</CountAndPrice>
					</InfoBox>
				</ShadowBox>
			))}
		</CartListWrap>
	);
};

export default CartList;

const CartListWrap = styled.div`
	margin-left: 3rem;
	width: 69.7rem;
`;
const ShadowBox = styled.div`
	width: 100%;
	height: 17.6rem;
	box-shadow: 2px 6px 18px #00000014;
	border-radius: 4px;
	display: flex;
	position: relative;
	margin-bottom: 2rem;
`;
const CheckImg = styled.img`
	position: absolute;
	width: 1.4rem;
	height: 1.4rem;
	top: 0.8rem;
	left: 0.8rem;
	cursor: pointer;
`;
const InfoBox = styled.div`
	margin: 1.7rem auto;
`;
const ProductImg = styled.img`
	width: 19.2rem;
	height: 100%;
`;
const ProductNameAndRemove = styled.div`
	width: 46.5rem;
	height: 4.5rem;
	display: flex;
	justify-content: space-between;
`;
const ProductName = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
`;
const RoundBtn = styled.img`
	width: 1.9rem;
	height: 1.9rem;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 50%;
	cursor: pointer;
`;
const Option = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.048rem;
	margin: 2.5rem 0;
`;
const CountAndPrice = styled.div`
	width: 46.5rem;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;
const CountBox = styled.div`
	width: 8.4rem;
	display: flex;
	align-items: center;
	letter-spacing: -0.096rem;
	color: #221814;
	font-size: 2.4rem;
	font-family: 'ro-b';
`;
const CountNum = styled.p`
	margin: 0 1.6rem;
`;
const PriceBox = styled.div`
	display: flex;
	align-items: baseline;
`;
const ExistingPrice = styled.p`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.56px;
	color: #a0a0a0;
`;
const ExistingDeco = styled.span`
	text-decoration: line-through;
`;
const DiscountPrice = styled.p`
	letter-spacing: -0.12rem;
	color: #e50011;
	font-family: 'ro-b';
	font-size: 3rem;
	margin-left: 0.8rem;
`;
const DiscountWon = styled.span`
	font-size: 2rem;
	margin-left: 0.1rem;
`;
