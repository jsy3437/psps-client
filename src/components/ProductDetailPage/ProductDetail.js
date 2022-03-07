<<<<<<< HEAD
import React, { useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import guide from '../../images/detail_guide.png';
=======
import React, { useEffect, useState } from 'react';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
>>>>>>> psps/seoyoon

const ProductDetail = (props) => {
	const arr = ['상품선택', '상세설명', '상품정보'];
	const [view, setView] = useState('상품선택');

<<<<<<< HEAD
	// const onChangeView = (e) => {};

	return (
		<ProductDetailWrap>
			<ProductDetailHead>
				<Controller>
					{arr.map((el, idx) => (
						<Switch key={idx} active={view === el}>
=======
	const onChangeView = (e) => {
		const { innerText } = e.target;
		let refEl;
		setView(innerText);
		switch (innerText) {
			case arr[0]:
				refEl = props.selectRef.current;
				break;
			case arr[1]:
				refEl = props.detailRef.current;
				break;
			case arr[2]:
				refEl = props.infoRef.current;
				break;
		}
		return refEl.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<ProductDetailWrap ref={props.detailRef}>
			<ProductDetailHead></ProductDetailHead>
			<ControllerBox>
				<Controller>
					{arr.map((el, idx) => (
						<Switch key={idx} active={view === el} onClick={onChangeView}>
>>>>>>> psps/seoyoon
							{el}
						</Switch>
					))}
				</Controller>
<<<<<<< HEAD
			</ProductDetailHead>
			<ProductDetailBody>
				<DetailImg
					alt='detail img'
=======
			</ControllerBox>

			<ProductDetailBody>
				<DetailImg
					alt="detail img"
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
	width: 192rem;
	z-index: -5;
=======
	position: relative;
	width: 192rem;
	/* z-index: -5; */
>>>>>>> psps/seoyoon
`;
const ProductDetailHead = styled.div`
	width: 192rem;
	height: 32.7rem;
	display: flex;
	justify-content: center;
<<<<<<< HEAD
	background-color: #e0e0e0;
	position: relative;
=======
	background-color: #f2f2f2;
	position: relative;
	z-index: -3;
`;
const ControllerBox = styled.div`
	width: 100%;
	position: absolute;
	top: 22.7rem;
>>>>>>> psps/seoyoon
`;
const Controller = styled.ul`
	width: 36rem;
	height: 7rem;
	display: flex;
<<<<<<< HEAD
	position: absolute;
	bottom: 3rem;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 10px #00000029;
	border-radius: 4px;
=======
	margin: auto;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 10px #00000029;
	border-radius: 4px;
	z-index: 99;
>>>>>>> psps/seoyoon
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
<<<<<<< HEAD
=======
	cursor: pointer;
>>>>>>> psps/seoyoon
	${(props) =>
		props.active &&
		`border: 3px solid #E50011;
		box-shadow: 0px 3px 6px #00000029;
<<<<<<< HEAD
		border-radius: 4px;`}
=======
		border-radius: 4px; line-height:6.4rem;`}
>>>>>>> psps/seoyoon
`;
const ProductDetailBody = styled.div`
	width: 192rem;
	display: flex;
	justify-content: center;
	position: relative;
	margin-bottom: 7.5rem;
`;
<<<<<<< HEAD
const DetailImg = styled.img``;
=======
const DetailImg = styled.img`
	width: 120rem;
`;
>>>>>>> psps/seoyoon

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
