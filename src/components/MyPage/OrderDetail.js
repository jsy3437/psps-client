import React from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';

const OrderDetail = () => {
	const receiverInfo = [
		{ title: '받는분', contents: '최준영' },
		{ title: '연락처', contents: '01050074116' },
		{
			title: '받는주소',
			contents: '(15461)경기도 안산시 단원구 광덕서로 102 406-7호(고잔동)',
		},
		{ title: '배송요청사항', contents: '문 앞에 두고 문자 주세요.' },
	];
	const paymentInfo = [
		{ title: '결제수단', contents: '비씨카드' },
		{ title: '총 상품가격', contents: '7130원' },
		{ title: '배송비', contents: '0원' },
		{ title: '총 결제금액', contents: '7130원' },
	];

	return (
		<OrderDetailWrap>
			<Item first>
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
					<Buttons>
						<Button>배송조회</Button>
						<Button red>목록으로</Button>
						<Button red>교환, 반품 신청</Button>
					</Buttons>
				</OrderInfo>
			</Item>
			<Item>
				<Title>받는 분</Title>
				<InfoWrap>
					{receiverInfo.map((el, idx) => (
						<InfoList key={idx}>
							<InfoItem>{el.title}</InfoItem>
							<InfoContents>{el.contents}</InfoContents>
						</InfoList>
					))}
				</InfoWrap>
			</Item>
			<Item>
				<Title>결제 정보</Title>
				<InfoWrap>
					{paymentInfo.map((el, idx) => (
						<InfoList key={idx}>
							<InfoItem>{el.title}</InfoItem>
							<InfoContents>{el.contents}</InfoContents>
						</InfoList>
					))}
				</InfoWrap>
			</Item>
			<Item>
				<Title>결제영수증 정보</Title>
				<InfoWrap>
					<InfoReceiptList>
						<InfoReceiptText>
							해당 주문건에 대해 구매 카드영수증 확인이 가능합니다.
						</InfoReceiptText>
						<InfoReceiptButton>카드영수증</InfoReceiptButton>
					</InfoReceiptList>
					<InfoReceiptList>
						<InfoReceiptText>
							해당 주문건에 대해 거래명세서 확인이 가능합니다.
						</InfoReceiptText>
						<InfoReceiptButton>거래명세서</InfoReceiptButton>
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
	height: 100rem;
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
	height: 13.7rem;
	margin: 0;
	padding: 0.85rem 0;
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
	line-height: 2.7rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #8e8e8e;
	background-color: unset;
	border: 1px solid #8e8e8e;
	border-radius: 4px;
`;
