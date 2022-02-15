import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user_login } from '../modules/user';
import * as _user from '../controller/user';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import NLogo from '../images/n-logo.svg';
import KLogo from '../images/k-logo.svg';

const LoginPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const goFindInfo = () => {
		history.push('/find-info');
	};
	const goRegister = () => {
		history.push('/register');
	};

	const goNonMember = () => {
		//
	};

	const onSubmit = () => {
		if (email.length === 0) {
			return alert('아이디를 입력해주세요.');
		} else if (password.length === 0) {
			return alert('비밀번호를 입력해주세요.');
		} else {
			const data = { email, password };
			_user.login(data).then((res) => {
				if (res.data.success) {
					dispatch(user_login(true));
					alert('로그인 되었습니다.');
					history.push('/');
				} else {
					alert('아이디 또는 비밀번호를 확인해주세요.');
				}
			});
		}
	};

	return (
		<div id="container">
			<Container>
				<RegisterInside>
					<LogoImg alt="logo" src={logo} />
					<Title>품생품사 로그인</Title>
					<Items>
						<ItemTitle>이메일</ItemTitle>
						<ItemInput
							value={email ? email : ''}
							onChange={onChangeEmail}
							placeholder={'이메일 주소를 입력해주세요'}
						/>
					</Items>
					<Items last>
						<ItemTitle>비밀번호</ItemTitle>
						<ItemInput
							type="password"
							value={password ? password : ''}
							onChange={onChangePassword}
							placeholder={'비밀번호를 입력해주세요'}
						/>
					</Items>
					<AgreeBox>
						<AgreeRight onClick={goFindInfo}>아이디/비밀번호</AgreeRight>
					</AgreeBox>
					<SubmitButton onClick={onSubmit}>로그인</SubmitButton>
					<EasyBox>
						<EasyLeft>
							<EasyLeftText>SNS계정으로 간편하게 로그인</EasyLeftText>
							<GoLoginBox>
								<EasyLeftText>회원이 아니신가요?</EasyLeftText>
								<GoRegister onClick={goRegister}>회원가입</GoRegister>
							</GoLoginBox>
						</EasyLeft>
						<EasyRight>
							<SocialLogoBox NLogo>
								<SocialLogo alt="icon" src={NLogo} />
							</SocialLogoBox>
							<SocialLogoBox KLogo>
								<SocialLogo alt="icon" src={KLogo} />
							</SocialLogoBox>
						</EasyRight>
					</EasyBox>
					<NonMemberInfo onClick={goNonMember}>비회원 주문조회</NonMemberInfo>
				</RegisterInside>
			</Container>
		</div>
	);
};

export default withRouter(LoginPage);

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
const Items = styled.li`
	position: relative;
	${(props) => (props.last ? `margin-bottom:0.8rem;` : `margin-bottom:2rem`)}
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	padding: 0 0.5rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	background-color: #fff;
`;
const ItemInput = styled.input`
	width: 34.6rem;
	height: 6.4rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding-left: 1.2rem;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	background-color: #fff;
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const AgreeBox = styled.div`
	width: 34.6rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: right;
`;

const AgreeRight = styled.div`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	text-decoration: underline;
	cursor: pointer;
	&:hover {
		color: #e50011;
	}
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-top: 3.9rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #e50011;
	background-color: #fff;
	border: 1px solid #e50011;
	border-radius: 4px;
	transition: all 200ms ease;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
const EasyBox = styled.div`
	width: 100%;
	height: 5.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const EasyLeft = styled.div``;
const EasyLeftText = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #221814;
`;
const GoLoginBox = styled.div`
	display: flex;
	align-items: center;
`;
const GoRegister = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	color: #6b6462;
	margin-left: 0.7rem;
	text-decoration: underline;
	cursor: pointer;
	&:hover {
		color: #e50011;
	}
`;
const EasyRight = styled.div`
	display: flex;
	align-items: center;
`;
const SocialLogoBox = styled.div`
	width: 5.2rem;
	height: 5.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	${(props) =>
		props.NLogo
			? `background-color:#50AA34`
			: `background-color: #FFE733; margin-left:0.8rem;`}
`;
const SocialLogo = styled.img`
	width: 3.6rem;
	height: 3.6rem;
	cursor: pointer;
`;
const NonMemberInfo = styled.p`
	width: 100%;
	text-decoration: underline;
	text-align: end;
	letter-spacing: -0.56px;
	color: #6b6462;
	font-size: 1.4rem;
	font-family: 'kr-r';
	margin-top: 2rem;
	cursor: pointer;
	&:hover {
		color: #e50011;
	}
`;
