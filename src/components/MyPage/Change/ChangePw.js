import React, { useRef, useState } from 'react';
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
		password: false,
		passwordConfirm: false,
	});

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
		password === e.target.value
			? setCheck({ ...check, passwordConfirm: true })
			: setCheck({ ...check, passwordConfirm: false });
		return setConfirmNewPassword(e.target.value);
	};

	const goBack = () => {
		props.setChangePWState(false);
	};

	const submitChangePassword = () => {
		if (!regexp.password.test(password)) {
			alert('비밀번호를 확인해주세요');
			passwordInput.current.focus();
			return setCheck({ ...check, password: false });
		} else if (newPassword !== confirmNewPassword) {
			alert('비밀번호가 일치하지 않습니다');
			passwordConfirmInput.current.focus();
			return setCheck({ ...check, passwordConfirm: false });
		}
		const data = {
			password,
			new_password: newPassword,
		};

		_user.change_password(data).then((res) => {
			const { success } = res.data;
			if (success) {
				alert('비밀번호 변경완료');
				props.setChangePWState(false);
			} else {
				alert('기존 비밀번호가 일치하지 않습니다');
			}
		});
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
					placeholder="비밀번호를 입력해주세요."
					onChange={changeNewPassword}
					ref={passwordInput}
				/>
			</Items>
			<Items>
				<ItemTitle>비밀번호 확인</ItemTitle>
				<ItemInput
					type="password"
					placeholder="비밀번호를 확인해주세요."
					onChange={changeConfirmPassword}
					ref={passwordConfirmInput}
				/>
			</Items>
			<SubmitButton enter onClick={submitChangePassword}>
				변경하기
			</SubmitButton>
			<SubmitButton back onClick={goBack}>
				뒤로가기
			</SubmitButton>
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
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 14px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	transition: all 200ms ease;
	${(props) =>
		props.enter && `background-color:#221814; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
