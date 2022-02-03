import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import Footer from '../components/Footer';

const FindIdResultPage = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	// const [phone_number, setPhone_number] = useState('');

	useEffect(() => {
		// history state로 요청 보내기
		// 있을 경우
		// setName()
		// setEmail()
		// 없을 경우 없다고 띄워주기
	}, []);

	const goLogin = () => {
		history.push('/login');
	};
	const goChangePassword = () => {
		alert('비밀번호 변경 페이지로 이동');
	};

	return (
		<div id='container'>
			<Container>
				<FindIdInside>
					<LogoImg alt='logo' src={logo} />
					<Title>품생품사 아이디 찾기</Title>
					<FindResult>
						{name && email
							? `${name}님의 이메일은\n${email}입니다.`
							: `가입된 아이디가 없습니다`}
					</FindResult>
					<SubmitButton login onClick={goLogin}>
						로그인
					</SubmitButton>
					<SubmitButton password onClick={goChangePassword}>
						비밀번호 찾기
					</SubmitButton>
				</FindIdInside>
				<Footer />
			</Container>
		</div>
	);
};

export default withRouter(FindIdResultPage);

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
	/* height: 7rem; */
	line-height: 3.5rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #000000;
	margin-bottom: 6rem;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	${(props) =>
		props.login && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.password &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem ; margin-bottom:10rem;`};
`;
