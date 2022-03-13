import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IMG_ADDRESS } from '../../config';
import { cart_remove } from '../../modules/cart';
import * as _basket from '../../controller/basket';
import styled from 'styled-components';
import exit_btn from '../../images/exit_btn.svg';
import plus_btn from '../../images/count-plus.svg';
import minus_btn from '../../images/count-minus.svg';
import check_img from '../../images/check_btn.svg';
import uncheck_img from '../../images/uncheck_btn.svg';

const CartList = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (props.supplierList) {
			let tempCheckList = [];
			props.supplierList.forEach((el) => {
				tempCheckList = [...tempCheckList, ...el[1].product];
			});
			props.setChecked(tempCheckList);
			props.setTempChecked(tempCheckList);
		}
		// eslint-disable-next-line
	}, [props.supplierList]);

	const clickCheck = (el) => {
		const copyChecked = [...props.checked];
		const filterChecked = copyChecked.filter((x) => x !== el);
		if (copyChecked.includes(el)) {
			return props.setChecked(filterChecked);
		} else {
			copyChecked.push(el);
			return props.setChecked(copyChecked);
		}
	};

	const CheckedTest = (el) => {
		if (props.checked.includes(el)) {
			return true;
		} else {
			return false;
		}
	};

	const onRemove = (id) => {
		_basket.remove_cart(id).then((res) => {
			const { success, supplier_list, count, calc } = res.data;
			if (success) {
				props.setSupplierList(supplier_list);
				props.setCartCount(count);
				props.setOrderCalc(calc);
				dispatch(cart_remove());
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
		_basket.patch_cart(quantity, id).then((res) => {
			const { success, supplier_list, count, calc } = res.data;
			if (success) {
				props.setSupplierList(supplier_list);
				props.setCartCount(count);
				props.setOrderCalc(calc);
			}
		});
	};

	return (
		<CartListWrap>
			{props.supplierList &&
				props.supplierList.map((supplier, id) => (
					<SupplierBox key={id} wrap="true">
						<SupplierTitleAndCheckBox>
							<SupplierTitleBox>
								<SupplierTitle>판매자</SupplierTitle>
								<Supplier>{supplier[0]}</Supplier>
							</SupplierTitleBox>
						</SupplierTitleAndCheckBox>

						{supplier[1].product.map((el, idx) => (
							<ShadowBox key={idx}>
								<CheckImg
									onClick={() => {
										clickCheck(el);
									}}
									src={CheckedTest(el) ? check_img : uncheck_img}
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
											src={exit_btn}
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
												src={minus_btn}
												onClick={() => {
													onCount('minus', el.quantity, el.basket_id);
												}}
											/>
											<CountNum>{el.quantity}</CountNum>
											<RoundBtn
												alt="count button"
												src={plus_btn}
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
					</SupplierBox>
				))}
		</CartListWrap>
	);
};

export default CartList;

const CartListWrap = styled.div`
	margin: 3.3rem 0 0 3rem;
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
	margin-bottom: 5rem;
`;
const SupplierTitleBox = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	background-color: #fff;
	width: fit-content;
	padding-right: 1.2;
	top: -1.5rem;
`;
const SupplierBox = styled.div`
	position: relative;
	border-top: 1px solid #e0e0e0;
	padding-top: 2.35rem;
	${(props) => props.wrap && `margin-bottom: 4rem;`}
`;
const SupplierTitleAndCheckBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: start;
	align-items: flex-end;
`;

const SupplierTitle = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	letter-spacing: -0.64px;
	color: #6b6462;
	text-align: start;
	margin-right: 0.6rem;
`;
const Supplier = styled.p`
	font-size: 2rem;
	font-family: 'kr-b';
	letter-spacing: -0.8px;
	text-align: start;
	margin-right: 1.2rem;
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
