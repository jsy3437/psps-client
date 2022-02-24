import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import { user_login } from '../../modules/user';
import logo from '../../images/red-logo.svg';

const ThirdStep = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const nameInput = useRef();
	const phoneNumberInput = useRef();
	const confirmNumberInput = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [confirmSend, setConfirmSend] = useState(false);
	const [confirm_number, setConfirm_number] = useState('');
	const [check, setCheck] = useState({
		name: false,
		phone_number: false,
		confirm_number: false,
	});
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		if (history.location.state) {
			const input = history.location.state;
			setEmail(input.email);
			setPassword(input.password);
		}
		// eslint-disable-next-line
	}, []);

	const goBack = () => {
		props.setStep(1);
	};

	const nameController = (e) => {
		regexp.name.test(e.target.value)
			? setCheck({ ...check, name: true })
			: setCheck({ ...check, name: false });
		return setName(e.target.value);
	};
	const phoneNumberController = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			regexp.phone_number.test(e.target.value)
				? setCheck({ ...check, phone_number: true })
				: setCheck({ ...check, phone_number: false });
			return setPhone_number(e.target.value);
		}
	};
	const confirmController = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			return setConfirm_number(e.target.value);
		}
	};

	const getConfirmNumber = () => {
		console.log({ phone_number });
		if (phone_number.length === 11) {
			_user.send_sms({ phone_number }).then((res) => {
				if (res.data.success) {
					alert('인증번호가 발송되었습니다.');
					confirmNumberInput.current.focus();
					setCheck({ ...check, confirm_number: false });
				} else {
					alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
				}
			});
			setConfirmSend(true);
		}
	};
	const checkConfirmNumber = () => {
		if (confirmSend && !check.confirm_number) {
			const data = {
				phone_number,
				code: confirm_number,
			};
			_user.check_sms(data).then((res) => {
				if (res.data.success) {
					setCheck({ ...check, confirm_number: true });
					return alert('인증 확인되었습니다.');
				} else {
					return alert('인증번호를 확인해주세요.');
				}
			});
		}
	};

	const onSubmit = () => {
		setIsSubmit(true);
		if (!regexp.name.test(name)) {
			setCheck({ ...check, name: false });
			alert('이름을 확인해주세요');
			nameInput.current.focus();
		} else if (!regexp.phone_number.test(phone_number)) {
			setCheck({ ...check, phone_number: false });
			alert('휴대폰번호를 확인해주세요');
			phoneNumberInput.current.focus();
		} else if (!check.confirm_number) {
			alert('휴대폰번호 인증을 확인해주세요');
			confirmNumberInput.current.focus();
		} else {
			const data = {
				email,
				password,
				name,
				phone_number,
			};
			// console.log(data);
			_user.register(data).then((res) => {
				// console.log(res.data);
				if (res.data.success) {
					props.setStep(4);
					// console.log(res.data);
					dispatch(user_login(res.data.name));
					history.push({ state: name });
				} else {
					console.log(res.data);
				}
			});
		}
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt="logo" src={logo} />
				<Title>품생품사 회원가입 - 정보입력</Title>
				<Items>
					<ItemTitle>이름</ItemTitle>
					<ItemInput
						ref={nameInput}
						onChange={nameController}
						placeholder="이름을 입력해주세요"
					/>
					{isSubmit && !check.name && (
						<InputError>{'이름을 확인해주세요'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>휴대폰번호</ItemTitle>
					<ItemInput
						type="text"
						ref={phoneNumberInput}
						maxLength="11"
						onChange={phoneNumberController}
						value={phone_number}
						placeholder="'-'을 제외한 휴대폰 번호를 입력해주세요."
					/>
					{isSubmit && !check.phone_number && (
						<InputError>{'휴대폰번호를 확인해주세요'}</InputError>
					)}
					<CheckButton
						active={phone_number.length === 11}
						onClick={getConfirmNumber}
					>
						인증하기
					</CheckButton>
				</Items>
				<Items>
					<ItemTitle>인증번호</ItemTitle>
					<ItemInput
						type="text"
						maxLength="6"
						ref={confirmNumberInput}
						value={confirm_number}
						onChange={confirmController}
						placeholder="인증번호를 입력해주세요"
					/>
					{/* {isSubmit && !check.confirm_number && (
						<InputError>{'인증번호를 확인해주세요'}</InputError>
					)} */}
					<CheckButton
						send={confirmSend}
						onClick={() => {
							checkConfirmNumber(confirm_number);
						}}
					>
						인증확인
					</CheckButton>
				</Items>

				<SubmitButton enter onClick={onSubmit}>
					가입하기
				</SubmitButton>
				<SubmitButton back onClick={goBack}>
					이전으로
				</SubmitButton>
			</RegisterInside>
		</Container>
	);
};

export default ThirdStep;

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const RegisterInside = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 0.8rem;
`;
const Title = styled.h2`
	height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 4rem;
`;
const Items = styled.div`
	width: 34.6rem;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 2rem;
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding: 0 0.5rem;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	background-color: #fff;
`;
const ItemInput = styled.input`
	width: 34.6rem;
	height: 6.2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding-left: 1.2rem;
	background-color: #fff;
	border-radius: 4px;
	border: 1px solid #c6c6c6;
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const InputError = styled.p`
	height: 1.5rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #e50011;
`;
const CheckButton = styled.button`
	width: 6.7rem;
	height: 2.8rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #c6c6c6;
	letter-spacing: -0.56px;
	position: absolute;
	top: 1.7rem;
	right: 12px;
	border-radius: 4px;
	border: 1px solid #c6c6c6;
	background-color: unset;
	cursor: default !important;
	${(props) =>
		(props.active || props.send) &&
		`border: 2px solid #111a31;color:#111a31; cursor:pointer !important;`}
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	${(props) =>
		props.enter && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
`;
