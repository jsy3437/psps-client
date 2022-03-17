import React from 'react';
import styled from 'styled-components';

const RemoveUser = () => {
	return (
		<Container>
			<ModalWrap></ModalWrap>
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
`;
