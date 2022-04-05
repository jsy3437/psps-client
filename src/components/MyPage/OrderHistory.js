import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import shadowImg from '../../images/shadow-box.svg';
import OrderDetail from './OrderDetail';
import PageSelector from '../PageSelector';

const OrderHistory = (props) => {
	const history = useHistory();
	const [page, setPage] = useState(1);

	const total = props.paymentList.length;
	const onePage = 10;
	// const [viewDetail, setViewDetail] = useState(false);

	useEffect(() => {
		if (props.payment_id) {
			props.setViewDetail(props.payment_id);
		}
		// eslint-disable-next-line
	}, [props.payment_id]);

	const goDetail = (payment_id) => {
		props.setViewDetail(payment_id);
	};

	const goShopping = () => {
		history.push('/product');
	};

	return (
		<MyPageInside>
			{props.paymentList.length === 0 && (
				<OrderHistoryWrap>
					<NothingText>현재 주문하신 내역이 없습니다.</NothingText>
					<GoShoppingButton onClick={goShopping}>쇼핑하기</GoShoppingButton>
				</OrderHistoryWrap>
			)}
			{props.paymentList.length > 0 && !props.viewDetail && (
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
								<ListImgBox>
									<ListImg
										alt="product image"
										src={`${IMG_ADDRESS}/${el.thumb}`}
									/>
									{el.name.includes(' 외 ') && (
										<ListShadowImg alt="shadow image" src={shadowImg} />
									)}
								</ListImgBox>
								<ListContents>
									<ProductName>{el.name}</ProductName>

									<DeliveryAddr>
										{`(${el.del_postcode}) ${el.del_addr.replace('/', ' ')}`}
									</DeliveryAddr>
									<PriceAndDetailBtnBox>
										<ProductTotalPrice>{`총 결제 금액 ${el.amount.toLocaleString()}원`}</ProductTotalPrice>
										<DetailBtn>상세내역보기</DetailBtn>
									</PriceAndDetailBtnBox>
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
			{props.paymentList.length > 0 && props.viewDetail && (
				<OrderDetail
					viewDetail={props.viewDetail}
					setViewDetail={props.setViewDetail}
				/>
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
	border-radius: 14px;
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
	border-radius: 24px;
	display: flex;
	cursor: pointer;
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
const ListImgBox = styled.div`
	position: relative;
	width: 19.2rem;
	width: 39%;
	height: 100%;
	border-radius: 24px;
	z-index: 1;
`;
const ListImg = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 24px;
`;
const ListShadowImg = styled.img`
	position: absolute;
	top: -0.6rem;
	left: -0.2rem;
	z-index: -1;
`;
const ListContents = styled.div`
	width: 100%;
	height: 100%;
	padding: 2rem;
`;

const ProductName = styled.p`
	max-width: 25rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #221814;
	text-overflow: ellipsis;
	overflow: hidden;
	margin-bottom: 0.4rem;
`;

const DeliveryAddr = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #6b6462;
`;
const PriceAndDetailBtnBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;
const ProductTotalPrice = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #221814;
	margin-top: 5.9rem;
`;
const DetailBtn = styled.button`
	width: 13.5rem;
	padding: 1.2rem;
	border-radius: 14px;
	border: none;
	background-color: #221814;
	color: #fff;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
`;
