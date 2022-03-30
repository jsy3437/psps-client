import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { regexp } from '../data/regexp';
import * as _user from '../controller/user';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';

const FindPwResultPage = () => {
	const email = useLocation().state;
	const history = useHistory();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [lengthCheck, setLengthCheck] = useState({
		password: '',
		confirmPassword: '',
	});
	const [allState, setAllState] = useState(false);

	useEffect(() => {
		if (!email) {
			alert('잘못된 접근입니다.');
			history.push('/');
		}
	}, [email]);

	useEffect(() => {
		if (lengthCheck.password && lengthCheck.confirmPassword) {
			setAllState(true);
		} else {
			setAllState(false);
		}
	}, [lengthCheck]);

	const changePassword = (e) => {
		let state = false;
		if (regexp.password.test(e.target.value)) {
			state = true;
		}
		setLengthCheck({ ...lengthCheck, password: state });
		return setPassword(e.target.value);
	};

	const changeConfirmPassword = (e) => {
		password === e.target.value
			? setLengthCheck({ ...lengthCheck, confirmPassword: true })
			: setLengthCheck({ ...lengthCheck, confirmPassword: false });
		return setConfirmPassword(e.target.value);
	};

	const clickSubmit = () => {
		if (allState) {
			const data = {
				email,
				password,
			};

			_user.find_Pw_change(data).then((res) => {
				const { success } = res.data;
				if (success) {
					alert('비밀번호가 변경되었습니다.');
					history.push('/login');
				} else {
					console.log(res.data);
				}
			});
		}
	};

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo image" src={logo} />
				<Title>비밀번호 변경</Title>
				<FindPwInside>
					<InputBox>
						<InputTitle>새 비밀번호</InputTitle>
						<InputItem
							type="password"
							placeholder="새 비밀번호를 입력해주세요."
							onChange={changePassword}
						/>
						{lengthCheck.password === false && (
							<ErrorMessage>
								비밀번호는 숫자, 알파벳, 특수문자 포함 8자리 이상 가능합니다.
							</ErrorMessage>
						)}
					</InputBox>
					<InputBox>
						<InputTitle>새 비밀번호 확인</InputTitle>
						<InputItem
							type="password"
							placeholder="새 비밀번호를 확인해주세요."
							onChange={changeConfirmPassword}
						/>
						{lengthCheck.confirmPassword === false && (
							<ErrorMessage>
								새 비밀번호와 비밀번호 확인이 같지 않습니다.
							</ErrorMessage>
						)}
					</InputBox>
				</FindPwInside>
				<BtnBox>
					<SubmitButton state={allState} onClick={clickSubmit}>
						변경하기
					</SubmitButton>
					<BackButton>뒤로가기</BackButton>
				</BtnBox>
			</Container>
		</div>
	);
};

export default FindPwResultPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10rem 0 12.45rem;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 0.8rem auto 5rem;
`;
const FindPwInside = styled.div`
	width: 34.6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const InputBox = styled.div`
	position: relative;
	width: 34.6rem;
	margin-bottom: 2rem;
`;
const InputItem = styled.input`
	width: 100%;
	padding: 2.1rem 1.4rem;
	border: 1px solid #c6c6c6;
	border-radius: 14px;
	background-color: #fff;
	&::placeholder {
		color: #c6c6c6;
	}
`;
const InputTitle = styled.div`
	width: fit-content;
	position: absolute;
	top: -1rem;
	left: 1.4rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #221814;
	background-color: #fff;
	padding: 0 0.4rem;
`;
const ErrorMessage = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #e50011;
`;
const BtnBox = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	margin-top: 3.5rem;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-bottom: 1rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #fff;
	background-color: #a0a0a0;
	border: none;
	border-radius: 14px;
	transition: all 200ms ease;
	${(props) => props.state && `color: #fff;background-color: #221814;`}
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
const BackButton = styled(SubmitButton)`
	color: #e50011;
	background-color: #fff;
	border: 1px solid #e50011;
`;
