import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';

const FindIdResultPage = () => {
	const location = useLocation().state;
	const history = useHistory();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (location) {
			setName(location.name);
			const splitEmail = location.email.split('@');
			const sliceEmail = splitEmail[0].slice(0, 3);
			const starEmail = new Array(splitEmail[0].length - 3).fill('*').join('');
			setEmail(sliceEmail + starEmail + '@' + splitEmail[1]);
		}
	}, [location]);

	const goLogin = () => {
		history.push('/login');
	};
	const goRegister = () => {
		history.push('/register');
	};
	const goChangePassword = () => {
		history.push({ pathname: '/find-info', state: '비밀번호' });
	};

	return (
		<div id="container">
			<Container>
				<FindIdInside>
					<LogoImg alt="logo" src={logo} />
					<Title>품생품사 아이디 찾기</Title>
					<FindResult>
						{name && email
							? `${name}님의 이메일은\n${email}입니다.`
							: `가입된 아이디가 없습니다`}
					</FindResult>
					{name && email ? (
						<SubmitButton login onClick={goLogin}>
							로그인
						</SubmitButton>
					) : (
						<SubmitButton login onClick={goRegister}>
							회원가입
						</SubmitButton>
					)}
					<SubmitButton password onClick={goChangePassword}>
						비밀번호 찾기
					</SubmitButton>
				</FindIdInside>
			</Container>
		</div>
	);
};

export default FindIdResultPage;

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const FindIdInside = styled.div`
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
const FindResult = styled.p`
	line-height: 3.5rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #000000;
	margin-bottom: 6rem;
	text-align: center;
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
		props.login && `background-color:#221814; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.password &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ; margin-bottom:10rem;`};
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
