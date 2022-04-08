import React from 'react';
import styled from 'styled-components';

const Alert = (props) => {
	const clickClose = () => {
		props.setAlertState(false);
	};

	return (
		<Container>
			<ModalWarp>
				<Title>{props.title}</Title>
				<Msg>{props.msg}</Msg>
				<Button onClick={clickClose}>확인</Button>
			</ModalWarp>
		</Container>
	);
};

export default Alert;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #00000029;
`;
const ModalWarp = styled.div`
	position: relative;
	width: 48rem;
	height: fit-content;
	min-height: 25rem;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border-radius: 24px;
	margin: auto;
	padding: 3.6rem 6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20vh;
`;
const Title = styled.h2`
	font-size: 2rem;
	font-family: 'kr-b';
	letter-spacing: -0.8px;
	margin-bottom: 2.4rem;
`;
const Msg = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	letter-spacing: -0.64px;
`;
const Button = styled.button`
	position: absolute;
	width: 34.6rem;
	padding: 1.4rem;
	background-color: #fff;
	border: 1px solid #e50011;
	border-radius: 14px;
	color: #e50011;
	bottom: 3.6rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.96px;
	z-index: 999;
`;
