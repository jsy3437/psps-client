import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/red-logo.svg';

const ThirdStep = (props) => {
	const arr = [
		{ title: '이름', placeholder: '이름을 입력해주세요.' },
		{ title: '휴대폰번호', placeholder: '휴대폰번호를 입력해주세요.' },
		{ title: '인증번호', placeholder: '인증번호를 입력해주세요.' },
	];

	const goNext = () => {
		props.getStep(4);
	};
	const goBack = () => {
		props.getStep(2);
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt='로고이미지' src={Logo} />
				<Title>품생품사 회원가입-정보입력</Title>
				{arr.map((el, idx) => (
					<Items key={idx}>
						<ItemTitle>{el.title}</ItemTitle>
						<ItemInput placeholder={el.placeholder} />
					</Items>
				))}
				<SubmitButton enter onClick={goNext}>
					가입하기
				</SubmitButton>
				<SubmitButton back onClick={goBack}>
					이전으로
				</SubmitButton>
			</RegisterInside>
		</Container>
	);
};

export default ThirdStep;

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
	width: 34.6rem;
	height: 6.2rem;
	position: relative;
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
	border-radius: 4px;
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
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	${(props) =>
		props.enter && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
`;
