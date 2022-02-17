import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';

const ProductList = (props) => {
	const history = useHistory();

	const goDetail = (product_id) => {
		history.push(`/detail/${product_id}`);
	};
	console.log('img_addr', IMG_ADDRESS);
	console.log('list', props.list);
	// IMG ADDRESS
	//  https://api.makinet.kr
	// el.image
	// uploads/product/img.jpg
	// https://api.makinet.kr/uploads/product/img.jpg

	return (
		<ProductContainer>
			<ProductWrap>
				{props.list.map((el, idx) => (
					<Product key={idx}>
						{el.image && (
							<ProductImg
								alt="product img"
								src={`${IMG_ADDRESS}/${el.image}`}
								onClick={() => {
									goDetail(el.product_id);
								}}
							/>
						)}

						<ProductTitle
							onClick={() => {
								goDetail(el.product_id);
							}}
						>
							{el.title}
						</ProductTitle>
						<ProductDesc>{el.desc}</ProductDesc>
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
const ProductImg = styled.img`
	width: 38rem;
	height: 35rem;
	cursor: pointer;
`;
const ProductTitle = styled.h3`
	margin-top: 0.3rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	color: #221814;
	cursor: pointer;
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
