import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';
import * as _payment from '../../controller/payment';
import checkImg from '../../images/check_btn.svg';
import uncheckImg from '../../images/uncheck_btn.svg';
import { useHistory } from 'react-router-dom';

const OrderDetail = (props) => {
	const history = useHistory();
	const receiverInfo = ['받는분', '연락처', '받는주소', '배송요청사항'];
	const paymentInfo = ['결제수단', '총 상품가격', '배송비', '총 결제금액'];

	const [detailPayment, setDetailPayment] = useState('');
	const [detailProductList, setDetailProductList] = useState('');
	const [claimType, setClaimType] = useState('cancel');
	const [supplierList, setSupplierList] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const [allChecked, setAllChecked] = useState(false);

	useEffect(() => {
		let isSubscribed = true;
		if (props.viewDetail !== false) {
			_payment.get_detail(props.viewDetail).then((res) => {
				const { success, payment, payment_product_list, supplier_list } =
					res.data;
				console.log(res.data);
				if (isSubscribed && success) {
					setDetailProductList(payment_product_list);
					setDetailPayment(payment);
					setSupplierList(supplier_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.viewDetail]);

	useEffect(() => {
		if (detailProductList) {
			if (checkedList.length === detailProductList.length) {
				setAllChecked(true);
			} else {
				setAllChecked(false);
			}
		}
	}, [checkedList]);

	const goReceipt = () => {
		window.open(detailPayment.receipt_url, '_blank');
	};

	const goCheckedAndCancelOrExchange = async (el, e) => {
		let type;
		const { innerText } = e.target;

		if (innerText === '취소하기') {
			type = 'cancel';
		} else if (innerText === '교환 / 반품 / 환불') {
			type = 'exchange';
		}

		if (!submitStateTest(el.process, innerText)) {
			return alert('취소, 반품, 교환 불가');
		}

		history.push({
			pathname: '/claim',
			state: { type, checkProductList: [el], detailPayment },
		});
	};

	const submitStateTest = (state, text) => {
		console.log(state, text);
		let testResult = false;
		if (state === '입금전' && text === '취소하기') {
			testResult = true;
		} else if (state === '결제완료' && text === '취소하기') {
			testResult = true;
		} else if (state === '배송중' && text === '교환 / 반품 / 환불') {
			testResult = true;
		} else if (state === '배송완료' && text === '교환 / 반품 / 환불') {
			testResult = true;
		}
		return testResult;
	};

	const goCancelOrExchange = (e) => {
		const { innerText } = e.target;
		if (checkedList.length === 0) {
			return alert('제품을 선택해주세요');
		}
		let count = checkedList.length;
		checkedList.map((el) => {
			if (!submitStateTest(el.process, innerText)) {
				count--;
			}
		});

		if (count === checkedList.length) {
			let type;
			if (innerText && innerText === '취소하기') {
				type = 'cancel';
			} else if (innerText && innerText === '교환 / 반품 / 환불') {
				type = 'exchange';
			}

			history.push({
				pathname: '/claim',
				state: { type, checkProductList: checkedList, detailPayment },
			});
		} else {
			return alert('취소, 교환, 환불 불가인 상품이 있습니다');
		}

		// const data = {
		// 	payment: {
		// 		payment_id: detailPayment.payment_id,
		// 		delivery_price: detailPayment.del_price,
		// 		create_at: detailPayment.create_at,
		// 		user_id: detailPayment.user_id,
		// 		imp_id: detailPayment.imp_id,
		// 		name: detailPayment.name,
		// 		amount: detailPayment.amount,
		// 	},
		// 	payment_product_list: [el],
		// 	claim_reason: '잘못시켰네요 죄송합니다',
		// };

		// _payment.claim_cancel(data, claimType).then((res) => {
		// 	const { success, payment, payment_product_list, supplier_list } =
		// 		res.data;
		// 	if (success) {
		// 		console.log(res.data);
		// 		alert('상품 취소가 완료되었습니다');
		// 		setDetailProductList(payment_product_list);
		// 		setDetailPayment(payment);
		// 		setSupplierList(supplier_list);
		// 	} else {
		// 		alert(res.data);
		// 	}
		// });
	};

	const clickCheck = (el) => {
		const copyChecked = [...checkedList];
		const filterChecked = copyChecked.filter((x) => x !== el);
		if (copyChecked.includes(el)) {
			return setCheckedList(filterChecked);
		} else {
			copyChecked.push(el);
		}
		setCheckedList(copyChecked);
	};

	const testCheck = (el) => {
		if (checkedList.includes(el)) {
			return true;
		} else {
			return false;
		}
	};

	const ClickAllCheck = () => {
		if (detailProductList.length === checkedList.length) {
			return setCheckedList([]);
		} else {
			let tempCheckList = [];
			supplierList.map((supplier) => {
				supplier[1].product.map((el) => {
					tempCheckList.push(el);
				});
			});
			setCheckedList(tempCheckList);
		}
	};

	return (
		<OrderDetailWrap>
			<TitleBox>
				<Title top>주문내역</Title>
				<OrderDate>
					{detailPayment && detailPayment.create_at.split('T')[0]}
					<OrderNumber>{` ・ 주문번호 ${
						detailPayment && detailPayment.payment_uid
					}`}</OrderNumber>
				</OrderDate>
			</TitleBox>
			{supplierList &&
				supplierList.map((supplier, id) => (
					<Item first key={id}>
						<Supplier>
							<SupplierSpan>판매자</SupplierSpan>
							{supplier[0]}
						</Supplier>
						{supplier[1].product.map((el, idx) => (
							<OrderInfo key={idx}>
								<CheckImg
									alt="check image"
									src={testCheck(el) ? checkImg : uncheckImg}
									onClick={() => {
										clickCheck(el);
									}}
								/>
								<ProductImg alt="product img" src={ex1} />
								<OrderContents>
									<OrderState state={el.process}>{el.process}</OrderState>

									<ProductName>{el.name.split('|')[0]}</ProductName>
									<ProductOption>{el.name.split('|')[1]}</ProductOption>
									<ProductCount>{`${el.amount.toLocaleString()}원 / ${
										el.quantity
									}개`}</ProductCount>
								</OrderContents>
								<Buttons>
									<Button
										color={
											el.process === '배송중' || el.process === '배송완료'
												? 'black'
												: 'grey'
										}
									>
										배송조회
									</Button>
									<Button
										color={
											el.process === '배송중' ||
											el.process === '배송완료' ||
											el.process === '입금 전' ||
											el.process === '결제완료'
												? 'red'
												: 'white'
										}
										onClick={(e) => {
											goCheckedAndCancelOrExchange(el, e);
										}}
									>
										{el.process === '입금 전' || el.process === '결제완료'
											? '취소하기'
											: '교환 / 반품 / 환불'}
									</Button>
								</Buttons>
							</OrderInfo>
						))}
					</Item>
				))}
			<Item>
				<AllCheckingBox>
					<CheckImg
						allCheck
						alt="all check image"
						src={allChecked ? checkImg : uncheckImg}
						onClick={ClickAllCheck}
					/>
					<AllCheckInfo>{`전체선택 ( ${checkedList.length} / ${detailProductList.length} )`}</AllCheckInfo>
					<CancelBtn onClick={goCancelOrExchange}>취소하기</CancelBtn>
					<CancelBtn onClick={goCancelOrExchange}>교환 / 반품 / 환불</CancelBtn>
				</AllCheckingBox>
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
							<InfoContents>
								{detailPayment.card_name && detailPayment.card_name}
							</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[1]}</InfoItem>
							<InfoContents>
								{detailPayment.amount &&
									(
										detailPayment.amount - detailPayment.del_price
									).toLocaleString()}
							</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[2]}</InfoItem>
							<InfoContents>
								{detailPayment.del_price &&
									detailPayment.del_price.toLocaleString()}
							</InfoContents>
						</InfoList>

						<InfoList>
							<InfoItem>{paymentInfo[3]}</InfoItem>
							<InfoContents>
								{detailPayment.amount && detailPayment.amount.toLocaleString()}
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
			<RemoveButton>주문내역 삭제</RemoveButton>
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
	justify-content: space-between;
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
const OrderDate = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
`;
const OrderNumber = styled.span`
	color: #8e8e8e;
`;
const Supplier = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #6b6462;
	margin-bottom: 1.2rem;
`;
const SupplierSpan = styled.span`
	margin-right: 0.6rem;
	color: #a0a0a0;
`;
const OrderInfo = styled.div`
	position: relative;
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

const OrderState = styled.p`
	height: 2.4rem;
	margin-bottom: 0.8rem;
	line-height: 2.4rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #e50011;
	${(props) => props.state === '입금 전' && `color: #163495;`}
	${(props) => props.state === '결제완료' && `color: #163495;`}
	${(props) => props.state === '배송 중' && `color: #163495;`}
	${(props) => props.state === '배송완료' && `color: #163495;`}
	${(props) => props.state === '취소완료' && `color: #8E8E8E;`}
	${(props) => props.state === '환불완료' && `color: #8E8E8E;`}
`;
const ProductName = styled.p`
	height: 4.2rem;
	line-height: 2.1rem;
	margin-bottom: 2rem;
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
	background-color: #fff;
	color: #fff;
	${(props) =>
		props.color === 'black' &&
		`color:#fff; border:none;background-color:#221814;`}
	${(props) =>
		props.color === 'grey' &&
		`border:1px solid #A0A0A0; background-color:#A0A0A0; cursor:default !important;`} 
	${(props) => props.color === 'red' && `color:#E50011; border:1px solid #E50011`}
	${(props) =>
		props.color === 'white' &&
		`border:1px solid #A0A0A0; color:#A0A0A0;  cursor:default !important;`}
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
const CheckImg = styled.img`
	position: absolute;
	width: 1.4rem;
	height: 1.4rem;
	top: 0.8rem;
	left: 0.8rem;
	${(props) => props.allCheck && `position: static;`}
`;
const AllCheckingBox = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 4rem;
	margin-top: -2rem;
`;
const AllCheckInfo = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.48px;
	color: #221814;
	margin-right: 2rem;
	margin-left: 1rem;
`;
const CancelBtn = styled.button`
	height: 2.7rem;
	line-height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #8e8e8e;
	background-color: unset;
	border: 1px solid #8e8e8e;
	border-radius: 4px;
	padding: 0 1.2rem;
	margin-right: 0.8rem;
`;
const RemoveButton = styled.button`
	width: 14rem;
	border: 1px solid #e50011;
	border-radius: 4px;
	background-color: #fff;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #e50011;
	padding: 0.8rem 2.8rem;
	margin-left: auto;
	margin-bottom: -3.5rem;
`;
