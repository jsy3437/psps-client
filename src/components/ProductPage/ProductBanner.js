import React from 'react';
import styled from 'styled-components';

const ProductBanner = (props) => {
	return (
		<ProductBannerWrap>
			<ProductBannerImg alt="배너" src={props.subPartArr.bnnImg} />
			<ProductBannerTitle>{`품질 좋은 ${props.part}`}</ProductBannerTitle>
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
	text-shadow: 0px 3px 6px #00000066;
	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
`;
