import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';
import { termsArr } from '../../data/terms';

const SecondStep = (props) => {
	const arr = termsArr;
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	useEffect(() => {
		const state = history.location.state;
		if (state) {
			setEmail(state.email);
			setPassword(state.password);
			setPasswordConfirm(state.passwordConfirm);
		}
		// eslint-disable-next-line
	}, []);

	const goNext = () => {
		props.setStep(1);
		history.push({
			state: { agree: true, email, password, passwordConfirm },
		});
	};
	const goBack = () => {
		props.setStep(1);
		history.push({
			state: { agree: false, email, password, passwordConfirm },
		});
	};

	return (
		<Container>
			<RegisterInside>
<<<<<<< HEAD
				<LogoImg alt='logo' src={logo} />
				<Title>품생품사 가입약관</Title>
				{arr.map((el, idx) => (
					<Items key={idx}>
						<ItemTitle>{el.title}</ItemTitle>
=======
				<LogoImg alt="logo" src={logo} />
				<Title>품생품사 가입약관</Title>
				{arr.map((el, idx) => (
					<Items key={idx}>
						<ItemTitle>{el.title} (필수)</ItemTitle>
>>>>>>> psps/seoyoon
						<ItemTextBox>{el.contents}</ItemTextBox>
					</Items>
				))}
				<SubmitButton agree onClick={goNext}>
					동의하기
				</SubmitButton>
				<SubmitButton back onClick={goBack}>
					이전으로
				</SubmitButton>
			</RegisterInside>
		</Container>
	);
};

export default SecondStep;

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
const Items = styled.div`
	margin-bottom: 2.4rem;
`;
const ItemTitle = styled.h3`
	height: 2.4rem;
	line-height: 2.4rem;
	text-align: center;
	font-size: 1.6rem;
	font-family: 'kr-r';
	color: #221814;
	margin-bottom: 0.8rem;
`;
const ItemTextBox = styled.div`
	width: 50rem;
	height: 20rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #6b6462;
	padding: 1.2rem;
	overflow-y: scroll;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
<<<<<<< HEAD
=======
	white-space: pre-line;
	::-webkit-scrollbar {
		width: 0.9rem;
		height: 4rem;
		background-color: #fff;
	}
	::-webkit-scrollbar-thumb {
		background-color: #707070;
		border-radius: 10px;
		background-clip: padding-box;
		border: 3px solid transparent;
		height: 4.4rem;
	}
>>>>>>> psps/seoyoon
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border: none;
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	${(props) =>
		props.agree && `background-color:#E50011; color:#fff ; margin-top:1.6rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
`;
