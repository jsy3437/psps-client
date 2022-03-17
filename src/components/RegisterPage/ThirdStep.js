import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user_login } from '../../modules/user';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';
import { timers } from 'jquery';

const ThirdStep = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const nameInput = useRef();
	const phoneNumberInput = useRef();
	const confirmNumberInput = useRef();
	const [time, setTime] = useState(180);
	const [sec, setSec] = useState(59);
	const [min, setMin] = useState(2);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [confirm, setConfirm] = useState(false);
	const [getConfirmNum, setGetConfirmNum] = useState(false);
	const [confirm_number, setConfirm_number] = useState('');
	const [checkLength, setCheckLength] = useState({
		name: false,
		phone_number: false,
		confirm_number: false,
	});
	const [isSubmit, setIsSubmit] = useState(false);
	const [allState, setAllState] = useState(true);
	let timer;
	useEffect(() => {
		if (history.location.state) {
			const input = history.location.state;
			setEmail(input.email);
			setPassword(input.password);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (
			checkLength.name &&
			checkLength.phone_number &&
			checkLength.confirm_number &&
			getConfirmNum &&
			confirm
		) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [checkLength, confirm, getConfirmNum]);

	useEffect(() => {
		if (getConfirmNum && time !== -1) {
			setMin(parseInt(time / 60));
			setSec(time % 60);
			timer = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [getConfirmNum, time]);

	const goBack = () => {
		props.setStep(1);
	};

	const changeName = (e) => {
		regexp.name.test(e.target.value)
			? setCheckLength({ ...checkLength, name: true })
			: setCheckLength({ ...checkLength, name: false });
		return setName(e.target.value);
	};
	const changePhoneNumber = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			regexp.phone_number.test(e.target.value)
				? setCheckLength({ ...checkLength, phone_number: true })
				: setCheckLength({ ...checkLength, phone_number: false });
			setConfirm(false);
			setGetConfirmNum(false);
			return setPhone_number(e.target.value);
		}
	};
	const changeConfirm = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			if (e.target.value.length === 6) {
				setCheckLength({ ...checkLength, confirm_number: true });
			} else {
				setCheckLength({ ...checkLength, confirm_number: false });
			}
			return setConfirm_number(e.target.value);
		}
	};

	const getConfirmNumber = () => {
		if (phone_number.length === 11) {
			_user.send_sms({ phone_number }).then((res) => {
				if (res.data.success) {
					alert('인증번호가 발송되었습니다.');
					confirmNumberInput.current.focus();
					setGetConfirmNum(true);
					setConfirm(false);
					setConfirm_number('');
					setTime(180);
				} else {
					alert(res.data.msg);
				}
			});
		}
	};
	const checkConfirmNumber = () => {
		if (time > 0) {
			if (getConfirmNum && checkLength.confirm_number && !confirm) {
				const data = {
					phone_number,
					code: confirm_number,
				};
				_user.check_sms(data).then((res) => {
					if (res.data.success) {
						setConfirm(true);
						clearTimeout(timer);
						return alert('인증 확인되었습니다.');
					} else {
						return alert('인증번호를 확인해주세요.');
					}
				});
			}
		}
	};

	const onSubmit = () => {
		if (allState) {
			setIsSubmit(true);
			if (!regexp.name.test(name)) {
				setCheckLength({ ...checkLength, name: false });
				alert('이름을 확인해주세요');
				nameInput.current.focus();
			} else if (!regexp.phone_number.test(phone_number)) {
				setCheckLength({ ...checkLength, phone_number: false });
				alert('휴대폰번호를 확인해주세요');
				phoneNumberInput.current.focus();
			} else if (!confirm || !getConfirmNum) {
				alert('휴대폰번호 인증을 확인해주세요');
				confirmNumberInput.current.focus();
			} else {
				const data = {
					email,
					password,
					name,
					phone_number,
				};
				_user.register(data).then((res) => {
					if (res.data.success) {
						props.setStep(4);
						dispatch(user_login(res.data.name));
						history.push({ state: name });
					} else {
						alert('이미 가입되어 있는 휴대폰번호입니다');
					}
				});
			}
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
						onChange={changeName}
						placeholder="이름을 입력해주세요"
					/>
					{isSubmit && !checkLength.name && (
						<InputError>{'이름을 확인해주세요'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>휴대폰번호</ItemTitle>
					<ItemInput
						type="text"
						ref={phoneNumberInput}
						maxLength="11"
						onChange={changePhoneNumber}
						value={phone_number}
						placeholder="'-'을 제외한 휴대폰 번호를 입력해주세요."
					/>
					{isSubmit && !checkLength.phone_number && (
						<InputError>{'휴대폰번호를 확인해주세요'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>인증번호</ItemTitle>
					<ItemInput
						name={'confirmNum'}
						type="text"
						maxLength="6"
						ref={confirmNumberInput}
						value={confirm_number}
						onChange={changeConfirm}
						placeholder={
							getConfirmNum ? `0${min}:${sec < 10 ? '0' + sec : sec}` : null
						}
					/>

					<CheckButton
						send={
							getConfirmNum &&
							time > 0 &&
							checkLength.confirm_number &&
							!confirm
						}
						onClick={() => {
							checkConfirmNumber(confirm_number);
						}}
					>
						인증확인
					</CheckButton>
					{!getConfirmNum && (
						<CheckButton
							active={phone_number.length === 11}
							onClick={getConfirmNumber}
						>
							인증번호 발송
						</CheckButton>
					)}
				</Items>

				<SubmitButton enter={allState} onClick={onSubmit}>
					가입하기
				</SubmitButton>
				<BackButton back onClick={goBack}>
					이전으로
				</BackButton>
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
	border-radius: 14px;
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
	/* width: 6.7rem; */
	height: 2.8rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #c6c6c6;
	letter-spacing: -0.56px;
	position: absolute;
	top: 1.7rem;
	right: 12px;
	border-radius: 8px;
	border: 1px solid #c6c6c6;
	background-color: #fff;
	cursor: pointer !important;
	${(props) =>
		(props.active || props.send) &&
		`border: 2px solid #111a31;color:#111a31; cursor:pointer !important;`}
`;
const BackButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 14px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	background-color: #fff;
	color: #e50011;
	border: 1px solid #e50011;
	margin-top: 1.2rem;
	transition: all 200ms ease;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 14px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	color: #fff;
	background-color: #a0a0a0;
	margin-top: 2rem;
	cursor: default !important;
	${(props) =>
		props.enter &&
		`background-color:#221814; &:hover{
		background-color:#e50011
	} `};
`;
