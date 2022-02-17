import React, { useState } from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';
import OrderDetail from './OrderDetail';
import PageSelector from '../PageSelector';
import * as _payment from '../../controller/payment';

const OrderHistory = (props) => {
	const list = Array(5).fill({
		date: '2021.12.24',
		name: '맛있고 품질 좋은 양배추같이 생긴 풀이파리 맛있고 품질 좋은 양배추같이 생긴 풀이파리 맛있고 품질 좋은 양배추같이 생긴 풀이파리 ',
		state: '배송준비중',
		contents: '7130원/5개',
		option: '무농약',
		price: '7130',
		count: '5',
	});
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(list.length);
	const [viewDetail, setViewDetail] = useState(false);

	const goDetail = (payment_id) => {
		setViewDetail(payment_id);
	};

	return (
		<MyPageInside>
			{list.length === 0 && (
				<OrderHistoryWrap>
					<NothingText>현재 주문하신 내역이 없습니다.</NothingText>
					<GoShoppingButton>쇼핑하기</GoShoppingButton>
					<GrayBackground />
				</OrderHistoryWrap>
			)}
			{list.length > 0 && !viewDetail && (
				<OrderHistoryWrap>
					{props.paymentList &&
						props.paymentList.map((el, idx) => (
							<OrderHistoryList key={idx}>
								<ListImg alt="product img" src={ex1} />
								<ListContents>
									<OrderTop>
										<OrderTopText date>{`${
											el.create_at.split('T')[0]
										} 주문`}</OrderTopText>
										<OrderTopText state>{el.process}</OrderTopText>
									</OrderTop>
									<ProductName>{el.name}</ProductName>
									{/* <ProductOption>{el.option}</ProductOption> */}
									<ProductCount>{`${el.amount}원`}</ProductCount>
								</ListContents>
								<ListButtons>
									<ListButton>배송조회</ListButton>
									<ListButton
										onClick={() => {
											goDetail(el.payment_id);
										}}
									>
										주문 상세보기
									</ListButton>
									<ListButton last>교환, 반품 신청</ListButton>
								</ListButtons>
							</OrderHistoryList>
						))}
					<PageSelector
						style={{ margin: '5.2rem 0 5.5rem 0' }}
						total={total}
						page={page}
						setPage={setPage}
					/>
					<GrayBackground />
				</OrderHistoryWrap>
			)}
			{list.length > 0 && viewDetail && (
				<OrderDetail viewDetail={viewDetail} setViewDetail={setViewDetail} />
			)}
		</MyPageInside>
	);
};

export default OrderHistory;

const MyPageInside = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin-bottom: 7.7rem;
`;
const OrderHistoryWrap = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const NothingText = styled.p`
	height: 4.4rem;
	line-height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000;
	margin-top: 9.2rem;
	margin-bottom: 6rem;
`;
const GoShoppingButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	margin-bottom: 27rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #fff;
	letter-spacing: -0.96px;
	border: none;
	background-color: #221814;
`;
const OrderHistoryList = styled.li`
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
const ListImg = styled.img`
	width: 27.5%;
	height: 100%;
`;
const ListContents = styled.div`
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
	margin-bottom: 0.6rem;
	border-radius: 4px;
	border: none;
	background-color: unset;
	${(props) =>
		props.last
			? `margin-bottom:0; color:#E50011; border:1px solid #E50011;`
			: `color:#fff; background-color:#221814`}
`;
const GrayBackground = styled.div`
	width: 192rem;
	height: 37.3rem;
	background-color: #f2f2f2;
	z-index: -1;
	position: absolute;
	bottom: 0;
`;
