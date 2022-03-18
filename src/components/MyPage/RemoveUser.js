import React from 'react';
import styled from 'styled-components';

const RemoveUser = () => {
	return (
		<Container>
			<ModalWrap>
				<InfoTitle>회원탈퇴안내</InfoTitle>
				<InfoMessage>안내안내</InfoMessage>
			</ModalWrap>
		</Container>
	);
};

export default RemoveUser;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #000000aa;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
`;
const ModalWrap = styled.div`
	width: 50rem;
	height: 40rem;
	background-color: #fff;
	margin-top: 10rem;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem;
`;
const InfoTitle = styled.h2`
	font-size: 2rem;
	font-family: 'kr-b';
	margin-bottom: 2.4rem;
	letter-spacing: -0.8px;
`;
const InfoMessage = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
`;
