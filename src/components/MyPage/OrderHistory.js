import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';
import OrderDetail from './OrderDetail';
import PageSelector from '../PageSelector';
<<<<<<< HEAD

const OrderHistory = () => {
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
	const [viewDetail, setViewDetail] = useState(true);
	const [detail, setDetail] = useState({});

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
					{list.map((el, idx) => (
						<OrderHistoryList key={idx}>
							<ListImg alt='product img' src={ex1} />
							<ListContents>
								<OrderTop>
									<OrderTopText date>{`${el.date} 주문`}</OrderTopText>
									<OrderTopText state>{el.state}</OrderTopText>
								</OrderTop>
								<ProductName>{el.name}</ProductName>
								<ProductOption>{el.option}</ProductOption>
								<ProductCount>{`${el.price}원 / ${el.count}개`}</ProductCount>
							</ListContents>
							<ListButtons>
								<ListButton>배송조회</ListButton>
								<ListButton>주문 상세보기</ListButton>
								<ListButton last>교환, 반품 신청</ListButton>
							</ListButtons>
						</OrderHistoryList>
					))}
=======
import * as _payment from '../../controller/payment';

const OrderHistory = (props) => {
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(props.paymentList.length);
	const [viewDetail, setViewDetail] = useState(false);

	const goDetail = (payment_id) => {
		setViewDetail(payment_id);
	};

	useEffect(() => {
		if (props.location.state) {
			setViewDetail(props.location.state);
		}
	}, [props.location.state]);

	return (
		<MyPageInside>
			{props.paymentList.length === 0 && (
				<OrderHistoryWrap>
					<NothingText>현재 주문하신 내역이 없습니다.</NothingText>
					<GoShoppingButton>쇼핑하기</GoShoppingButton>
				</OrderHistoryWrap>
			)}
			{props.paymentList.length > 0 && !viewDetail && (
				<OrderHistoryWrap>
					{props.paymentList &&
						props.paymentList.map((el, idx) => (
							<OrderHistoryList
								key={idx}
								onClick={() => {
									goDetail(el.payment_id);
								}}
							>
								<OrderTopDate>
									{el.create_at.split('T')[0]}
									<OrderId>・{el.payment_uid}</OrderId>
								</OrderTopDate>
								<ListImg alt="product img" src={ex1} />
								<ListContents>
									<ProductNameBox>
										<ProductName>{el.name}</ProductName>
										<ProductNameSpan>외 3건</ProductNameSpan>
									</ProductNameBox>
									<DeliveryAddr>
										{`(${el.del_postcode}) ${el.del_addr.split('/')[0]} ${
											el.del_addr.split('/')[1]
										}`}
									</DeliveryAddr>
									<ProductTotalPrice>{`총 결제 금액 ${el.amount.toLocaleString()}원`}</ProductTotalPrice>
								</ListContents>
							</OrderHistoryList>
						))}
>>>>>>> psps/seoyoon
					<PageSelector
						style={{ margin: '5.2rem 0 5.5rem 0' }}
						total={total}
						page={page}
						setPage={setPage}
					/>
<<<<<<< HEAD
					<GrayBackground />
				</OrderHistoryWrap>
			)}
			{list.length > 0 && viewDetail && <OrderDetail detail={detail} />}
=======
				</OrderHistoryWrap>
			)}
			{props.paymentList.length > 0 && viewDetail && (
				<OrderDetail viewDetail={viewDetail} setViewDetail={setViewDetail} />
			)}
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
=======
	margin-top: 2rem;
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
	margin-bottom: 2rem;
=======
	position: relative;
	margin-bottom: 2rem;
	margin-top: 2rem;
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
=======
const OrderTopDate = styled.p`
	position: absolute;
	font-size: 1.6rem;
	font-family: 'ro-b';
	letter-spacing: -0.64px;
	color: #221814;
	top: -2.5rem;
`;
const OrderId = styled.span`
	font-family: 'ro-r';
	color: #8e8e8e;
	margin-left: 0.2rem;
`;
>>>>>>> psps/seoyoon
const ListImg = styled.img`
	width: 27.5%;
	height: 100%;
`;
const ListContents = styled.div`
<<<<<<< HEAD
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
=======
	width: 100%;
	height: 100%;
	padding: 2rem;
`;
const ProductNameBox = styled.div`
	width: 31rem;
	display: flex;
	margin-bottom: 0.4rem;
	align-items: flex-end;
`;
const ProductName = styled.p`
	max-width: 25rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #221814;
	text-overflow: ellipsis;
	overflow: hidden;
`;
const ProductNameSpan = styled.span`
	font-size: 1.8rem;
	font-family: 'kr-r';
	margin-left: 0.2rem;
`;
const DeliveryAddr = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #6b6462;
`;
const ProductTotalPrice = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #221814;
	margin-top: 5.9rem;
`;

>>>>>>> psps/seoyoon
const GrayBackground = styled.div`
	width: 192rem;
	height: 37.3rem;
	background-color: #f2f2f2;
	z-index: -1;
	position: absolute;
<<<<<<< HEAD
	bottom: 0;
=======
	/* bottom: 0; */
	top: 13.5rem;
>>>>>>> psps/seoyoon
`;
