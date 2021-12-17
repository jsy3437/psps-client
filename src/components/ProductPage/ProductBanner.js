import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BannerImg from '../../images/product_banner1.png';

const ProductBanner = () => {
	const history = useHistory();

	return (
		<ProductBannerWrap>
			<ProductBannerImg alt='배너' src={BannerImg} />
			<ProductBannerTitle>{`품질 좋은`}</ProductBannerTitle>
		</ProductBannerWrap>
	);
};

export default ProductBanner;

const ProductBannerWrap = styled.div`
	width: 192rem;
	height: 55rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;
const ProductBannerImg = styled.img`
	width: 100%;
	height: 100%;
`;
const ProductBannerTitle = styled.h1`
	font-size: 7rem;
	font-family: 'kr-b';
	color: #fff;
	position: absolute;
`;
