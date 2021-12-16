import React, { useState } from 'react';
import styled from 'styled-components';
import Ex1 from '../images/ex1.png';
import AngleDown from '../images/angle-down.svg';
import Plus from '../images/count-plus.svg';
import Minus from '../images/count-minus.svg';

const OrderBox = () => {
	const [openOption, setOpenOption] = useState(false);
	const openOptionController = () => {
		setOpenOption(!openOption);
	};
	const optionArr = useState(['2봉지', '3봉지', '4봉지', '5봉지']);

	const [count, setCount] = useState(1);
	const increaseCount = () => {
		// 재고량과 비교
		setCount(count + 1);
	};
	const decreaseCount = () => {
		if (count !== 1) {
			setCount(count - 1);
		}
	};

	const [price, setPrice] = useState(3000);

	return (
		<BoxContainer>
			<Box>
				<BoxLeft>
					<BoxLeftImg alt='상품이미지' src={Ex1} />
				</BoxLeft>
				<BoxRight>
					<RightInside>
						<RightTitle>
							맛있고 품질 좋은 양배추같이 생긴 풀이파리 풀이파리 풀이파리
						</RightTitle>
						<RightPrice>{`${price * count}원`}</RightPrice>
						{!openOption ? (
							<RightOptionBox option>
								옵션이름
								<RightOptionTitle>옵션</RightOptionTitle>
								<RightButton option onClick={openOptionController}>
									<RightButtonImg src={AngleDown} />
								</RightButton>
							</RightOptionBox>
						) : (
							<RightOptionListBox>
								{optionArr.map((el, idx) => (
									<RightOptionList key={idx}>{el}</RightOptionList>
								))}
							</RightOptionListBox>
						)}

						<RightOptionBox count>
							<RightButton minus onClick={decreaseCount}>
								<RightButtonImg src={Minus} />
							</RightButton>
							{count}
							<RightOptionTitle>수량</RightOptionTitle>
							<RightButton plus onClick={increaseCount}>
								<RightButtonImg src={Plus} />
							</RightButton>
						</RightOptionBox>
						<UnitPriceBox>
							<UnitPriceLeft>{`기준가 ${price}원 (수량)`}</UnitPriceLeft>
							<UnitPriceRight>수량 당 단가</UnitPriceRight>
						</UnitPriceBox>
						<OrderButton>주문하기</OrderButton>
						<PutOnCartButton>장바구니 담기</PutOnCartButton>
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
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 2px 6px 10px #00000029;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	z-index: 10;
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
	${(props) => props.option && `position:absolute; top:15.3rem; `}
	${(props) => props.option && `margin-top:2rem;`}
	${(props) =>
		props.count &&
		`margin-top:2.2rem; margin-top:10.4rem;`} /* 리스트 갯수에 따라  */
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
	margin-bottom:2rem;
	width: 100%;
	height: 2.6rem;
	line-height: 2.6rem;
	display: flex;
	justify-content: space-between;\
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
