import React, { useEffect, useRef, useState } from 'react';
import * as _user from '../../../controller/user';
import styled from 'styled-components';

const ChangeTel = (props) => {
	const authNumberInput = useRef();
	const [time, setTime] = useState(180);
	const [sec, setSec] = useState(59);
	const [min, setMin] = useState(2);
	const [getConfirmNumber, setGetConfirmNumber] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [phone_number, setPhone_number] = useState('');
	const [confirm_number, setConfirm_number] = useState('');
	const [check, setCheck] = useState({
		phone_number: '',
		confirm_number: '',
	});
	const [allState, setAllState] = useState(false);
	let timer;

	useEffect(() => {
		let timer;
		if (getConfirmNumber && time !== -1) {
			setMin(parseInt(time / 60));
			setSec(time % 60);
			timer = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [getConfirmNumber, time]);

	useEffect(() => {
		if (
			confirm &&
			getConfirmNumber &&
			check.phone_number &&
			check.confirm_number
		) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [check, confirm, getConfirmNumber]);

	const goBack = () => {
		props.setChangeTelState(false);
	};

	const ChangePhNumber = (e) => {
		const { value } = e.target;
		if (!isNaN(value)) {
			console.log(value.length);
			if (value.length === 11) {
				setCheck({ ...check, phone_number: true });
			} else {
				setCheck({ ...check, phone_number: false });
			}
			setPhone_number(value);
			setConfirm(false);
			setGetConfirmNumber(false);
		}
	};

	const ChangeConfirmNumber = (e) => {
		const { value } = e.target;
		if (!isNaN(value)) {
			if (value.length === 6) {
				setCheck({ ...check, confirm_number: true });
			} else {
				setCheck({ ...check, confirm_number: false });
			}
			setConfirm_number(value);
		}
	};

	const getAuthNumber = () => {
		if (check.phone_number) {
			_user.send_sms({ phone_number }).then((res) => {
				const { success, msg } = res.data;
				if (success) {
					alert('인증번호가 전송되었습니다');
					setGetConfirmNumber(true);
					authNumberInput.current.focus();
					setConfirm_number('');
				} else {
					alert(msg);
				}
			});
		}
	};

	const checkAuthNumber = () => {
		if (check.confirm_number && getConfirmNumber) {
			const data = {
				phone_number,
				code: confirm_number,
			};
			_user.check_sms(data).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('인증이 확인되었습니다');
					setConfirm(true);
					clearTimeout(timer);
				} else {
					alert('인증번호를 확인해주세요');
				}
			});
		}
	};
	const SubmitChangeTel = () => {
		if (allState) {
			_user.change_tel({ phone_number }).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('연락처가 변경되었습니다');
					props.setChangeTelState(false);
				} else {
					console.error(res.data);
				}
			});
		}
	};

	return (
		<Container>
			<ChangeTelWrap>
				<Title>연락처 변경</Title>
				<InputItemBox>
					<InputTitle>휴대폰번호</InputTitle>
					<TelInput
						type="text"
						maxLength="11"
						onChange={ChangePhNumber}
						value={phone_number}
						placeholder="‘ - ‘ 을 제외한 번호를 입력해주세요."
					/>
					<ConfirmButton
						phNumberState={check.phone_number}
						onClick={getAuthNumber}
					>
						인증하기
					</ConfirmButton>
				</InputItemBox>
				<InputItemBox>
					<InputTitle>인증번호</InputTitle>
					<TelInput
						type="text"
						maxLength="6"
						onChange={ChangeConfirmNumber}
						value={confirm_number}
						ref={authNumberInput}
						placeholder={
							getConfirmNumber ? `0${min}:${sec < 10 ? '0' + sec : sec}` : null
						}
					/>
					<ConfirmButton
						authNumberState={getConfirmNumber && check.confirm_number}
						onClick={checkAuthNumber}
					>
						인증확인
					</ConfirmButton>
				</InputItemBox>
				<ButtonBox>
					<BackButton onClick={goBack}>취소</BackButton>
					<SubmitButton state={allState} onClick={SubmitChangeTel}>
						확인
					</SubmitButton>
				</ButtonBox>
			</ChangeTelWrap>
		</Container>
	);
};

export default ChangeTel;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000ba;
`;
const ChangeTelWrap = styled.div`
	width: 48rem;
	height: 36.6rem;
	background-color: #fff;
	margin: 20vh auto;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 24px;
	padding: 3.6rem 6.7rem;
`;
const Title = styled.h2`
	margin-bottom: 3rem;
	font-size: 2rem;
	font-family: 'kr-b';
	letter-spacing: -0.8px;
	text-align: center;
`;
const InputItemBox = styled.div`
	position: relative;
	width: 100%;
	height: 6.2rem;
	margin: 2.5rem auto;
`;
const InputTitle = styled.p`
	position: absolute;
	width: fit-content;
	padding: 0 0.3rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
	margin-left: 1.2rem;
	background-color: #fff;
	top: -1rem;
	z-index: 3;
`;
const TelInput = styled.input`
	position: absolute;
	width: 34.6rem;
	padding: 2.1rem 1.2rem;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #fff;
	font-size: 1.4rem;
	letter-spacing: -0.28px;
	margin-bottom: 1rem;
	top: 0rem;
	${(props) => props.postcode && `width:23.8rem;`}
	&::placeholder {
		color: #8e8e8e;
	}
`;
const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ConfirmButton = styled.button`
	position: absolute;
	padding: 0.4rem 0.8rem;
	border: 1px solid #c6c6c6;
	border-radius: 8px;
	color: #c6c6c6;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	background-color: #fff;
	top: 1.5rem;
	right: 1.2rem;
	cursor: default !important;
	${(props) =>
		props.phNumberState &&
		`border:1px solid #000; color:#000; cursor:pointer !important;`}
	${(props) =>
		props.authNumberState &&
		`border:1px solid #000; color:#000; cursor:pointer !important;`}
`;
const SubmitButton = styled.button`
	padding: 1.4rem 6.2rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.96px;
	color: #fff;
	border-radius: 14px;
	background-color: #a0a0a0;
	border: none;
	cursor: default !important;
	transition: all 200ms ease;
	${(props) =>
		props.state &&
		`background-color:#221814; cursor: pointer !important; &:hover{
		background-color:#e50011;
	}`}
`;
const BackButton = styled(SubmitButton)`
	border: 1px solid #e50011;
	background-color: #fff;
	color: #e50011;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	cursor: pointer !important;
`;
