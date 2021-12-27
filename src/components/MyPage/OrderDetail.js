import React from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';

const OrderDetail = () => {
	return (
		<OrderDetailWrap>
			<Item>
				<TitleBox>
					<Title>주문내역</Title>
					<OrderNumber>{`주문번호 1300123123`}</OrderNumber>
				</TitleBox>
				<OrderInfo>
					<ProductImg alt='product img' src={ex1} />
					<OrderContents>
						<OrderTop>
							<OrderTopText date>{`2021.12.25 주문`}</OrderTopText>
							<OrderTopText state>{`배송준비중`}</OrderTopText>
						</OrderTop>
						<ProductName>{`맛있고 품질 좋은 양배추같이 생긴 풀이파리`}</ProductName>
						<ProductOption>{`무농약`}</ProductOption>
						<ProductCount>{`7130원 / 5개`}</ProductCount>
					</OrderContents>
					<ListButtons>
						<ListButton>배송조회</ListButton>
						<ListButton last>목록으로</ListButton>
						<ListButton last>교환, 반품 신청</ListButton>
					</ListButtons>
				</OrderInfo>
			</Item>
			<Item>
				<Title>받는 분</Title>
			</Item>
		</OrderDetailWrap>
	);
};

export default OrderDetail;

const OrderDetailWrap = styled.div`
	width: 69.7rem;
	height: 100rem;
	display: flex;
	flex-direction: column;
`;
const Item = styled.div`
	display: flex;
	flex-direction: column;
`;
const TitleBox = styled.div`
	margin-bottom: 1.2rem;
	height: 2.6rem;
	display: flex;
	align-items: flex-end;
`;
const Title = styled.p`
	height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #000000;
`;
const OrderNumber = styled.p`
	margin-left: 2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #000000;
`;
const OrderInfo = styled.div`
	margin-bottom: 2rem;
	width: 69.7rem;
	height: 17.6rem;
	background-color: #fff;
	box-shadow: 2px 6px 18px #00000014;
	border-radius: 4px;
	display: flex;
	&:nth-last-child(1) {
		margin: 0;
	}
`;
const ProductImg = styled.img`
	width: 27.5%;
	height: 100%;
`;
const OrderContents = styled.div`
	width: 47.5%;
	height: 100%;
	padding: 2rem;
`;
const OrderTop = styled.div`
	height: 2.4rem;
	display: flex;
	align-items: center;
	margin-bottom: 1.7rem;
`;
const OrderTopText = styled.p`
	height: 2.4rem;
	line-height: 2.4rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	${(props) => props.date && `color:#221814;`}
	${(props) => props.state && `color:#E50011; margin-left:2rem;`}
`;
const ProductName = styled.p`
	height: 4.2rem;
	line-height: 2.1rem;
	margin-bottom: 1.7rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 2;
	-moz-line-clamp: 2;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;
const ProductOption = styled.p`
	margin-bottom: 0.2rem;
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #221814;
`;
const ProductCount = styled.p`
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #221814;
`;
const ListButtons = styled.div`
	width: 25%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ListButton = styled.button`
	width: 13.5rem;
	height: 4rem;
	line-height: 4rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	margin-top: 0.6rem;
	border-radius: 4px;
	border: none;
	background-color: unset;
	${(props) =>
		props.last
			? `color:#E50011; border:1px solid #E50011;`
			: `margin-top:0; color:#fff; background-color:#221814`}
`;
// const
