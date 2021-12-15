import React, { useState } from 'react';
import styled from 'styled-components';

const ProductCategory = () => {
	const [main, setMain] = useState('농산');
	const [sub, setSub] = useState('전체보기');

	const mainArr = [
		'농산',
		'수산',
		'축산',
		'건강/음료',
		'생활/주방',
		'간식',
		'반찬',
		'가정 간편식',
	];
	const subArr = [
		'전체보기',
		'과일/수입청과',
		'샐러드/기본채소',
		'즙용/특수채소',
		'버섯/건나물류',
		'쌀/잡곡',
	];
	return (
		<ProductCategoryWrap>
			<MainCategoryWrap>
				{mainArr.map((el, idx) => (
					<MainCategoryList key={idx}>{el}</MainCategoryList>
				))}
			</MainCategoryWrap>
			<SubCategoryWrap>
				{subArr.map((el, idx) => (
					<SubCategoryList key={idx}>{el}</SubCategoryList>
				))}
			</SubCategoryWrap>
		</ProductCategoryWrap>
	);
};

export default ProductCategory;

const ProductCategoryWrap = styled.div`
	width: 95.3rem;
	height: 13.2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: 50.5rem;
`;
const MainCategoryWrap = styled.ul`
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 4px;
`;
const MainCategoryList = styled.li`
	width: 12rem;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	letter-spacing: -0.72px;
`;
const SubCategoryWrap = styled.ul`
	height: 2.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SubCategoryList = styled.li`
	height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #000000;
	padding: 0 0.5rem;
	border-right: 1px solid #000;
	&:nth-last-child(1) {
		border: none;
	}
`;
