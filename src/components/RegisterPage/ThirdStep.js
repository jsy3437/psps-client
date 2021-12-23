import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { regexp } from '../../data/regexp';
import * as request from '../../controller/user';
import styled from 'styled-components';
import Logo from '../../images/red-logo.svg';

const ThirdStep = (props) => {
	const history = useHistory();
	const nameInput = useRef();
	const phoneNumberInput = useRef();
	const confirmNumberInput = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [confirmActive, setConfirmActive] = useState(false);
	const [confirmSend, setConfirmSend] = useState(false);
	const [confirmNumber, setConfirmNumber] = useState('');
	const [check, setCheck] = useState({
		name: true,
		phone_number: true,
		// confirm_number: true,
	});
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		if (history.location.state) {
			setEmail(history.location.state.email);
			setPassword(history.location.state.password);
		}
		// eslint-disable-next-line
	}, []);

	const goBack = () => {
		props.getStep(1);
	};
	const nameController = (e) => {
		regexp.name.test(e.target.value)
			? setCheck({ ...check, name: true })
			: setCheck({ ...check, name: false });
		return setName(e.target.value);
	};
	const phoneNumberController = (e) => {
		if (e.target.value.length === 11) {
			setConfirmActive(true);
		} else {
			setConfirmActive(false);
		}
		regexp.phone_number.test(e.target.value)
			? setCheck({ ...check, phone_number: true })
			: setCheck({ ...check, phone_number: false });
		return setPhone_number(e.target.value);
	};
	const confirmController = (e) => {
		// regexp.confirm_number.test.test(e.target.value)
		// 	? setCheck({ ...check, confirm_number: true })
		// 	: setCheck({ ...check, confirm_number: false });
		return setConfirmNumber(e.target.value);
	};

	const getConfirmNumber = () => {
		if (confirmActive) {
			// 인증하기
			alert('인증번호 1234');
			setConfirmSend(true);
		} else {
			return alert('휴대폰 번호를 정확하게 입력해주세요.');
		}
	};
	const checkConfirmNumber = () => {
		// 인증번호와 입력된 값이 같을 경우
		return alert('인증 확인되었습니다.');
		// 아닐 경우
		// return alert('인증번호를 확인해주세요.');
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
		}
		// if(인증번호가 안맞으면){}
		else {
			const Data = { email, password, name, phone_number };
			console.log(Data);
			request.register(Data).then((res) => {
				console.log(res.data);
				if (res.data.success) {
					props.getStep(4);
					history.push({ state: name });
				}
			});
		}
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt='로고이미지' src={Logo} />
				<Title>품생품사 회원가입-정보입력</Title>
				<Items>
					<ItemTitle>이름</ItemTitle>
					<ItemInput
						ref={nameInput}
						onChange={nameController}
						placeholder='이름을 입력해주세요'
					/>
					{isSubmit && !check.name && (
						<InputError>{'이름을 확인해주세요'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>휴대폰번호</ItemTitle>
					<ItemInput
						type='number'
						ref={phoneNumberInput}
						onChange={phoneNumberController}
						placeholder='휴대폰번호를 입력해주세요'
					/>
					{isSubmit && !check.phone_number && (
						<InputError>{'휴대폰번호를 확인해주세요'}</InputError>
					)}
					<CheckButton active={confirmActive} onClick={getConfirmNumber}>
						인증하기
					</CheckButton>
				</Items>
				<Items>
					<ItemTitle>인증번호</ItemTitle>
					<ItemInput
						ref={confirmNumberInput}
						onChange={confirmController}
						placeholder='인증번호를 입력해주세요'
					/>
					{/* {isSubmit && !check.confirm_number && (
						<InputError>{'인증번호를 확인해주세요'}</InputError>
					)} */}
					<CheckButton
						send={confirmSend}
						onClick={() => {
							checkConfirmNumber(confirmNumber);
						}}>
						인증확인
					</CheckButton>
				</Items>

				<SubmitButton
					enter
					// onClick={goNext}
					onClick={onSubmit}>
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
	${(props) =>
		(props.active || props.send) &&
		`border: 2px solid #111a31;color:#111a31; cursor:pointer`}
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
