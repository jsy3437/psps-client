import React, { useEffect, useState } from 'react';
import { COMPANY_CONTACT } from '../config';
import * as _question from '../controller/question';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import background_A from '../images/background-A.svg';
import background_Q from '../images/background-Q.svg';
import Footer from '../components/Footer';

const ServicePage = () => {
	const [answerOpen, setAnswerOpen] = useState('');
	const [list, setList] = useState([]);
	const [type, setType] = useState(1);
	const types = [
		'상품관련',
		'주문/결제',
		'배송',
		'취소/교환/반품',
		'회원정보',
		'서비스이용',
	];

	const callQuestion = () => {
		document.location.href = `tel:${COMPANY_CONTACT}`;
	};

	useEffect(() => {
		let isSubscribed = true;
		setAnswerOpen(false);
		_question.get_list(type).then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.question_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, [type]);

	return (
		<div id='container'>
			<Container>
				<LogoImg alt='logo' src={logo} />
				<Title>자주 묻는 질문</Title>
				<MenuBox>
					{types.map((el, idx) => (
						<Menu
							key={idx}
							select={type === idx + 1}
							onClick={() => {
								setType(idx + 1);
							}}>
							{el}
						</Menu>
					))}
				</MenuBox>
				{list.length !== 0 ? (
					<QnABox>
						{list.map((el, idx) => (
							<QnAList key={idx}>
								<QuestionBox
									onClick={() => {
										setAnswerOpen(idx);
									}}>
									<QnAText>{el.qu_title}</QnAText>
								</QuestionBox>
								{answerOpen === idx && (
									<AnswerBox>
										<QnAText answer>{el.qu_text}</QnAText>
									</AnswerBox>
								)}
							</QnAList>
						))}
					</QnABox>
				) : (
					<QnAInfoText>질문 내역이 없습니다.</QnAInfoText>
				)}
				<Button onClick={callQuestion}>문의하기</Button>
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
	background-image: url(${background_Q});
	background-size: 5rem 8rem;
	background-position: center;
	background-repeat: no-repeat;
	padding: 3.7px auto;
	border-bottom: 1px solid #e0e0e0;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const AnswerBox = styled(QuestionBox)`
	background-image: url(${background_A});
`;
const QnAText = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
	text-align: center;
	${(props) => props.answer && `color: #E50011;`}
`;
const QnAInfoText = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
	margin: 10rem auto;
`;

const Button = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	font-size: 2.1rem;
	font-family: 'kr-r';
	color: #fff;
	letter-spacing: -0.84px;
	border: none;
	border-radius: 4px;
	background-color: #221814;
`;
