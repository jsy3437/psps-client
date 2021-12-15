import React, { useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user_login } from '../modules/user';
import { login } from '../controller/user';
import styled from 'styled-components';
import Logo from '../images/red-logo.svg';

const LoginPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const showButton = useRef();
	const arr = ['ID', 'Password'];
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false);

	const idController = (e) => {
		return setId(e.target.value);
	};
	const passwordController = (e) => {
		return setPassword(e.target.value);
	};
	const showController = () => {
		return setShow(!show);
	};
	const onShow = () => {
		if (showButton.current) {
			showButton.current.style.color = '#5887ff';
		}
	};
	const onNotShow = () => {
		if (showButton.current) {
			showButton.current.style.color = '#e5e6ed';
		}
	};

	const onSubmit = () => {
		if (id.length === 0) {
			return alert('아이디를 입력해주세요.');
		} else if (password.length === 0) {
			return alert('비밀번호를 입력해주세요.');
		} else {
			const Data = { id, password };
			login(Data).then((res) => {
				if (res.data.success) {
					dispatch(user_login(true));
					alert('로그인 되었습니다.');
				} else {
					alert('아이디 또는 비밀번호를 확인해주세요.');
				}
			});
		}
	};

	return (
		<div id='container'>
			<Login>
				<LogoImg alt='로고' src={Logo} />
				{arr.map((el, idx) => (
					<Input
						key={idx}
						type={idx === 1 && !show ? 'password' : 'text'}
						active={idx === 1}
						placeholder={el}
						onChange={idx === 0 ? idController : passwordController}
						onFocus={idx === 1 ? onShow : onNotShow}
					/>
				))}
				<Button onClick={onSubmit}>Log in</Button>
				<Text ref={showButton} onClick={showController}>
					Show
				</Text>
			</Login>
		</div>
	);
};

export default withRouter(LoginPage);

const Login = styled.div`
	width: 83.9rem;
	height: 53.2rem;
	margin-top: 27.9rem;
	background: #fcfcfc 0% 0% no-repeat padding-box;
	box-shadow: 2px 6px 30px #00000033;
	border-radius: 4px;
	opacity: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;
const LogoImg = styled.img`
	width: 38.3rem;
	height: 9.6rem;
	margin-bottom: 4.9rem;
`;
const Input = styled.input`
	width: 46rem;
	height: 5.6rem;
	font-family: 'kr-r';
	font-size: 2rem;
	margin-bottom: 1.6rem;
	padding: 0 1.5rem;
	${(props) => props.active && `margin-bottom:4.6rem`}
`;
const Button = styled.button`
	width: 46rem;
	height: 5.6rem;
	font-family: 'kr-r';
	font-size: 2.5rem;
	color: #fff;
	background: var(--unnamed-color-111a31) 0% 0% no-repeat padding-box;
	background: #111a31 0% 0% no-repeat padding-box;
	border-radius: 4px;
	border: none;
	opacity: 1;
`;
const Text = styled.p`
	font-size: 2rem;
	font-family: 'kr-r';
	color: #e5e6ed;
	position: absolute;
	top: 31rem;
	left: 58.3rem;
	&:hover {
		cursor: pointer;
	}
`;
