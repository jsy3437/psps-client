import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../images/induce.png';
import * as _banner from '../controller/banner';
import { useHistory } from 'react-router-dom';

const Induce = () => {
	const history = useHistory();

	const goShopping = () => {
		history.push('/product');
	};

	return (
		<InduceContainer>
			<InduceImg alt='' src={img} onClick={goShopping} />
		</InduceContainer>
	);
};

export default Induce;

const InduceContainer = styled.div`
	width: 192rem;
	height: 39rem;
	display: flex;
	justify-content: center;
`;
const InduceImg = styled.img`
	width: 120rem;
	height: 25rem;
	margin-top: 4rem;
	cursor: pointer;
`;
