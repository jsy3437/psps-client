import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';
// import axios from 'axios';

const ThirdStep = (props) => {
=======
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import { user_login } from '../../modules/user';
import logo from '../../images/red-logo.svg';

const ThirdStep = (props) => {
	const dispatch = useDispatch();
>>>>>>> psps/seoyoon
	const history = useHistory();
	const nameInput = useRef();
	const phoneNumberInput = useRef();
	const confirmNumberInput = useRef();
<<<<<<< HEAD
=======
	const [time, setTime] = useState(180);
	const [sec, setSec] = useState(59);
	const [min, setMin] = useState(2);
>>>>>>> psps/seoyoon
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
<<<<<<< HEAD
	const [confirmSend, setConfirmSend] = useState(false);
	const [confirm_number, setConfirm_number] = useState('');
	const [check, setCheck] = useState({
		name: true,
		phone_number: true,
		// confirm_number: true,
=======
	const [confirm, setConfirm] = useState(false);
	const [getConfirmNum, setGetConfirmNum] = useState(false);
	const [confirm_number, setConfirm_number] = useState('');
	const [checkLength, setCheckLength] = useState({
		name: false,
		phone_number: false,
		confirm_number: false,
>>>>>>> psps/seoyoon
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

<<<<<<< HEAD
	const goBack = () => {
		props.setStep(1);
	};
	const onChangeName = (e) => {
		regexp.name.test(e.target.value)
			? setCheck({ ...check, name: true })
			: setCheck({ ...check, name: false });
		return setName(e.target.value);
	};
	const onChangePhoneNumber = (e) => {
		regexp.phone_number.test(e.target.value)
			? setCheck({ ...check, phone_number: true })
			: setCheck({ ...check, phone_number: false });
		return setPhone_number(e.target.value);
	};
	const onChangeConfirm = (e) => {
		// regexp.confirm_number.test.test(e.target.value)
		// 	? setCheck({ ...check, confirm_number: true })
		// 	: setCheck({ ...check, confirm_number: false });
		return setConfirm_number(e.target.value);
=======
	useEffect(() => {
		let interval;
		if (getConfirmNum && time !== -1) {
			setMin(parseInt(time / 60));
			setSec(time % 60);
			interval = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}
		return () => {
			clearTimeout(interval);
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
>>>>>>> psps/seoyoon
	};

	const getConfirmNumber = () => {
		if (phone_number.length === 11) {
<<<<<<< HEAD
			// 인증하기
			alert('인증번호 1234');
			setConfirmSend(true);
		} else {
			return alert('휴대폰 번호를 정확하게 입력해주세요.');
		}
	};
	const checkConfirmNumber = () => {
		if (confirmSend) {
			// 인증번호와 입력된 값이 같을 경우
			return alert('인증 확인되었습니다.');
			// 아닐 경우
			// return alert('인증번호를 확인해주세요.');
=======
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
						return alert('인증 확인되었습니다.');
					} else {
						return alert('인증번호를 확인해주세요.');
					}
				});
			}
>>>>>>> psps/seoyoon
		}
	};

	const onSubmit = () => {
		setIsSubmit(true);
		if (!regexp.name.test(name)) {
<<<<<<< HEAD
			setCheck({ ...check, name: false });
			alert('이름을 확인해주세요');
			nameInput.current.focus();
		} else if (!regexp.phone_number.test(phone_number)) {
			setCheck({ ...check, phone_number: false });
			alert('휴대폰번호를 확인해주세요');
			phoneNumberInput.current.focus();
		} else if (!confirmSend) {
			alert('휴대전화 인증을 해주세요');
		}
		// else if(인증번호가 안맞으면){
		// }
		else {
			const data = { email, password, name, phone_number };
			_user.register(data).then((res) => {
				console.log(res.data);
				if (res.data.success) {
					props.setStep(4);
					history.push({ state: name });
=======
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
>>>>>>> psps/seoyoon
				}
			});
		}
	};

	return (
		<Container>
			<RegisterInside>
<<<<<<< HEAD
				<LogoImg alt='logo' src={logo} />
				<Title>품생품사 회원가입-정보입력</Title>
=======
				<LogoImg alt="logo" src={logo} />
				<Title>품생품사 회원가입 - 정보입력</Title>
>>>>>>> psps/seoyoon
				<Items>
					<ItemTitle>이름</ItemTitle>
					<ItemInput
						ref={nameInput}
<<<<<<< HEAD
						onChange={onChangeName}
						placeholder='이름을 입력해주세요'
					/>
					{isSubmit && !check.name && (
=======
						onChange={changeName}
						placeholder="이름을 입력해주세요"
					/>
					{isSubmit && !checkLength.name && (
>>>>>>> psps/seoyoon
						<InputError>{'이름을 확인해주세요'}</InputError>
					)}
				</Items>
				<Items>
					<ItemTitle>휴대폰번호</ItemTitle>
					<ItemInput
<<<<<<< HEAD
						type='number'
						ref={phoneNumberInput}
						onChange={onChangePhoneNumber}
						placeholder="'-'을 제외한 휴대폰 번호를 입력해주세요."
					/>
					{isSubmit && !check.phone_number && (
						<InputError>{'휴대폰번호를 확인해주세요'}</InputError>
					)}
					<CheckButton
						active={phone_number.length === 11}
						onClick={getConfirmNumber}>
						인증하기
					</CheckButton>
=======
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
>>>>>>> psps/seoyoon
				</Items>
				<Items>
					<ItemTitle>인증번호</ItemTitle>
					<ItemInput
<<<<<<< HEAD
						ref={confirmNumberInput}
						onChange={onChangeConfirm}
						placeholder='인증번호를 입력해주세요'
					/>
					{/* {isSubmit && !check.confirm_number && (
						<InputError>{'인증번호를 확인해주세요'}</InputError>
					)} */}
					<CheckButton
						send={confirmSend}
						onClick={() => {
							checkConfirmNumber(confirm_number);
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
=======
						name={'confirmNum'}
						type="text"
						maxLength="6"
						ref={confirmNumberInput}
						value={confirm_number}
						onChange={changeConfirm}
						placeholder={
							getConfirmNum && `0${min}:${sec < 10 ? '0' + sec : sec}`
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

				<SubmitButton
					enter={
						checkLength.name &&
						checkLength.phone_number &&
						checkLength.confirm_number &&
						confirm
					}
					onClick={onSubmit}
				>
					가입하기
				</SubmitButton>
				<BackButton back onClick={goBack}>
					이전으로
				</BackButton>
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
	width: 6.7rem;
=======
	/* width: 6.7rem; */
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
	background-color: unset;
	${(props) =>
		(props.active || props.send) &&
		`border: 2px solid #111a31;color:#111a31; cursor:pointer`}
=======
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
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	background-color: #fff;
	color: #e50011;
	border: 1px solid #e50011;
	margin-top: 1.2rem;
>>>>>>> psps/seoyoon
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
<<<<<<< HEAD
	${(props) =>
		props.enter && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
=======
	color: #fff;
	background-color: #a0a0a0;
	margin-top: 2rem;
	${(props) => props.enter && `background-color:#E50011; `};
>>>>>>> psps/seoyoon
`;
