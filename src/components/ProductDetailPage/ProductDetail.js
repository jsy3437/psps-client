import React, { useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import guide from '../../images/detail_guide.png';

const ProductDetail = (props) => {
	const arr = ['상품선택', '상세설명', '상품정보'];
	const [view, setView] = useState('상품선택');

	// const onChangeView = (e) => {};

	return (
		<ProductDetailWrap>
			<ProductDetailHead>
				<Controller>
					{arr.map((el, idx) => (
						<Switch key={idx} active={view === el}>
							{el}
						</Switch>
					))}
				</Controller>
			</ProductDetailHead>
			<ProductDetailBody>
				<DetailImg
					alt='detail img'
					src={
						props.detail.detail_image &&
						`${IMG_ADDRESS}/${props.detail.detail_image}`
					}
				/>
				<GrayBackground />
			</ProductDetailBody>
		</ProductDetailWrap>
	);
};

export default ProductDetail;

const ProductDetailWrap = styled.div`
	width: 192rem;
	z-index: -5;
`;
const ProductDetailHead = styled.div`
	width: 192rem;
	height: 32.7rem;
	display: flex;
	justify-content: center;
	background-color: #e0e0e0;
	position: relative;
`;
const Controller = styled.ul`
	width: 36rem;
	height: 7rem;
	display: flex;
	position: absolute;
	bottom: 3rem;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 10px #00000029;
	border-radius: 4px;
`;
const Switch = styled.li`
	width: 12rem;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	background-color: #fff;
	${(props) =>
		props.active &&
		`border: 3px solid #E50011;
		box-shadow: 0px 3px 6px #00000029;
		border-radius: 4px;`}
`;
const ProductDetailBody = styled.div`
	width: 192rem;
	display: flex;
	justify-content: center;
	position: relative;
	margin-bottom: 7.5rem;
`;
const DetailImg = styled.img``;

const GrayBackground = styled.div`
	width: 192rem;
	height: 32.7rem;
	display: flex;
	justify-content: center;
	background-color: #e0e0e0;
	position: absolute;
	bottom: 0;
	z-index: -5;
`;
