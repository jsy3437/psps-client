import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Ex1 from '../images/ex1.png';
import Ex2 from '../images/ex2.png';
import Ex3 from '../images/ex3.png';
import Ex4 from '../images/ex4.png';

const ProductList = () => {
	const history = useHistory();
	const arr = [
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex1,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex2,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex3,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex4,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex1,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex2,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex3,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex4,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex1,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex2,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex3,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Ex4,
		},
	];
	const goDetail = () => {
		history.push('/detail/1');
	};

	return (
		<ProductContainer>
			<ProductWrap>
				{arr.map((el, idx) => (
					<Product key={idx}>
						<ProductImg alt='' src={el.img} />
						<ProductTitle onClick={goDetail}>{el.title}</ProductTitle>
						<ProductDesc>{el.desc}</ProductDesc>
					</Product>
				))}
			</ProductWrap>
			<GrayBackground />
		</ProductContainer>
	);
};

export default ProductList;

const ProductContainer = styled.div`
	width: 192rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;
const ProductWrap = styled.ul`
	margin-top: 15rem;
	margin-bottom: 0;
	width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 3rem;
`;
const Product = styled.li`
	width: 38rem;
	height: 40rem;
	margin-bottom: 5.9rem;
`;
const ProductImg = styled.img`
	width: 38rem;
	height: 35rem;
`;
const ProductTitle = styled.h3`
	margin-top: 0.3rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	color: #221814;
	&:hover {
		text-decoration: underline;
	}
`;
const ProductDesc = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.6rem;
	font-family: 'kr-r';
	color: #8e8e8e;
`;
const GrayBackground = styled.div`
	width: 100%;
	height: 37.3rem;
	background: #f2f2f2 0% 0% no-repeat padding-box;
	position: absolute;
	bottom: -9.5rem;
	z-index: -10;
`;
