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

	return (
		<BoxContainer>
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
						<RightPrice>
							{option && `${(option.price - option.discount) * count}원`}
						</RightPrice>
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
						<UnitPriceBox>
							<UnitPriceLeft>
								{option && `기준가 ${option.price - option.discount}원 (수량)`}
							</UnitPriceLeft>
							<UnitPriceRight>수량 당 단가</UnitPriceRight>
						</UnitPriceBox>
						<OrderButton>주문하기</OrderButton>
						<PutOnCartButton onClick={onAddCart}>장바구니 담기</PutOnCartButton>
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
const RightPrice = styled.p`
	margin-top: 2rem;
	height: 3.7rem;
	line-height: 3.7rem;
	text-align: right;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #e50011;
`;
const RightOptionListBox = styled.ul`
	position: absolute;
	top: 16.3rem;
	width: 34.6rem;
	height: 18.6rem;
	display: flex;
	flex-direction: column;
	background: #ffffff;
	box-shadow: 2px 6px 10px #00000029;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	overflow-y: scroll;
	z-index: 10;
	/* border: 1px solid blue; */
	/* 리스트 갯수에 따라 */
`;
const RightOptionList = styled.li`
	width: 100%;
	height: 6.2rem;
	line-height: 6.2rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
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
	${(props) => props.option && `position:absolute; top:15.3rem;  `}
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
const UnitPriceBox = styled.div`
	margin-top: 0.8rem;
	margin-bottom: 2rem;
	width: 100%;
	height: 2.6rem;
	line-height: 2.6rem;
	display: flex;
	justify-content: space-between;
`;
const UnitPriceLeft = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #6b6462;
`;
const UnitPriceRight = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #a0a0a0;
`;
const OrderButton = styled.button`
	margin-bottom: 1.2rem;
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
	&:hover {
		background-color: #e50011;
	}
`;
const PutOnCartButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #e50011;
	letter-spacing: -0.96px;
	border: none;
	border: 1px solid var(--unnamed-color-e50011);
	background: #ffffff 0% 0% no-repeat padding-box;
	border: 1px solid #e50011;
	border-radius: 4px;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
