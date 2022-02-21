import React, { useEffect, useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import * as _basket from '../../controller/basket';
import { cart_newData } from '../../modules/cart';
import angle_down from '../../images/angle-down.svg';
import increase from '../../images/count-plus.svg';
import decrease from '../../images/count-minus.svg';
import { useDispatch } from 'react-redux';

const OrderBox = (props) => {
	const dispatch = useDispatch();
	const [openOption, setOpenOption] = useState(false);
	const [option, setOption] = useState(props.optionList[0]);
	const [count, setCount] = useState(1);

	useEffect(() => {
		setOption(props.optionList[0]);
	}, [props.optionList]);

	const onChangeOption = (option) => {
		setOption(option);
		setOpenOption(false);
		setCount(1);
	};

	const decreaseCount = () => {
		count !== 1 && setCount(count - 1);
	};

	const increaseCount = () => {
		// 재고량과 비교
		setCount(count + 1);
	};

	const onAddCart = () => {
		if (!!!option) {
			return alert('옵션을 선택해주세요');
		}
		const data = {
			product_option_id: option.product_option_id,
			quantity: count,
		};
		_basket.add_cart(data).then((res) => {
			const { success, count } = res.data;
			console.log(res.data);
			if (success) {
				alert(
					`제품명: ${props.detail.title}\n옵션: ${option.title}\n장바구니에 담겼습니다.`
				);
				setOption(props.optionList[0]);
				dispatch(cart_newData(count));
			} else {
				alert(`장바구니에 이미 존재하는 상품입니다.`);
			}
		});
	};

	console.log(option);

	return (
		<BoxContainer ref={props.selectRef}>
			<Box>
				<BoxLeft>
					<BoxLeftImg
						alt="product img"
						src={
							props.detail.temp_image &&
							`${IMG_ADDRESS}/${props.detail.temp_image}`
						}
					/>
				</BoxLeft>
				<BoxRight>
					<RightInside>
						<RightTitle>{props.detail && props.detail.title}</RightTitle>
						<RightPriceBox>
							{option && option.discount !== 0 ? (
								<RightExisting>
									기존가
									<RightExistingSpan>
										{`${option && option.price.toLocaleString()}원`}
									</RightExistingSpan>
								</RightExisting>
							) : null}
							<RightPrice>
								{option &&
									((option.price - option.discount) * count).toLocaleString()}
								<RightPriceWon>원</RightPriceWon>
							</RightPrice>
						</RightPriceBox>
						<RightDeliveryPrice>
							배송비
							<DeliveryPriceSpan>3,000</DeliveryPriceSpan>원
						</RightDeliveryPrice>

						{!openOption ? (
							<RightOptionBox option>
								{option && option.title}
								<RightOptionTitle>옵션</RightOptionTitle>
								<RightButton
									option
									onClick={() => {
										setOpenOption(!openOption);
									}}
								>
									<RightButtonImg alt="" src={angle_down} />
								</RightButton>
							</RightOptionBox>
						) : (
							<RightOptionListBox>
								{props.optionList.map((el, idx) => (
									<RightOptionList
										key={idx}
										onClick={() => {
											onChangeOption(el);
										}}
									>
										{el.title}
									</RightOptionList>
								))}
							</RightOptionListBox>
						)}

						<RightOptionBox count>
							<RightButton minus onClick={decreaseCount}>
								<RightButtonImg alt="button" src={decrease} />
							</RightButton>
							{count}
							<RightOptionTitle>수량</RightOptionTitle>
							<RightButton plus onClick={increaseCount}>
								<RightButtonImg alt="button" src={increase} />
							</RightButton>
						</RightOptionBox>

						<SubmitButton orderBtn>{`${
							option &&
							((option.price - option.discount) * count + 3000).toLocaleString()
						}원 / 주문하기`}</SubmitButton>
						<SubmitButton cartBtn onClick={onAddCart}>
							장바구니 담기
						</SubmitButton>
					</RightInside>
				</BoxRight>
			</Box>
		</BoxContainer>
	);
};

export default OrderBox;

const BoxContainer = styled.div`
	width: 192rem;
	height: 67.3rem;
	display: flex;
	justify-content: center;
	background-color: #fff;
	position: relative;
`;
const Box = styled.div`
	width: 101.2rem;
	height: 55.2rem;
	display: flex;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 2px 6px 18px #00000029;
	border-radius: 4px;
	position: absolute;
	bottom: -5.4rem;
`;
const BoxLeft = styled.div`
	width: 59.28853754940711%;
	height: 100%;
`;
const BoxLeftImg = styled.img`
	width: 100%;
	height: 100%;
`;
const BoxRight = styled.div`
	width: 40.71146245059289%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RightInside = styled.div`
	width: 83.98058252427184%;
	height: 86.59420289855072%;
`;
const RightTitle = styled.p`
	height: 6.5rem;
	line-height: 3.25rem;
	font-size: 2.4rem;
	font-family: 'kr-b';
	color: #221814;
`;
const RightDeliveryPrice = styled.p`
	margin-top: 1.1rem;
	text-align: end;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #6b6462;
`;
const DeliveryPriceSpan = styled.span`
	font-size: 1.8rem;
	font-family: 'ro-r';
	margin-left: 1rem;
`;
const RightPriceBox = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: end;
`;
const RightPrice = styled.p`
	margin-top: 2rem;
	height: 3.7rem;
	line-height: 3.7rem;
	text-align: right;
	font-size: 3rem;
	font-family: 'ro-b';
	color: #e50011;
`;
const RightPriceWon = styled.span`
	font-size: 2rem;
`;
const RightExisting = styled.p`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.56px;
	color: #a0a0a0;
`;
const RightExistingSpan = styled.span`
	text-decoration: line-through;
	margin: 0 0.5rem 0 0.3rem;
`;
const RightOptionListBox = styled.ul`
	position: absolute;
	top: 20.3rem;
	width: 34.6rem;
	max-height: 18.6rem;
	display: flex;
	flex-direction: column;
	background: #ffffff;
	box-shadow: 2px 6px 10px #00000029;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	overflow-y: scroll;
	z-index: 10;
	transition: all 200ms ease;
`;
const RightOptionList = styled.li`
	width: 100%;
	height: 6.2rem;
	line-height: 6.2rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	cursor: pointer;
	/* border: 1px solid blue; */
	&:hover {
		font-family: 'kr-b';
	}
`;
const RightOptionBox = styled.div`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	color: #221814;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	text-align: center;
	${(props) => props.option && `position:absolute; top:19.3rem;  `}
	${(props) => props.option && `margin-top:2rem;`} 
	${(props) => props.count && `margin-top:10.4rem;`}
`;
const RightOptionTitle = styled.p`
	width: 3.2rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	position: absolute;
	top: -1.4rem;
	left: 1.2rem;
	background-color: #fff;
`;
const RightButton = styled.div`
	width: 1.9rem;
	height: 1.9rem;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 100%;
	position: absolute;
	right: 2.7rem;
	cursor: pointer;
	${(props) => (props.option || props.plus ? `right:2.7rem` : `left:2.7rem;`)}
`;
const RightButtonImg = styled.img`
	width: 100%;
	height: 100%;
	display: flex;
`;
// const UnitPriceBox = styled.div`
// 	margin-top: 0.8rem;
// 	margin-bottom: 2rem;
// 	width: 100%;
// 	height: 2.6rem;
// 	line-height: 2.6rem;
// 	display: flex;
// 	justify-content: space-between;
// `;
// const UnitPriceLeft = styled.p`
// 	font-size: 1.8rem;
// 	font-family: 'kr-r';
// 	color: #6b6462;
// `;
// const UnitPriceRight = styled.p`
// 	font-size: 1.4rem;
// 	font-family: 'kr-r';
// 	color: #a0a0a0;
// `;
// const OrderButton = styled.button`
// 	margin: 2.5rem auto 1.2rem;
// 	width: 34.6rem;
// 	height: 6.2rem;
// 	line-height: 6.2rem;
// 	font-size: 2.4rem;
// 	font-family: 'kr-r';
// 	color: #fff;
// 	letter-spacing: -0.96px;
// 	border: none;
// 	border-radius: 4px;
// 	&:hover {
// 		background-color: #e50011;
// 	}
// `;
// const PutOnCartButton = styled.button`
// 	width: 34.6rem;
// 	height: 6.2rem;
// 	line-height: 6.2rem;
// 	font-size: 2.4rem;
// 	font-family: 'kr-r';
// 	letter-spacing: -0.96px;
// 	border: none;
// 	border: 1px solid #e50011;
// 	border-radius: 4px;
// 	&:hover {
// 		background-color: #e50011;
// 		color: #fff;
// 	}
// `;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #fff;
	letter-spacing: -0.96px;
	border: none;
	background: #221814 0% 0% no-repeat padding-box;
	border-radius: 4px;
	${(props) =>
		props.cartBtn &&
		`background: #ffffff 0% 0% no-repeat padding-box;	color: #e50011;	border: 1px solid #e50011;`}
	${(props) => props.orderBtn && `margin: 2.5rem auto 1.2rem;`}
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
