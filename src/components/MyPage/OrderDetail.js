import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';
import * as _payment from '../../controller/payment';

const OrderDetail = (props) => {
	const receiverInfo = ['받는분', '연락처', '받는주소', '배송요청사항'];
	const paymentInfo = ['결제수단', '총 상품가격', '배송비', '총 결제금액'];
	const [detailPayment, setDetailPayment] = useState('');
	const [detailProductList, setDetailProductList] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		if (props.viewDetail !== false) {
			_payment.get_detail(props.viewDetail).then((res) => {
				console.log(res.data);
				const { success, payment, payment_product_list } = res.data;
				if (isSubscribed && success) {
					setDetailProductList(payment_product_list);
					setDetailPayment(payment);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.viewDetail]);

	const goHistory = () => {
		props.setViewDetail(false);
	};

	const goReceipt = () => {
		window.open(detailPayment.receipt_url, '_blank');
	};

	return (
		<OrderDetailWrap>
			<Item first>
				<TitleBox>
					<Title top>주문내역</Title>
					<OrderNumber>{`주문번호 1300123123`}</OrderNumber>
				</TitleBox>

				{detailProductList &&
					detailProductList.map((el, idx) => (
						<OrderInfo key={idx}>
							<ProductImg alt="product img" src={ex1} />
							<OrderContents>
								<OrderTop>
									<OrderTopText date>
										{detailPayment && detailPayment.create_at.split('T')[0]}{' '}
										주문
									</OrderTopText>
									<OrderTopText state>{`배송준비중`}</OrderTopText>
								</OrderTop>
								<ProductName>{el.name.split('|')[0]}</ProductName>
								<ProductOption>{el.name.split('|')[1]}</ProductOption>
								<ProductCount>{`${el.amount.toLocaleString()}원 / ${
									el.quantity
								}개`}</ProductCount>
							</OrderContents>
							<Buttons>
								<Button>배송조회</Button>
								<Button red onClick={goHistory}>
									목록으로
								</Button>
								<Button red>교환, 반품 신청</Button>
							</Buttons>
						</OrderInfo>
					))}
			</Item>
			<Item>
				<Title>받는 분</Title>
				{detailPayment && (
					<InfoWrap>
						<InfoList>
							<InfoItem>{receiverInfo[0]}</InfoItem>
							<InfoContents>{detailPayment.del_name}</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{receiverInfo[1]}</InfoItem>
							<InfoContents>{detailPayment.del_tel}</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{receiverInfo[2]}</InfoItem>
							<InfoContents>{detailPayment.del_addr}</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{receiverInfo[3]}</InfoItem>
							<InfoContents>{detailPayment.del_req}</InfoContents>
						</InfoList>
					</InfoWrap>
				)}
			</Item>
			<Item>
				<Title>결제 정보</Title>
				{detailPayment && (
					<InfoWrap>
						<InfoList>
							<InfoItem>{paymentInfo[0]}</InfoItem>
							<InfoContents>{detailPayment.card_name}</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[1]}</InfoItem>
							<InfoContents>
								{detailPayment.amount.toLocaleString()}
							</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[2]}</InfoItem>
							<InfoContents>
								{detailPayment.del_price.toLocaleString()}
							</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[3]}</InfoItem>
							<InfoContents>
								{(
									detailPayment.amount - detailPayment.del_price
								).toLocaleString()}
							</InfoContents>
						</InfoList>
					</InfoWrap>
				)}
			</Item>
			<Item>
				<Title>결제영수증 정보</Title>
				<InfoWrap>
					<InfoReceiptList>
						<InfoReceiptText>
							해당 주문건에 대해 구매 카드영수증 확인이 가능합니다.
						</InfoReceiptText>
						<InfoReceiptButton onClick={goReceipt}>
							카드영수증
						</InfoReceiptButton>
					</InfoReceiptList>
				</InfoWrap>
			</Item>
			<Button red>주문내역 삭제</Button>
		</OrderDetailWrap>
	);
};

export default OrderDetail;

const OrderDetailWrap = styled.div`
	width: 69.7rem;
	display: flex;
	flex-direction: column;
	position: relative;
`;
const Item = styled.div`
	display: flex;
	flex-direction: column;
	${(props) => (props.first ? `margin-bottom:4rem;` : `margin-bottom:3rem;`)}
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
	margin-bottom: 1.25rem;
	${(props) => props.top && `margin-bottom:0`}
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
const Buttons = styled.div`
	width: 25%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const Button = styled.button`
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
		props.red
			? `color:#E50011; border:1px solid #E50011;`
			: `margin-top:0; color:#fff; background-color:#221814`}
`;
const InfoWrap = styled.ul`
	width: 100%;
	/* height: 13.7rem; */
	margin: 0;
	padding: 1.65rem 0;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
`;
const InfoList = styled.li`
	width: 100%;
	height: 2.8rem;
	line-height: 2.8rem;
	display: flex;
	align-items: center;
`;
const InfoItem = styled.p`
	width: 10rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
`;
const InfoContents = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
`;
const InfoReceiptList = styled.li`
	height: 5.6rem;
	line-height: 5.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const InfoReceiptText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
`;
const InfoReceiptButton = styled.button`
	width: 8rem;
	height: 2.7rem;
	line-height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #8e8e8e;
	background-color: unset;
	border: 1px solid #8e8e8e;
	border-radius: 4px;
`;
