<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> psps/seoyoon
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';

const ProductList = (props) => {
	const history = useHistory();
<<<<<<< HEAD
=======
	const [hover, setHover] = useState('');
>>>>>>> psps/seoyoon

	const goDetail = (product_id) => {
		history.push(`/detail/${product_id}`);
	};

	return (
		<ProductContainer>
			<ProductWrap>
				{props.list.map((el, idx) => (
<<<<<<< HEAD
					<Product key={idx}>
						<ProductImg
							alt='product img'
							src={`${IMG_ADDRESS}/${el.image}`}
							onClick={() => {
								goDetail(el.product_id);
							}}
						/>
						<ProductTitle
							onClick={() => {
								goDetail(el.product_id);
							}}>
							{el.title}
						</ProductTitle>
						<ProductDesc>{el.desc}</ProductDesc>
=======
					<Product
						key={idx}
						onMouseEnter={() => {
							setHover(idx);
						}}
						onMouseLeave={() => {
							setHover('');
						}}
					>
						<ProductImgBox
							onClick={() => {
								goDetail(el.product_id);
							}}
						>
							{el.image && (
								<ProductImg
									alt="product img"
									src={`${IMG_ADDRESS}/${el.image}`}
									hover={hover === idx}
								/>
							)}
						</ProductImgBox>

						<ProductTitle
							onClick={() => {
								goDetail(el.product_id);
							}}
							hover={hover === idx}
						>
							{el.title}
						</ProductTitle>
						<ProductDescTotalPrice>
							{el.discount !== 0 && (
								<ProductDesc>
									{el.price && el.price.toLocaleString()}원
								</ProductDesc>
							)}
							{el.price && (el.price - el.discount).toLocaleString()}
							<DescWon>원</DescWon>
						</ProductDescTotalPrice>
>>>>>>> psps/seoyoon
					</Product>
				))}
			</ProductWrap>
			<GrayBackground />
		</ProductContainer>
	);
};

export default withRouter(ProductList);

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
<<<<<<< HEAD
const ProductImg = styled.img`
	width: 38rem;
	height: 35rem;
	cursor: pointer;
=======
const ProductImgBox = styled.div`
	width: 38rem;
	height: 35rem;
	cursor: pointer;
	border-radius: 4px;
	overflow: hidden;
`;
const ProductImg = styled.img`
	width: 100%;
	height: 100%;
	transition: all 300ms ease;
	${(props) => props.hover && `transform:scale(1.1)`}
>>>>>>> psps/seoyoon
`;
const ProductTitle = styled.h3`
	margin-top: 0.3rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	color: #221814;
	cursor: pointer;
<<<<<<< HEAD
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
=======
	${(props) => props.hover && `text-decoration: underline;`}
`;

>>>>>>> psps/seoyoon
const GrayBackground = styled.div`
	width: 100%;
	height: 37.3rem;
	background: #f2f2f2 0% 0% no-repeat padding-box;
	position: absolute;
	bottom: -9.5rem;
	z-index: -10;
`;
<<<<<<< HEAD
=======
const ProductDesc = styled.span`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.28px;
	color: #8e8e8e;
	margin-right: 0.4rem;
	text-decoration: line-through;
`;
const ProductDescTotalPrice = styled.p`
	font-size: 2rem;
	font-family: 'ro-b';
	letter-spacing: -0.4px;
	color: #e50011;
	margin-top: 0.2rem;
`;
const DescWon = styled.span`
	font-family: 'kr-b';
	font-size: 1.6rem;
	margin-left: 0.2rem;
`;
>>>>>>> psps/seoyoon
