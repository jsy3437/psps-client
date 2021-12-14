import React from 'react';
import styled from 'styled-components';
import Img from '../images/induce.png';

const Induce = () => {
	return (
		<InduceContainer>
			<InduceImg src={Img} />
		</InduceContainer>
	);
};

export default Induce;

const InduceContainer = styled.div`
	width: 192rem;
	height: 54.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 15.9rem;
`;
const InduceImg = styled.img`
	width: 120rem;
	height: 25rem;
`;
