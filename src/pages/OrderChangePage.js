import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as _payment from '../controller/payment';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import down from '../images/angle-down.svg';

const OrderChangePage = () => {
	const history = useHistory();
	const location = useLocation().state;
	const [claimType, setClaimType] = useState('');
	const [claimReason, setClaimReason] = useState('직접 입력');
	const [claimReasonText, setClaimReasonText] = useState('');
	const [bank, setBank] = useState('은행 선택');
	const [account, setAccount] = useState('');
	const [accountHolder, setAccountHolder] = useState('');
	const [check, setCheck] = useState({
		reasonText: '',
		bank: '',
		account: '',
		accountHolder: '',
	});

	const [claimReasonMenu, setClaimReasonMenu] = useState(false);
	const [bankMenu, setBankMenu] = useState(false);
	const [applyMenu, setApplyMenu] = useState(false);
	const [buttonState, setButtonState] = useState(false);

	const applyList = [
		{ en: 'exChange', kr: '교환 신청' },
		{ en: 'refund', kr: '반품 신청' },
	];
	const [applySelect, setApplySelect] = useState(applyList[0].kr);
	const ReasonItem = [
		'직접 입력',
		'다른 상품이랑 함께 주문 할 예정입니다.',
		'주문을 잘못했어요.',
	];
	const bankItem = [
		'농협',
		'우리은행',
		'국민은행',
		'새마을금고',
		'신한은행',
		'기업은행',
		'하나은행',
		'카카오뱅크',
	];

	useEffect(() => {
		if (!!!location) {
			alert('잘못된 접근입니다');
			history.goBack();
		} else {
			setClaimType(location.type);
		}
	}, []);

	useEffect(() => {
		let state = false;
		if (claimType === 'refund') {
			if (
				check.reasonText &&
				check.bank &&
				check.account &&
				check.accountHolder
			) {
				state = true;
			}
		} else if (claimType === 'cancel' || claimType === 'exchange') {
			if (check.reasonText) {
				state = true;
			}
		}
		setButtonState(state);
	}, [check]);

	// input onChange
	const changeClaimReasonText = (e) => {
		const { value } = e.target;
		setClaimReasonText(e.target.value);
		console.log(value.length);
		if (value.length > 0) {
			setCheck({ ...check, reasonText: true });
		} else {
			setCheck({ ...check, reasonText: false });
		}
	};

	const changeAccount = (e) => {
		const { value } = e.target;
		if (!isNaN(value)) {
			setAccount(value);
		}
		if (value.length > 10) {
			setCheck({ ...check, account: true });
		} else {
			setCheck({ ...check, account: false });
		}
	};

	const changeAccountHolder = (e) => {
		const { value } = e.target;
		setAccountHolder(value);
		if (value.length > 0) {
			setCheck({ ...check, accountHolder: true });
		} else {
			setCheck({ ...check, accountHolder: false });
		}
	};

	// menu open
	const openClaimReasonMenu = () => {
		setClaimReasonMenu(true);
	};
	const onReasonMenu = (e) => {
		const { innerText } = e.target;
		setClaimReason(innerText);
		setClaimReasonMenu(false);
		if (innerText === '직접 입력') {
			setClaimReasonText('');
			setCheck({ ...check, reasonText: false });
		} else {
			setClaimReasonText(innerText);
			setCheck({ ...check, reasonText: true });
		}
	};
	const openBankMenu = () => {
		setBankMenu(true);
	};
	const openApplyMenu = () => {
		setApplyMenu(true);
	};

	// menu onClick
	const onBankMenu = (e) => {
		setBank(e.target.innerText);
		setBankMenu(false);
		setCheck({ ...check, bank: true });
	};

	const onApplyMenu = (el) => {
		setClaimType(el.en);
		setApplySelect(el.kr);
		setApplyMenu(false);
	};

	const goMyPage = () => {
		history.goBack();
	};

	const onSubmit = () => {
		if (!buttonState) {
			return;
		}

		const data = {
			payment: location.detailPayment,
			payment_product_list: location.checkProductList,
			claim_reason: claimReasonText,
			// 횐불계좌
		};

		console.log(data);

		_payment.claim_cancel(data, claimType).then((res) => {
			const { success } = res.data;
			if (success) {
				console.log(res.data);
				alert('신청이 완료되었습니다');
				history.push({
					pathname: '/members',
					state: location.detailPayment.payment_id,
				});
			} else {
				alert('신청이 불가한 상품');
			}
		});
	};

	return (
		<div id='container'>
			{location && (
				<Container>
					<LogoImg alt='logo image' src={logo} />
					<Title>
						{location.type === 'cancel'
							? '주문 취소'
							: '교환 / 반품 신청'}
					</Title>
					{location.type !== 'cancel' && (
						<Item>
							<ItemTitle>신청 목록</ItemTitle>
							<InputAndMenuBox apply>
								<InputBox onClick={openApplyMenu}>
									<ColumnResult>{applySelect}</ColumnResult>
									<ColumnBtn alt='down button' src={down} />
								</InputBox>
								{applyMenu ? (
									<MenuBox>
										{applyList.map((el, idx) => (
											<MenuItem
												key={idx}
												onClick={() => {
													onApplyMenu(el);
												}}>
												{el.kr}
											</MenuItem>
										))}
									</MenuBox>
								) : null}
							</InputAndMenuBox>
						</Item>
					)}
					<Item>
						<ItemTitle>신청 사유</ItemTitle>
						<InputAndMenuBox>
							<InputBox onClick={openClaimReasonMenu}>
								<ColumnResult>{claimReason}</ColumnResult>
								<ColumnBtn alt='down button' src={down} />
							</InputBox>
							{claimReasonMenu ? (
								<MenuBox>
									{ReasonItem.map((el, idx) => (
										<MenuItem key={idx} onClick={onReasonMenu}>
											{el}
										</MenuItem>
									))}
								</MenuBox>
							) : null}
						</InputAndMenuBox>
						<TextArea
							placeholder='내용을 입력해주세요.'
							readOnly={claimReason !== '직접 입력'}
							onChange={changeClaimReasonText}
							value={claimReasonText}></TextArea>
						<AlertTextBox>
							{check.reasonText === false && (
								<AlertText>신청 사유를 입력해주세요.</AlertText>
							)}
						</AlertTextBox>
					</Item>
					{claimType === 'refund' && (
						<Item>
							<ItemTitle>환불 계좌</ItemTitle>
							<BankInputBox>
								<InputAndMenuBox bank>
									<InputBox bank onClick={openBankMenu}>
										<ColumnResult>{bank}</ColumnResult>
										<ColumnBtn bank alt='down button' src={down} />
									</InputBox>
									{bankMenu ? (
										<MenuBox>
											{bankItem.map((el, idx) => (
												<MenuItem key={idx} onClick={onBankMenu}>
													{el}
												</MenuItem>
											))}
										</MenuBox>
									) : null}
								</InputAndMenuBox>
								<Input
									type='text'
									maxLength='20'
									account
									placeholder='‘ - ‘를 제외한 계좌번호를 입력해주세요.'
									onChange={changeAccount}
									value={account}
								/>
							</BankInputBox>
							<AlertTextBox>
								{check.bank === false && (
									<AlertText>은행을 선택해주세요.</AlertText>
								)}
								{check.account === false && (
									<AlertText>계좌번호를 입력해주세요.</AlertText>
								)}
							</AlertTextBox>

							<AccountHolder>예금주</AccountHolder>
							<Input
								type='text'
								maxLength='30'
								placeholder='예금주를 입력해주세요.'
								onChange={changeAccountHolder}
								value={accountHolder}
							/>
							<AlertTextBox>
								{check.accountHolder === false && (
									<AlertText>예금주를 입력해주세요.</AlertText>
								)}
							</AlertTextBox>
						</Item>
					)}

					<BtnBox>
						<Button back onClick={goMyPage}>
							취소
						</Button>
						<SubmitButton enter={buttonState} onClick={onSubmit}>
							확인
						</SubmitButton>
					</BtnBox>
				</Container>
			)}
		</div>
	);
};

export default OrderChangePage;

const Container = styled.div`
	width: 51.9rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10rem auto;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin-bottom: 10rem;
`;
const BtnBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 5.3rem;
`;
const SubmitButton = styled.button`
	width: 24.9rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border-radius: 4px;
	transition: all 200ms ease;
	background-color: #fff;
	border: 1px solid #e50011;
	color: #e50011;
	opacity: 0.5;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	${(props) =>
		!props.enter &&
		`&:hover{
			background-color: #fff;
			color: #e50011;
			cursor: default;}`}
	${(props) => props.enter && `opacity: 1;`}
`;
const Button = styled.button`
	width: 24.9rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border-radius: 4px;
	transition: all 200ms ease;

	background-color: #221814;
	color: #fff;
	border: none;

	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
const Item = styled.div`
	width: 100%;
	margin-bottom: 2rem;
`;
const ItemTitle = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	margin-bottom: 1.2rem;
`;
const InputAndMenuBox = styled.div`
	position: relative;
	width: 100%;
	${(props) => props.bank && `width:19.2rem`}
`;
const InputBox = styled.div`
	position: relative;
	width: 100%;
	cursor: pointer;
	${(props) => props.bank && `width:19.2rem; margin-right:0.6rem`}
`;
const ColumnResult = styled.div`
	width: 100%;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	padding: 1.6rem 1.2rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #221814;
`;
const Input = styled.input`
	width: 100%;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	padding: 2.1rem 1.2rem;
	background-color: #fff;
	font-size: 1.4rem;
	letter-spacing: -0.56px;
	&::placeholder {
		color: #c6c6c6;
	}
	${(props) => props.account && `width:32.1rem`}
`;
const ColumnBtn = styled.img`
	position: absolute;
	top: 2.1rem;
	right: 2.7rem;
	width: 1.9rem;
	height: 1.9rem;
	border-radius: 50%;
	box-shadow: 0px 3px 6px #00000029;
	${(props) => props.bank && `right:1.2rem`}
`;
const TextArea = styled.textarea`
	resize: none;
	width: 100%;
	height: 16.3rem;
	padding: 2.1rem 1.2rem;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	margin-top: 1.6rem;
	font-size: 1.4rem;
	letter-spacing: -0.56px;
	${(props) =>
		props.readOnly &&
		`&:focus{
			border: 1px solid #c6c6c6;
			box-shadow:none
		}`}
	&::placeholder {
		color: #c6c6c6;
	}
`;
const BankInputBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const AccountHolder = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	margin: 3.2rem auto 0.6rem;
`;
const MenuBox = styled.div`
	position: absolute;
	width: 100%;
	max-height: 30rem;
	overflow-y: auto;
	border-radius: 4px;
	border: 1px solid #c6c6c6;
	top: 0;
	left: 0;
	background-color: #fff;
	padding: 0.9rem auto;
`;
const MenuItem = styled.p`
	width: 100%;
	padding: 1.6rem 1.2rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #221814;
	cursor: pointer;
	&:hover {
		font-family: 'kr-b';
	}
`;
const AlertTextBox = styled.div`
	height: 2rem;
	display: flex;
`;
const AlertText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #e50011;
	margin-right: 8rem;
`;
