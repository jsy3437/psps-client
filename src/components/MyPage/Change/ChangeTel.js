import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import * as _user from '../../../controller/user';

const ChangeTel = (props) => {
	const authNumberInput = useRef();
	const [phNumberState, setPhNumberState] = useState(false);
	const [authNumberState, setAuthNumberState] = useState(false);

	const [phNumber, setPhNumber] = useState('');
	const [authNumber, setAuthNumber] = useState('');
	const [checked, setChecked] = useState({
		authSend: false,
		authConfirm: false,
	});
	useEffect(() => {
		if (phNumber.length === 11) {
			setPhNumberState(true);
		} else {
			setPhNumberState(false);
		}
	}, [phNumber]);

	useEffect(() => {
		if (authNumber.length === 6) {
			setAuthNumberState(true);
		} else {
			setAuthNumberState(false);
		}
	}, [authNumber]);

	const goBack = () => {
		props.setChangeTelState(false);
	};

	const ChangePhNumber = (e) => {
		const { value } = e.target;
		if (!isNaN(value)) {
			setChecked({ ...checked, authSend: false });
			setPhNumber(value);
		}
	};

	const ChangeAuthNumber = (e) => {
		const { value } = e.target;
		if (!isNaN(value)) {
			setChecked({ ...checked, authConfirm: false });
			setAuthNumber(value);
		}
	};

	const getAuthNumber = () => {
		if (phNumberState) {
			_user.send_sms({ phone_number: phNumber }).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('인증번호가 전송되었습니다');
					setChecked({ ...checked, authSend: true });
					window.focus(authNumberInput);
				} else {
					alert('연락처를 확인해주세요');
				}
			});
		}
	};

	const checkAuthNumber = () => {
		if (authNumberState && checked.authSend) {
			const data = {
				phone_number: phNumber,
				code: authNumber,
			};
			_user.check_sms(data).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('인증이 확인되었습니다');
					setChecked({ ...checked, authConfirm: true });
				} else {
					alert('인증번호를 확인해주세요');
				}
			});
		}
	};
	console.log(phNumber);
	const SubmitChangeTel = () => {
		if (checked.authSend && checked.authConfirm) {
			_user.change_tel({ phone_number: phNumber }).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('비밀번호가 변경되었습니다');
					props.setChangePWState(false);
				} else {
					console.log(res.data);
				}
			});
		} else {
			alert('연락처 인증을 확인해주세요');
		}
	};

	return (
		<Container>
			<ChangeTelWrap>
				<Title>연락처 변경</Title>
				<InputItemBox>
					<InputTitle>연락처</InputTitle>
					<TelInput
						type="text"
						maxLength="11"
						onChange={ChangePhNumber}
						value={phNumber}
					/>
					<ConfirmButton phNumberState={phNumberState} onClick={getAuthNumber}>
						인증하기
					</ConfirmButton>
				</InputItemBox>
				<InputItemBox>
					<InputTitle>인증번호</InputTitle>
					<TelInput
						type="text"
						maxLength="6"
						onChange={ChangeAuthNumber}
						value={authNumber}
						ref={authNumberInput}
					/>
					<ConfirmButton
						authNumberState={authNumberState && checked.authSend}
						onClick={checkAuthNumber}
					>
						인증확인
					</ConfirmButton>
				</InputItemBox>
				<SubmitButton back onClick={goBack}>
					취소
				</SubmitButton>
				<SubmitButton enter onClick={SubmitChangeTel}>
					확인
				</SubmitButton>
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
	border-radius: 4px;
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
const ConfirmButton = styled.button`
	position: absolute;
	padding: 0.4rem 0.8rem;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
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
	border-radius: 4px;
	${(props) =>
		props.back &&
		`border:1px solid #e50011; background-color:#fff; color:#e50011;`}
	${(props) =>
		props.enter &&
		`border:1px solid #000; background-color:#000; margin-left:0.9rem;`}
`;
