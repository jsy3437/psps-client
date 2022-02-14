import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';

const LastStep = () => {
	const user = useSelector((state) => state.user);
	const history = useHistory();

	const goHome = () => {
		history.push('/');
	};
	const goShopping = () => {
		history.push('/product');
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt="logo" src={logo} />
				<Title>품생품사 회원가입 완료</Title>
				<Text>{`감사합니다. ${user.name}님!\n더 좋은 품질로 보답하겠습니다.`}</Text>
				<SubmitButton shopping onClick={goShopping}>
					쇼핑하기
				</SubmitButton>
				<SubmitButton home onClick={goHome}>
					홈으로
				</SubmitButton>
			</RegisterInside>
		</Container>
	);
};

export default withRouter(LastStep);

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
const Text = styled.p`
	width: 34.6rem;
	height: 7rem;
	line-height: 3.5rem;
	margin-bottom: 6rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #000000;
	text-align: center;
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
		props.shopping && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.home &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
`;
