import React, { useState } from 'react';
import styled from 'styled-components';

import logo from '../images/red-logo.svg';
import backgroundA from '../images/background-A.svg';
import backgroundQ from '../images/background-Q.svg';
import Footer from '../components/Footer';

const ServicePage = () => {
	const [answerOpen, setAnswerOpen] = useState('');
	const [selectMenu, setSelectMenu] = useState('상품관련');
	const menuText = [
		'상품관련',
		'주문/결제',
		'배송',
		'취소/교환/반품',
		'회원정보',
		'서비스이용',
	];

	const OpenAnswer = (idx) => {
		setAnswerOpen(idx);
	};

	const clickMenu = (el) => {
		setSelectMenu(el);
	};

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>자주 묻는 질문</Title>
				<MenuBox>
					{menuText.map((el, idx) => (
						<Menu
							key={idx}
							onClick={() => {
								clickMenu(el);
							}}
							select={selectMenu === el ? true : false}
						>
							{el}
						</Menu>
					))}
				</MenuBox>
				{menuText.length !== 0 ? (
					<QnABox>
						{menuText.map((el, idx) => (
							<QnAList key={idx}>
								<QuestionBox
									onClick={() => {
										OpenAnswer(idx);
									}}
								>
									<QnAText>질문질문질문 질문질문질문</QnAText>
								</QuestionBox>
								{answerOpen === idx && (
									<AnswerBox>
										<QnAText answer>답답답다받바답답답답</QnAText>
									</AnswerBox>
								)}
							</QnAList>
						))}
					</QnABox>
				) : (
					<QnAInfoText>자주 묻는 질문이 없습니다.</QnAInfoText>
				)}
			</Container>
			<Footer />
		</div>
	);
};

export default ServicePage;

const Container = styled.div`
	width: 69.7rem;
	margin: 10rem auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	letter-spacing: -1.2px;
	margin: 0.8rem auto 4rem;
`;
const MenuBox = styled.ul`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 4px;
`;
const Menu = styled.li`
	height: 7rem;
	padding: 2rem 2.2rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #221814;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	${(props) =>
		props.select &&
		`border: 3px solid #E50011; font-family: 'kr-b'; padding: 1.7rem 1.9rem;`}
`;
const QnABox = styled.ul`
	width: 100%;
	margin: 7.5rem auto 4.8rem;
`;
const QnAList = styled.li`
	width: 100%;
	margin-bottom: 1.2rem;
	box-shadow: 2px 6px 18px #00000014;
	border-radius: 4px;
	padding: 0 2.8rem;
`;
const QuestionBox = styled.div`
	position: relative;
	min-height: 10.3rem;
	background-image: url(${backgroundQ});
	background-size: 5rem 8rem;
	background-position: center;
	background-repeat: no-repeat;
	padding: 3.7px auto;
	border-bottom: 1px solid #e0e0e0;
	cursor: pointer;
`;
const AnswerBox = styled.div`
	position: relative;
	min-height: 10.3rem;
	background-image: url(${backgroundA});
	background-size: 5rem 8rem;
	background-position: center;
	background-repeat: no-repeat;
	transition: all 300ms ease;
	/* padding: 3.7px auto; */
`;
const QnAText = styled.p`
	position: absolute;
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
	text-align: center;
	top: 40%;
	left: 50%;
	transform: translateX(-50%);
	${(props) => props.answer && `color: #E50011;`}
`;
const QnAInfoText = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
	margin: 10rem auto;
`;
