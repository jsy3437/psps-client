import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';
import OrderDetail from './OrderDetail';
import PageSelector from '../PageSelector';

const OrderHistory = (props) => {
	const [page, setPage] = useState(1);
	const total = props.paymentList.length;
	const onePage = 10;
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
					<PageSelector
						style={{ margin: '5.2rem 0 5.5rem 0' }}
						total={total}
						page={page}
						setPage={setPage}
						onePage={onePage}
					/>
				</OrderHistoryWrap>
			)}
			{props.paymentList.length > 0 && viewDetail && (
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
	margin-top: 2rem;
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
	position: relative;
	margin-bottom: 2rem;
	margin-top: 2rem;
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
const ListImg = styled.img`
	width: 27.5%;
	height: 100%;
`;
const ListContents = styled.div`
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
