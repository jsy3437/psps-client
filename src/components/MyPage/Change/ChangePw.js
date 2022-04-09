import React, { useRef, useState, useEffect } from 'react';
import { regexp } from '../../../data/regexp';
import * as _user from '../../../controller/user';
import styled from 'styled-components';

const ChangePw = (props) => {
	const passwordInput = useRef();
	const passwordConfirmInput = useRef();
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [check, setCheck] = useState({
		password: '',
		passwordConfirm: '',
	});
	const [allState, setAllState] = useState(false);

	useEffect(() => {
		if (password.length >= 8 && check.password && check.passwordConfirm) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [check, password]);

	useEffect(() => {
		newPassword === confirmNewPassword
			? setCheck({ ...check, passwordConfirm: true })
			: setCheck({ ...check, passwordConfirm: false });
		// eslint-disable-next-line
	}, [confirmNewPassword, newPassword]);

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	const changeNewPassword = (e) => {
		regexp.password.test(e.target.value)
			? setCheck({ ...check, password: true })
			: setCheck({ ...check, password: false });
		return setNewPassword(e.target.value);
	};

	const changeConfirmPassword = (e) => {
		setConfirmNewPassword(e.target.value);
	};

	const goBack = () => {
		props.setChangePWState(false);
	};

	const submitChangePassword = () => {
		if (allState) {
			const data = {
				password,
				new_password: newPassword,
			};

			_user.change_password(data).then((res) => {
				const { success } = res.data;
				if (success) {
					props.setAlertMsg('비밀번호가 변경되었습니다.');
					props.setChangePWState(false);
				} else {
					console.log(res.data);
					props.setAlertMsg('기존 비밀번호가 일치하지 않습니다');
				}
				props.setAlertState(true);
			});
		}
	};

	return (
		<Container>
			<Items>
				<ItemTitle>현재 비밀번호</ItemTitle>
				<ItemInput
					type="password"
					placeholder="현재 비밀번호를 입력해주세요"
					onChange={changePassword}
				/>
			</Items>
			<Items>
				<ItemTitle>변경할 비밀번호</ItemTitle>
				<ItemInput
					type="password"
					placeholder="새 비밀번호를 입력해주세요."
					onChange={changeNewPassword}
					ref={passwordInput}
				/>
				{check.password === false && (
					<ErrorMessage>{`비밀번호는 8자리 이상으로 숫자, 알파벳, 특수문자를 포함해야 합니다`}</ErrorMessage>
				)}
			</Items>
			<Items>
				<ItemTitle>비밀번호 확인</ItemTitle>
				<ItemInput
					type="password"
					placeholder="비밀번호를 확인해주세요."
					onChange={changeConfirmPassword}
					ref={passwordConfirmInput}
				/>
				{check.passwordConfirm === false && (
					<ErrorMessage>{`비밀번호가 일치하지 않습니다.`}</ErrorMessage>
				)}
			</Items>
			<SubmitButton state={allState} onClick={submitChangePassword}>
				변경하기
			</SubmitButton>
			<BackButton onClick={goBack}>뒤로가기</BackButton>
		</Container>
	);
};

export default ChangePw;

const Container = styled.div`
	width: 34.6rem;
	margin: auto;
`;

const Items = styled.div`
	width: 34.6rem;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 3rem;
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
const ErrorMessage = styled.p`
	position: absolute;
	bottom: -1.8rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.4px;
	color: #e50011;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 14px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	transition: all 200ms ease;
	color: #fff;
	background-color: #a0a0a0;
	cursor: default !important;
	${(props) =>
		props.state &&
		`background-color:#221814; cursor:pointer !important;
		&:hover {
		background-color: #e50011;
		color: #fff;
	}`}
`;
const BackButton = styled(SubmitButton)`
	background-color: #fff;
	color: #e50011;
	border: 1px solid #e50011;
	margin-top: 1.2rem;
	cursor: pointer !important;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
